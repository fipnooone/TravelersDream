import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {request, requests, uploadFiles, getToken} from './requests';

class LK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            type: "",
            picture: "",
            blocks: [],
            types: [],
            currentU: {
                action: "",
                id: 0,
                originalData: {},
            },
            categories: [],
            selectedType: ''
        };
        this.box = React.createRef();
        this.update();
    };

    update() {
        requests({
            "getUserInfo": { keys: ["name", "type", "photo"] },
            "getListOf": {list: 'users'},
            "getTypes": {},
            "getCategories": {}
        }, {
            "token": getToken() 
        }).then(res => {
            if (res.success) {
                let data = res.result;
                // getUserInfo
                if (data.getUserInfo.success) {
                    this.setState({
                        username: data.getUserInfo.data.name,
                        type: data.getUserInfo.data.type,
                        picture: data.getUserInfo.data.photo
                    });
                }
                else {
                    this.logOut();
                }
                // getTypes
                if (data.getTypes.success) {
                    let __types = [];
                    let counter = 0;
                    data.getTypes.data.types.map(type => {
                        __types.push(<option value={counter}>{type}</option>);
                        counter += 1;
                    });
                    this.setState({types: __types});
                }
                //getCategories
                if (data.getCategories.success) {
                    let __categories = [];
                    let counter = 1;
                    data.getCategories.data.categories.map(c => {
                        if (counter == 1) {
                            this.setState({selectedType: c});
                            request('getListOf', { token: getToken(), list: c }).then( res => {
                                if (res.data.success) {
                                    let __blocks = [];
                                    res.data.data.list.map(u => {
                                        __blocks.push(
                                            <div className="not-enought" onClick={ () => {
                                                //this.showCreatePanel('update', u.id, u.name, u.fio, u.bdate, u.typeid - 1, u.photo);
                                                this.showCP('update', c, {id: u.id, name: u.name, fio: u.fio, bdate: u.bdate, typeid: u.typeid - 1, photo: u.photo});
                                                this.state.currentU.action = "update";
                                            }}>
                                                <img className="u-picture" src={u.photo} alt="" />
                                                <div className="u-info-nt">
                                                    <p className="u-name u-text">{u.name}</p>
                                                    <p className="u-type u-text">{u.type}</p>
                                                </div>
                                            </div>
                                        );
                                    });
                                    this.setState({blocks: __blocks});
                                }
                            });
                        }
                        function __getName(cat) {
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
                        }
                        __categories.push(<p id={ `cat${c}` } className={ `cat-${counter}` } onClick={ () => {
                            let oldE = document.getElementById(`cat${this.state.selectedType}`);
                            console.log(oldE);
                            if (oldE) oldE.style.backgroundColor = '';
                            this.setState({selectedType: c});
                            document.getElementById(`cat${c}`).style.backgroundColor = '#2c2c34';
                            request('getListOf', { token: getToken(), list: c }).then( res => {
                                if (res.data.success) {
                                    let __blocks = [];
                                    res.data.data.list.map(u => {
                                        __blocks.push(
                                            <div className="not-enought" onClick={ () => {
                                                //this.showCreatePanel('update', u.id, u.name, u.fio, u.bdate, u.typeid - 1, u.photo);
                                                this.showCP('update', c, {id: u.id, name: u.name, fio: u.fio, bdate: u.bdate, typeid: u.typeid - 1, photo: u.photo});
                                                this.state.currentU.action = "update";
                                            }}>
                                                <img className="u-picture" src={u.photo} alt="" />
                                                <div className="u-info-nt">
                                                    <p className="u-name u-text">{u.name}</p>
                                                    <p className="u-type u-text">{u.type}</p>
                                                </div>
                                            </div>
                                        );
                                    });
                                    this.setState({blocks: __blocks});
                                }
                            });
                        }}>{ __getName(c) }</p>);
                        counter += 1;
                    });
                    this.setState({ categories: __categories });
                    document.getElementById(`cat${this.state.selectedType}`).style.backgroundColor = '#2c2c34';
                }
            }
        });
    }

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
    logOut() {
        Cookies.remove('data', { path: '', domain: 'localhost' });
        this.props.props.history.push({
            pathname: '/auth'
        })
    };
    mib() {
        document.getElementById("LKMIB").style.visibility = "hidden";
        document.getElementById("LKMIB-CNew").style.animation = "hideToDown 0.3s";
        document.getElementById("LKMIB-CNew").style.visibility = "hidden";
        document.getElementById("LKMIB-CNew").style.opacity = "0";
    };
    showCP(pAction, pType, params) {
        let that = this;
        let originalData = {};
        for (var key in params) {
            if (key !== 'id') {
                originalData[key] = params[key];
            }
        }
        function getBlocks(ptype) {
            switch (pType) {
                case 'users':
                    return (
                        <>
                        <div className="input-name input-row">
                                <p id="labelName">Имя</p>
                                <input id="inputName" type="text" value={params.name ? params.name : ''} />
                            </div>
                        <div className="input-fio input-row">
                            <p>ФИО</p>
                            <input id="inputFIO" type="text" onChange={(e) => {
                                let fio = e.target.value.split(" ");
                                document.getElementById("inputName").value = (fio[0] ? fio[0] : "") + 
                                    (fio[1] ?  ` ${fio[1][0]}.` : "") + 
                                    (fio[2] ? ` ${fio[2][0]}.` : "");
                            }} value={params.fio ? params.fio : ''} />
                        </div>
                        <div className="input-date input-row">
                            <p>Дата рождения</p>
                            <input id="inputBDate" type="date" value={params.bdate} />
                        </div>
                        <div className="input-type input-row">
                            <p>Тип</p>
                            <select id="selectType" value={params.type}>
                                {that.state.types}
                            </select>
                        </div>
                        </>
                    );
                case 'clients':
                    return (
                        <>
                        <div className="input-name input-row">
                                <p id="labelName">Имя</p>
                                <input id="inputName" type="text" />
                            </div>
                        <div className="input-fio input-row">
                            <p>ФИО</p>
                            <input id="inputFIO" type="text" onChange={(e) => {
                                let fio = e.target.value.split(" ");
                                document.getElementById("inputName").value = (fio[0] ? fio[0] : "") + 
                                    (fio[1] ?  ` ${fio[1][0]}.` : "") + 
                                    (fio[2] ? ` ${fio[2][0]}.` : "");
                            }}/>
                        </div>
                        <div className="input-date input-row">
                            <p>Дата рождения</p>
                            <input id="inputBDate" type="date" />
                        </div>
                        <div className="input-type input-row">
                            <p>Тип</p>
                            <select id="selectType">
                                {that.state.types}
                            </select>
                        </div>
                        </>
                    );
                case 'contracts':
                    return (
                        <>
                        <div className="input-name input-row">
                                <p id="labelName">Имя</p>
                                <input id="inputName" type="text" />
                            </div>
                        <div className="input-fio input-row">
                            <p>ФИО</p>
                            <input id="inputFIO" type="text" onChange={(e) => {
                                let fio = e.target.value.split(" ");
                                document.getElementById("inputName").value = (fio[0] ? fio[0] : "") + 
                                    (fio[1] ?  ` ${fio[1][0]}.` : "") + 
                                    (fio[2] ? ` ${fio[2][0]}.` : "");
                            }}/>
                        </div>
                        <div className="input-date input-row">
                            <p>Дата рождения</p>
                            <input id="inputBDate" type="date" />
                        </div>
                        <div className="input-type input-row">
                            <p>Тип</p>
                            <select id="selectType">
                                {that.state.types}
                            </select>
                        </div>
                        </>
                    );
                case 'payments':
                    return (
                        <>
                        <div className="input-name input-row">
                                <p id="labelName">Имя</p>
                                <input id="inputName" type="text" />
                            </div>
                        <div className="input-fio input-row">
                            <p>ФИО</p>
                            <input id="inputFIO" type="text" onChange={(e) => {
                                let fio = e.target.value.split(" ");
                                document.getElementById("inputName").value = (fio[0] ? fio[0] : "") + 
                                    (fio[1] ?  ` ${fio[1][0]}.` : "") + 
                                    (fio[2] ? ` ${fio[2][0]}.` : "");
                            }}/>
                        </div>
                        <div className="input-date input-row">
                            <p>Дата рождения</p>
                            <input id="inputBDate" type="date" />
                        </div>
                        <div className="input-type input-row">
                            <p>Тип</p>
                            <select id="selectType">
                                {that.state.types}
                            </select>
                        </div>
                        </>
                    );
                case 'usertypes':
                    return (
                        <>
                        <div className="input-name input-row">
                            <p>Название</p>
                            <input id="inputName" type="text" />
                        </div>
                        <div className="input-type input-row">
                            <p>Разрешения</p>
                            <select id="selectPermissions">
                                
                            </select>
                        </div>
                        </>
                    );
                default: 
                    <></>
            }
        }
        this.setState({currentU: {
            action: pAction,
            type: pType,
            id: params.id,
            originalData: originalData,
            blocks: getBlocks(pType)
        }});

        document.getElementById("CNewTitle").textContent = pAction === 'create' ? 'Создание' : params.name;
        //document.getElementById("inputName").value = params.name ? params.name : '';
        //document.getElementById("inputFIO").value = params.fio ? params.fio : '';
        //document.getElementById("inputBDate").value = params.bdate ? params.bdate : '';
        //document.getElementById("selectType").value = params.type ? params.type : '';
        document.getElementById("imageInput").src = params.photo ? params.photo : 'http://dream/profilepictures/0.png';

        document.getElementById("LKMIB").style.visibility = "visible";
        document.getElementById("LKMIB").style.opacity = "1";
        document.getElementById("LKMIB-CNew").style.animation = "showFromUp 0.3s";
        document.getElementById("LKMIB-CNew").style.visibility = "visible";
        document.getElementById("LKMIB-CNew").style.opacity = "1";
    }

    showCreatePanel(panelAction, id=0, name="", fio="", bdate="", type=0, photo="http://dream/profilepictures/0.png") {
        this.setState({currentU: {
            action: panelAction, 
            id: id,
            originalData: {
                name: name,
                fio: fio,
                bdate: bdate,
                type: type,
                photo: photo
            }
        }});

        document.getElementById("CNewTitle").textContent = panelAction === 'create' ? 'Создание' : name;
        document.getElementById("inputName").value = name;
        document.getElementById("inputFIO").value = fio;
        document.getElementById("inputBDate").value = bdate;
        document.getElementById("selectType").value = type;
        document.getElementById("imageInput").src = photo;

        document.getElementById("LKMIB").style.visibility = "visible";
        document.getElementById("LKMIB").style.opacity = "1";
        document.getElementById("LKMIB-CNew").style.animation = "showFromUp 0.3s";
        document.getElementById("LKMIB-CNew").style.visibility = "visible";
        document.getElementById("LKMIB-CNew").style.opacity = "1";
    };

    render() {
        return (
        <>
            <header>
                <ul className="main-ul">
                    <li id="Logo"><img src="Sources/images/logo.png" alt=""/></li>
                    <li id="UserHeader">
                        <div className="user-header-main" id="UserHeaderMain" ref={this.box} onClick={() => this.showMore() }>
                            <p className="user-name">{this.state.username}</p>
                            <img className="user-picture" src={this.state.picture} alt="" />
                        </div>
                        <div className="user-header-more" id="UserHeaderMore">
                            <a className="button-profile" >Профиль</a>
                            <a className="button-logout" onClick={() => this.logOut() }>Выйти</a>
                        </div>
                        <div className="selection-shadow"></div>
                    </li>
                </ul>
            </header>
            <div id="LK">
                <div className="control-panel">
                    <div id="categoriesList" className="gr-list">
                        {this.state.categories}
                    </div>
                    <div className="list-of">
                        <p id="createButton" className="button-create" onClick={ () => {
                            //this.showCreatePanel("create");
                            this.showCP("create", this.state.selectedType, {});
                            this.state.currentU.action = "create";
                            }}>Создать</p>
                        {this.state.blocks}
                    </div>
                </div>
                <div id="LKMIB" className="mib" onClick={ () => this.mib() }/>
                <div id="LKMIB-CNew" className="create-new">
                    <div className="title-block">
                        <p id="CNewTitle" className="title-name" />
                        <svg className="title-close" viewBox="0 0 20 20" onClick={ () => this.mib() }>
							<path fill="white" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
						</svg>
                    </div>
                    <div className="input-block">
                        <div className="text-input">
                            {this.state.currentU.blocks}
                            <button className="button-save" onClick={() => {
                                let query = {};
                                let currentData = {
                                    name: document.getElementById("inputName").value,
                                    fio: document.getElementById("inputFIO").value,
                                    bdate: document.getElementById("inputBDate").value,
                                    type: +document.getElementById("selectType").value + 1,
                                    photo: this.state.currentU.photo
                                };
                                console.log(this.state.currentU.action);
                                if (this.state.currentU.action == "update") {
                                    let originalData = this.state.currentU.originalData;
                                    Object.keys(originalData).map(key => {
                                        if (currentData[key] != originalData[key] && key !== "photo") query[key] = currentData[key];
                                    });
                                    uploadFiles("updateUserInfo", {token: getToken(), id: this.state.currentU.id, keys: query}, [currentData.photo ? currentData.photo : undefined]).then( res => {
                                        this.update();
                                        //this.showCreatePanel(currentData.name, currentData.id, currentData.name, currentData.fio, currentData.bdate, currentData.type - 1, this.state.currentU.photo ? window.URL.createObjectURL(currentData.photo) : originalData.photo);
                                        this.showCP(currentData.name, 'users', {id: currentData.id, name: currentData.name, fio: currentData.fio, bdate: currentData.bdate, type: currentData.type - 1, photo: this.state.currentU.photo ? window.URL.createObjectURL(currentData.photo) : originalData.photo});
                                    });
                                } else if (this.state.currentU.action == "create") {
                                    let originalData = this.state.currentU.originalData;
                                    Object.keys(originalData).map(key => {
                                        if (currentData[key] != originalData[key] && key !== "photo") query[key] = currentData[key];
                                    });
                                    uploadFiles("createUser", {token: getToken(), keys: query}, [currentData.photo ? currentData.photo : undefined]).then( res => {
                                        this.update();
                                        //this.showCreatePanel(currentData.name, currentData.id, currentData.name, currentData.fio, currentData.bdate, currentData.type - 1, this.state.currentU.photo ? window.URL.createObjectURL(currentData.photo) : originalData.photo);
                                        this.showCP(currentData.name, 'users', {id: currentData.id, name: currentData.name, fio: currentData.fio, bdate: currentData.bdate, type: currentData.type - 1, photo: this.state.currentU.photo ? window.URL.createObjectURL(currentData.photo) : originalData.photo});
                                    });
                                }
                            }}>Сохранить</button>
                        </div>
                        <div className="image-input-block">
                            <p className="image-title">Фото</p>
                            <input id="imageInput" className="image-input" type="image" onClick={ () => document.getElementById("fileInput").click() }/>
                            <input id="fileInput" type="file" accept="image/*" onChange={ (e) => {
                                this.state.currentU.photo = e.target.files[0];
                                document.getElementById("imageInput").src = window.URL.createObjectURL(e.target.files[0]);
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    };
}
export default LK;