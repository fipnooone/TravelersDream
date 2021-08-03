import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {request, requests, uploadFiles, getToken} from './requests';

class LK extends Component {
    constructor (props) {
        super (props);
        this.state = {
            me: { username: '', photo: 'http://dream/profilepictures/0.png' },
            blocks: {
                categories: [],
                types: [],
                list: [],
                createNewPanel: <div id='LKMIB-CNew' className='create-new'> </div>
            },
            currCP: {
                action: 3,
                type: '',
                photo: undefined,
                data: {}
            },
            currList: ''
        };
        this.update();
    };

    mib() {
        document.getElementById("LKMIB").style.visibility = "hidden";
        document.getElementById("LKMIB-CNew").style.animation = "hideToDown 0.3s";
        document.getElementById("LKMIB-CNew").style.visibility = "hidden";
        document.getElementById("LKMIB-CNew").style.opacity = "0";

        this.setBlocks({createNewPanel: <div id='LKMIB-CNew' className='create-new'> </div>});
    };
    componentDidMount() { document.addEventListener('click', this.handleOutsideClick); }
    handleOutsideClick = (event) => {
        if (this.box && this.box.current !== null && !this.box.current.contains(event.target)) {
            if (window.getComputedStyle(document.getElementById("UserHeaderMore")).getPropertyValue("visibility") === 'visible')
                document.getElementById("UserHeaderMore").style.visibility = 'hidden';
        }
    }
    showMore() {
        if (window.getComputedStyle(document.getElementById("UserHeaderMore")).getPropertyValue("visibility") === 'hidden')
            document.getElementById("UserHeaderMore").style.visibility = 'visible';
        else
            document.getElementById("UserHeaderMore").style.visibility = 'hidden';
    };

    setListOf(l) {
        request('getListOf', { token:getToken(), list: l}).then(res => {
            if (!res.data.success) return;
            let __blocks = [];
            let __think = (t, u) => {
                switch (t) {
                    case 'clients':
                        return (
                            <div className='not-enought' onClick={() => {
                                this.showCreatePanel(1, l, { id: u.id, name: u.name });
                            }}>
                            </div>
                        );
                    case 'contracts':
                        return (
                            <div className='not-enought' onClick={() => {
                                this.showCreatePanel(1, l, { id: u.id, name: u.name });
                            }}>
                            </div>
                        );
                    case 'payments':
                        return (
                            <div className='not-enought' onClick={() => {
                                this.showCreatePanel(1, l, { id: u.id, name: u.name });
                            }}>
                            </div>
                        );
                    case 'users':
                        return (
                        <div className='not-enought' onClick={() => {
                            this.showCreatePanel(1, l, { id: u.id, name: u.name, fio: u.fio, bdate: u.bdate, typeid: u.typeid - 1, photo: u.photo });
                        }}>
                            <img className='u-picture' src={u.photo} alt='' />
                            <div className='u-info-nt'>
                                <p className='u-name u-text'>{u.name}</p>
                                <p className='u-type u-text'>{u.type}</p>
                            </div>
                        </div>);
                    case 'usertypes':
                        return (
                            <div className='not-enought' onClick={() => {
                                this.showCreatePanel(1, l, { id: u.id, type: u.type, permissions: u.permissions });
                            }}>
                                <div className='u-info-nt'>
                                    <p className='u-name u-text'>{u.type}</p>
                                </div>
                            </div>
                        );
                    default:
                        return <div className='not-enought' />;
                }
            }

            res.data.data.list.map(u => {
                __blocks.push( __think(l, u) );
            });

            this.setBlocks({list: __blocks});

            let __currList = document.getElementById(`cat${this.state.currList}`);
            if (__currList) __currList.style.backgroundColor = '';
            document.getElementById(`cat${l}`).style.backgroundColor = '#2c2c34';
            this.setState({currList: l});
        });
    }

    setBlocks(block, cb) {
        if (!cb) this.setState((prevState) => {
            return { blocks: Object.assign(prevState.blocks, block) };
        });
        else  this.setState((prevState) => {
            return { blocks: Object.assign(prevState.blocks, block) };
        }, cb);
    }

    update(category) {
        requests({
            'getUserInfo': {keys: ['name', 'photo']},
            'getTypes': {},
            'getCategories': {}
        }, { 'token': getToken() }).then(res => {
            if (res.success) {
                let data = res.result;
                if (data.getUserInfo.success) // getUserInfo
                    this.setState({
                        me: {
                            username: data.getUserInfo.data.name,
                            photo: data.getUserInfo.data.photo
                        }
                    });
                else this.logOut();
                
                if (data.getTypes.success) { // getTypes
                    let __types = [];
                    let __counter = 0;
                    data.getTypes.data.types.map(type => {
                        __types.push( <option value={__counter}> {type} </option> );
                        __counter ++;
                    });
                    this.setBlocks({types:  __types})
                }

                if (data.getCategories.success) { // getCategories
                    let __categories = [];
                    let __counter = 1;
                    let __getName = (cat) => {
                        switch (cat) {
                            case 'clients':
                                return 'Клиенты';
                            case 'contracts':
                                return 'Договоры';
                            case 'payments':
                                return 'Платежи';
                            case 'users':
                                return 'Пользователи';
                            case 'usertypes':
                                return 'Типы пользователей';
                            default:
                                return '';
                        }
                    };

                    data.getCategories.data.categories.map(c => {
                        if (!category && __counter === 1) this.setListOf(c);
                        __categories.push(
                            <p id={`cat${c}`} className={`cat-${__counter}`}
                                onClick={() => this.setListOf(c) }> {__getName(c)} </p>
                        )
                        __counter ++;
                    });

                    if (category) this.setListOf(category);
                    this.setBlocks({categories: __categories});
                }
            }
        });
    };

    showCreatePanel(action, type, params) {
        this.setState({currCP: {action: action, type: type, data: params}});
        const __getInput = (t) => {
            switch (t) {
                case 'users':
                    return [<>
                        <div className='input-name input-row'> 
                            <p> Имя </p> <input id='inputName' className='r' type='text' defaultValue={params.name ? params.name : ''} />
                        </div>
                        <div className="input-fio input-row">
                            <p> ФИО </p> <input id="inputFIO" type="text" onChange={(e) => {
                                let fio = e.target.value.split(" ");
                                document.getElementById("inputName").value = (fio[0] ? fio[0] : "") + 
                                    (fio[1] ?  ` ${fio[1][0]}.` : "") + 
                                    (fio[2] ? ` ${fio[2][0]}.` : "");
                            }} defaultValue={params.fio ? params.fio : ''} />
                        </div>
                        <div className="input-date input-row">
                            <p> Дата рождения </p> <input id="inputBDate" type="date" defaultValue={params.bdate ? params.bdate : ''} />
                        </div>
                        <div className="input-type input-row">
                            <p> Тип </p> <select id="selectType" defaultValue={params.type ? params.type : 0}> {this.state.blocks.types} </select>
                        </div>
                    </>, action === 0 ? 'Создание' : params.name];
                case 'clients':
                    return [<></>, action === 0 ? 'Создание' : ''];
                case 'contracts':
                    return [<></>, action === 0 ? 'Создание' : ''];
                case 'payments':
                    return [<></>, action === 0 ? 'Создание' : ''];
                case 'usertypes':
                    return [<>
                        <div className='input-name input-row'> 
                            <p> Тип </p> <input id='inputName' type='text' defaultValue={params.type ? params.type : ''} />
                        </div>
                        <div className="input-type input-row">
                            <p> Разрешения </p> <select id="selectType" defaultValue={0}> </select>
                        </div>
                    </>, action === 0 ? 'Создание' : params.type];
                default:
                    return <></>
            }
        };
        const [__textInput, __title] = __getInput(type);
        const __imageInput = (type === 'users') ? 
        <div className="image-input-block">
            <p className="image-title"> Фото </p>
            <input id="imageInput" className="image-input" type="image" onClick={ () => document.getElementById("fileInput").click() } src={ params.photo ? params.photo : 'http://dream/profilepictures/0.png' }/>
            <input id="fileInput" type="file" accept="image/*" onChange={(e) => {
                this.setState((prevState) => {
                    return { currCP: Object.assign(prevState.currCP, {photo: e.target.files[0]}) };
                });
                document.getElementById("imageInput").src = window.URL.createObjectURL(e.target.files[0]);
            }} />
        </div> : <></>;

        let __newCP = (
            <div id='LKMIB-CNew' className='create-new'>
                <div className="title-block">
                    <p id="CNewTitle" className="title-name"> {__title} </p>
                    <svg className="title-close" viewBox="0 0 20 20" onClick={ () => this.mib() }>
						<path fill="white" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
					</svg>
                </div>
                <div className='input-block'>
                    <div className='text-input'>
                        {__textInput}
                        <button className='button-save' onClick={()=>{
                            let __getCurrData = (t) => {
                                switch (t) {
                                    case 'users':
                                        return {
                                            name: document.getElementById("inputName").value,
                                            fio: document.getElementById("inputFIO").value,
                                            bdate: document.getElementById("inputBDate").value,
                                            type: +document.getElementById("selectType").value + 1,
                                            photo: this.state.currCP.photo
                                        };
                                    case 'clients': 
                                        return {};
                                    case 'contracts':
                                        return {};
                                    case 'payments':
                                        return {};
                                    case 'usertypes':
                                        return {};
                                    default:
                                        return {};
                                }
                            };
                            let __query = {};
                            let __currData = __getCurrData(this.state.currCP.type);
                            if (this.state.currCP.action === 1) { // update
                                let __originalData = this.state.currCP.data;

                                Object.keys(__originalData).map(key => {
                                    if (__currData[key] !== __originalData[key] && key !== 'photo' && key !== 'id') __query[key] = __currData[key];
                                });
                                uploadFiles('updateUserInfo', { token: getToken(), id: __originalData.id, keys: __query }, [__currData.photo ? __currData.photo : undefined]).then(res => {
                                    this.update(this.state.currCP.type);
                                    this.showCreatePanel(1, this.state.currCP.type, Object.assign({
                                        id: __originalData.id, photo: __currData.photo ? window.URL.createObjectURL(__currData.photo) : __originalData.photo, typeid: __currData.type
                                    }, __query));
                                });
                            } else if (this.state.currCP.action === 0) { // create
                                Object.keys(__currData).map(key => {
                                    if (key !== 'photo') __query[key] = __currData[key];
                                });
                                uploadFiles("createUser", {token: getToken(), keys: __query}, [__currData.photo ? __currData.photo : undefined]).then( res => {
                                    this.update(this.state.currCP.type);
                                    this.mib();
                                });
                            }

                        }}>Сохранить</button>
                    </div>
                    {__imageInput}
                </div>
            </div>
        );

        this.setBlocks({createNewPanel: __newCP}, () => {
            document.getElementById("LKMIB").style.visibility = "visible";
            document.getElementById("LKMIB").style.opacity = "1";
            document.getElementById("LKMIB-CNew").style.animation = "showFromUp 0.3s";
            document.getElementById("LKMIB-CNew").style.visibility = "visible";
            document.getElementById("LKMIB-CNew").style.opacity = "1";
        });
    };

    logOut() {
        Cookies.remove('data', {
            path: '',
            domain: 'localhost'
        });
        this.props.props.history.push({ pathname: '/auth' });
    };
    
    render() {
        return (
        <>
            <header>
                <ul className='main-ul'>
                    <li id='Logo'> <img src="Sources/images/logo.png" alt='' /> </li>
                    <li id='UserHeader'>
                        <div id='UserHeaderMain' className='user-header-main' ref={this.box} onClick={() => this.showMore()}>
                            <p className='user-name'> {this.state.me.username} </p>
                            <img className='user-picture' src={this.state.me.photo} alt='' />
                        </div>
                        <div id='UserHeaderMore' className='user-header-more'>
                            <a className='button-profile'> Профиль </a>
                            <a className='button-logout' onClick={() => this.logOut()} > Выйти </a>
                        </div>
                    </li>
                </ul>
            </header>
            <div id='LK'>
                <div className='control-panel'>
                    <div id='categoriesList' className='gr-list'> {this.state.blocks.categories} </div>
                    <div className='list-of'>
                        <p id='createButton' className='button-create' onClick={() => {
                            this.showCreatePanel(0, this.state.currList, {});
                        }}> Создать </p>
                        {this.state.blocks.list}
                    </div>
                </div>
                <div id='LKMIB' className='mib' onClick={ () => this.mib() } />
                {this.state.blocks.createNewPanel}
            </div>    
        </>
        );
    }
};

export default LK;