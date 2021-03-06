import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {request, requests, uploadFiles, getToken} from './requests';
import readXlsx from 'read-excel-file';

class LK extends Component {
    constructor (props) {
        super (props);
        this.state = {
            me: { username: '', photo: 'http://dream/profilepictures/0.png' },
            blocks: {
                categories: [],
                types: [],
                branches: [],
                list: [],
                createNewPanel: <div id='LKMIB-CNew' className='create-new'> </div>,
                inputXlsx: <></>,
                searchBox: <></>
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

    uploadXlsx(l, file) {
        if (l === 'users') {
            let schema = {
                '??????': {
                    prop: 'fio',
                    type: String,
                    required: true
                },
                '???????? ????????????????': {
                    prop: 'bdate',
                    type: (v) => {
                        return `${v.getFullYear()}-${v.getMonth()+1}-${v.getDate()}`;
                    }
                },
                '??????': {
                    prop: 'type',
                    type: (v) => {
                        switch (v) {
                            case '??????????':
                                return 3;
                            case '????????????????':
                                return 2;
                            case '??????????????????':
                                return 4;
                            case '??????????????????????????':
                                return 1;
                            default:
                                return 0;
                        }
                    }                
                },
                '????????????': {
                    prop: 'branch',
                    type: Number
                }
            };
            readXlsx(file, { schema }).then(({ rows, errors }) => {
                request('createUser', {token: getToken(), users: rows}).then(res => {
                    if (res.success) this.update(this.state.currList);
                });
            });
        } else if (l === 'clients') {
            let schema = {
                '??????': {
                    prop: 'fio',
                    type: String,
                    required: true
                },
                '???????? ????????????????': {
                    prop: 'bdate',
                    type: (v) => {
                        return `${v.getFullYear()}-${v.getMonth()+1}-${v.getDate()}`;
                    }
                },
                '????????????': {
                    prop: 'status',
                    type: (v) => {
                        switch (v) {
                            case '??????????????':
                                return 0;
                            case '??????????????????????????????????':
                                return 1;
                            case 'VIP':
                                return 2;
                            default:
                                return 0;
                        }
                    }                
                },
                '??????????': {
                    prop: 'passport_series',
                    type: Number
                },
                '??????????': {
                    prop: 'passport_number',
                    type: Number
                },
                '???????? ????????????': {
                    prop: 'issue_date',
                    type: (v) => {
                        return `${v.getFullYear()}-${v.getMonth()+1}-${v.getDate()}`;
                    }
                },
                '??????????, ???????????????? ????????????????': {
                    prop: 'issuing_authority',
                    type: String
                }
            };
            readXlsx(file, { schema }).then(({ rows, errors }) => {
                request('createClient', {token: getToken(), clients: rows}).then(res => {
                    if (res.success) this.update(this.state.currList);
                });
            });
        }
    }

    setListOf(l) {
        request('getListOf', { token:getToken(), list: l}).then(res => {
            if (!res.data.success) return;
            let __blocks = [];
            if (l === 'clients' || l === 'users') 
                this.setBlocks({
                    inputXlsx: <>
                        <input id="fileInputXlsx" type="file" accept=".xlsx" onChange={(e) => {
                            this.uploadXlsx(this.state.currList, e.target.files[0]);
                        }} />
                        <svg className='upload-button svg-icon' viewBox='0 0 20 20' onClick={() => document.getElementById("fileInputXlsx").click()}>
                            <path fill='#fff' d="M8.416,3.943l1.12-1.12v9.031c0,0.257,0.208,0.464,0.464,0.464c0.256,0,0.464-0.207,0.464-0.464V2.823l1.12,1.12c0.182,0.182,0.476,0.182,0.656,0c0.182-0.181,0.182-0.475,0-0.656l-1.744-1.745c-0.018-0.081-0.048-0.16-0.112-0.224C10.279,1.214,10.137,1.177,10,1.194c-0.137-0.017-0.279,0.02-0.384,0.125C9.551,1.384,9.518,1.465,9.499,1.548L7.76,3.288c-0.182,0.181-0.182,0.475,0,0.656C7.941,4.125,8.234,4.125,8.416,3.943z M15.569,6.286h-2.32v0.928h2.32c0.512,0,0.928,0.416,0.928,0.928v8.817c0,0.513-0.416,0.929-0.928,0.929H4.432c-0.513,0-0.928-0.416-0.928-0.929V8.142c0-0.513,0.416-0.928,0.928-0.928h2.32V6.286h-2.32c-1.025,0-1.856,0.831-1.856,1.856v8.817c0,1.025,0.832,1.856,1.856,1.856h11.138c1.024,0,1.855-0.831,1.855-1.856V8.142C17.425,7.117,16.594,6.286,15.569,6.286z" />
                        </svg>
                    </>
                });
            else this.setBlocks({ inputXlsx: <></> });
            let __think = (t, u) => {
                switch (t) {
                    case 'clients':
                        let __status = u.status === '0' ? '??????????????' : u.status === '1' ? '??????????????????????????????????' : u.status === '2' ? 'VIP' : '';
                        return (
                            <div className='not-enought' onClick={() => {
                                this.showCreatePanel(1, l, { id: u.id, name: u.name, fio: u.fio, bdate: u.bdate, issue_date: u.issue_date, issuing_authority: u.issuing_authority, passport_number: u.passport_number, passport_series: u.passport_series, status: u.status});
                            }}>
                                <div className='u-info-nt'>
                                    <p className='u-name u-text'>{u.fio}</p>
                                    <p className='u-type u-text'>{__status}</p>
                                </div>
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
                            this.showCreatePanel(1, l, { id: u.id, name: u.name, fio: u.fio, bdate: u.bdate, type: u.typeid - 1, branch: u.branch - 1, photo: u.photo });
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
                    case 'branches':
                        return (
                            <div className='not-enought' onClick={() => {
                                this.showCreatePanel(1, l, { id: u.id, name: u.name });
                                }}>
                                <div className='u-info-nt'>
                                    <p className='u-name u-text'>{u.name}</p>
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
            'getBranches': {},
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

                if (data.getBranches.success) { // getBranches
                    let __branches = [];
                    let __counter = 0;
                    data.getBranches.data.branches.map(branch => {
                        __branches.push( <option value={__counter}> {branch} </option> );
                        __counter ++;
                    });
                    this.setBlocks({branches: __branches});
                }

                if (data.getCategories.success) { // getCategories
                    let __categories = [];
                    let __counter = 1;
                    let __getName = (cat) => {
                        switch (cat) {
                            case 'clients':
                                return '??????????????';
                            case 'contracts':
                                return '????????????????';
                            case 'payments':
                                return '??????????????';
                            case 'users':
                                return '????????????????????????';
                            case 'usertypes':
                                return '???????? ??????????????????????????';
                            case 'branches':
                                return '??????????????';
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

    showSearchBox(list) {
        let __searchBox = (
            <div className='searchBox'>
                
            </div>
        )
        this.setBlocks({searchBox: __searchBox});
    }

    showCreatePanel(action, type, params) {
        this.setState({currCP: {action: action, type: type, data: params}});
        const __getInput = (t) => {
            switch (t) {
                case 'users':
                    return [<>
                        <div className='input-name input-row'> 
                            <p> ?????? </p> <input id='inputName' type='text' defaultValue={params.name ? params.name : ''} />
                        </div>
                        <div className="input-fio input-row">
                            <p> ?????? </p> <input id="inputFIO" type="text" onChange={(e) => {
                                let fio = e.target.value.split(" ");
                                document.getElementById("inputName").value = (fio[0] ? fio[0] : "") + 
                                    (fio[1] ?  ` ${fio[1][0]}.` : "") + 
                                    (fio[2] ? ` ${fio[2][0]}.` : "");
                            }} defaultValue={params.fio ? params.fio : ''} />
                        </div>
                        <div className="input-date input-row">
                            <p> ???????? ???????????????? </p> <input id="inputBDate" type="date" defaultValue={params.bdate ? params.bdate : ''} />
                        </div>
                        <div className="input-type input-row">
                            <p> ???????????? </p> <select id="selectBranch" defaultValue={params.branch ? params.branch : 0} > {this.state.blocks.branches} </select>
                        </div>
                        <div className="input-type input-row">
                            <p> ?????? </p> <select id="selectType" defaultValue={params.type ? params.type : 0}> {this.state.blocks.types} </select>
                        </div>
                    </>, 350, action === 0 ? '???????????????????? ????????????????????????' : params.name];
                case 'clients':
                    return [<>
                        <div className='tabs'>
                            <button id='tabMain' className='tab tab-main' onClick={(e) => {
                                e.target.style.backgroundColor = '#494850';
                                document.getElementById('tabPassport').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabMainContent').style.display = 'block';
                                document.getElementById('tabPassportContent').style.display = 'none';
                            }}>????????????????</button>
                            <button id='tabPassport' className='tab tab-passport' onClick={(e) => {
                                document.getElementById('tabMain').style.backgroundColor = '#2c2c34';
                                e.target.style.backgroundColor = '#494850';
                                document.getElementById('tabMainContent').style.display = 'none';
                                document.getElementById('tabPassportContent').style.display = 'block';
                            }}>???????????????????? ????????????</button>
                        </div>
                        <div id='tabMainContent' className='tab-content'>
                            <div className='input-name input-row'> 
                                <p> ?????? </p> <input id='inputName' type='text' defaultValue={params.name ? params.name : ''} />
                            </div>
                            <div className='input-fio input-row'>
                                <p> ?????? </p> <input id="inputFIO" type='text' onChange={(e) => {
                                    let fio = e.target.value.split(' ');
                                    document.getElementById('inputName').value = (fio[0] ? fio[0] : '') + 
                                        (fio[1] ?  ` ${fio[1][0]}.` : '') + 
                                        (fio[2] ? ` ${fio[2][0]}.` : '');
                                }} defaultValue={params.fio ? params.fio : ''} />
                            </div>
                            <div className='input-date input-row'>
                                <p> ???????? ???????????????? </p> <input id='inputBDate' type='date' defaultValue={params.bdate ? params.bdate : ''} />
                            </div>
                            <div className='input-type input-row'>
                                <p> ???????????? </p> <select id="selectStatus" defaultValue={params.status ? params.status : 0}>
                                    <option value={0}>??????????????</option>
                                    <option value={1}>??????????????????????????????????</option>
                                    <option value={2}>VIP</option>
                                </select>
                            </div>
                        </div>
                        <div id='tabPassportContent' className='tab-content'>
                            <div className='input-number input-row'> 
                                <p> ?????????? </p> <input id='inputpassport_series' type='number' defaultValue={params.passport_series ? params.passport_series : ''} />
                                <p> ?????????? </p> <input id='inputpassport_number' type='number' defaultValue={params.passport_number ? params.passport_number : ''} />
                            </div>
                            <div className='input-date input-row'> 
                                <p> ???????? ???????????? </p> <input id='inputPassportIssue' type='date' defaultValue={params.issue_date ? params.issue_date : ''} />
                            </div>
                            <div className='input-text input-row'> 
                                <p> ??????????, ???????????????? ???????????????? </p> <input id='inputAuthority' type='text' defaultValue={params.issuing_authority ? params.issuing_authority : ''} />
                            </div>
                        </div>
                    </>, 350, action === 0 ? '???????????????????? ??????????????' : ''];
                case 'contracts':
                    return [<>
                        <div className='tabs margin-top'>
                            <button id='tabMain' className='tab tab-main' onClick={(e) => {
                                e.target.style.backgroundColor = '#494850';
                                document.getElementById('tabTripRoute').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabTripParticipants').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabMainContent').style.display = 'block';
                                document.getElementById('tabRouteContent').style.display = 'none';
                                document.getElementById('tabParticipantsContent').style.display = 'none';
                            }}> ???????????????? </button>
                            <button id='tabTripParticipants' className='tab tab-tripParticipants' onClick={(e) => {
                                e.target.style.backgroundColor = '#494850';
                                document.getElementById('tabTripRoute').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabMain').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabParticipantsContent').style.display = 'block';
                                document.getElementById('tabRouteContent').style.display = 'none';
                                document.getElementById('tabMainContent').style.display = 'none';
                            }}> ?????????????????? ?????????????? </button>
                            <button id='tabTripRoute' className='tab tab-tripRoute' onClick={(e) => {
                                e.target.style.backgroundColor = '#494850';
                                document.getElementById('tabTripParticipants').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabMain').style.backgroundColor = '#2c2c34';
                                document.getElementById('tabParticipantsContent').style.display = 'none';
                                document.getElementById('tabMainContent').style.display = 'none';
                                document.getElementById('tabRouteContent').style.display = 'block';
                            }}> ?????????????? ?????????????? </button>
                        </div>
                        <div id='tabMainContent' className='tab-content'>
                            <div className='input-date input-row'> 
                                <p> ???????? </p> <input id='inputDate' type='date' defaultValue={params.Date ? params.Date : ''} />
                            </div>
                            <div className='input-text input-row'> 
                                <p> ???????????????????? </p> <input id='inputContract' type='text' defaultValue={params.contract ? params.contract : ''} />
                            </div>
                            <div className='input-text input-row'> 
                                <p> ?????????????????????? </p> <select id='inputOrganization' type='text' defaultValue={params.organization ? params.organization : ''} > {this.state.blocks.branches} </select>
                            </div>
                            <div className='input-text input-row'> 
                                <p> ?????????? </p> <input id='inputExecutor' type='text' defaultValue={params.executor ? params.executor : ''} />
                            </div>
                            <div className='input-text input-row'> 
                                <p> ???????????? </p> <input id='inputClient' type='text' defaultValue={params.client ? params.client : ''} />
                            </div>
                            <div className='input-date input-row'> 
                                <p> ???????????? ?????????????? </p> <input id='inputDateStart' type='date' defaultValue={params.tripStart ? params.tripStart : ''} />
                            </div>
                            <div className='input-date input-row'>
                                <p> ?????????? ?????????????? </p> <input id='inputDateEnd' type='date' defaultValue={params.tripEnd ? params.tripEnd : ''} />
                            </div>
                        </div>
                        <div id='tabParticipantsContent' className='tab-content'>
                            <table className='table-contracts'>
                                <tr className='table-tr'>
                                    <th>???</th>
                                    <th>??????</th>
                                </tr>
                                <tr className='table-tr-add'>
                                    <th/>
                                    <th/>
                                </tr>
                            </table>
                            <button className='button-add-table' onClick={()=>this.showSearchBox()}>????????????????</button>
                        </div>
                        <div id='tabRouteContent' className='tab-content'>
                            <table className='table-contracts'>
                                <tr className='table-tr'>
                                    <th>???</th>
                                    <th>??????????</th>
                                    <th>??????????????????</th>
                                    <th>?????? ????????????</th>
                                    <th>???????? ????????????</th>
                                    <th>???????? ??????????????????</th>
                                </tr>
                                <tr className='table-tr-add'>
                                    <th/>
                                    <th/>
                                    <th/>
                                    <th/>
                                    <th/>
                                    <th/>
                                </tr>
                            </table>
                            <button className='button-add-table'>????????????????</button>
                        </div>
                    </>, 480, action === 0 ? '???????????????? ????????????????' : ''];
                case 'payments':
                    return [<>
                        <div className='input-date input-row'> 
                            <p> ???????? </p> <input id='inputDate' type='date' defaultValue={params.date ? params.date : ''} />
                        </div>
                        <div className="input-text input-row">
                            <p> ?????????????????????? </p> <input id="selectOrganization" type='text' defaultValue={params.organization ? params.organization : ''} />
                        </div>
                        <div className="input-text input-row">
                            <p> ?????????????? </p> <input id="selectContract" type='text' defaultValue={params.contract ? params.contract : ''} />
                        </div>
                        <div className="input-text input-row">
                            <p> ?????????? ?? ???????????? </p> <input id="selectAmount" type='number' defaultValue={params.amount ? params.amount : ''} />
                        </div>
                    </>, 310, action === 0 ? '???????????????????? ??????????????' : ''];
                case 'usertypes':
                    return [<>
                        <div className='input-name input-row'> 
                            <p> ?????? </p> <input id='inputName' type='text' defaultValue={params.type ? params.type : ''} />
                        </div>
                    </>, 230, action === 0 ? '???????????????? ???????? ??????????????????????????' : params.type];
                    /*<div className="input-type input-row">
                        <p> ???????????????????? </p> <select id="selectType" defaultValue={[]} multiple> </select>
                    </div>*/
                case 'branches':
                    return [<>
                        <div className='input-name input-row'> 
                            <p> ???????????????? </p> <input id='inputName' type='text' defaultValue={params.name ? params.name : ''} />
                        </div>
                    </>, 180, action === 0 ? '???????????????? ??????????????' : params.name];
                default:
                    return [<></>, 0, '']
            }
        };
        const [__textInput, __height, __title] = __getInput(type);
        const __imageInput = (type === 'users') ? 
        <div className="image-input-block">
            <p className="image-title"> ???????? </p>
            <input id="imageInput" className="image-input" type="image" alt='' onClick={ () => document.getElementById("fileInput").click() } src={ params.photo ? params.photo : 'http://dream/profilepictures/0.png' }/>
            <input id="fileInput" type="file" accept="image/png, image/jpeg" onChange={(e) => {
                this.setState((prevState) => {
                    return { currCP: Object.assign(prevState.currCP, {photo: e.target.files[0]}) };
                });
                document.getElementById("imageInput").src = window.URL.createObjectURL(e.target.files[0]);
            }} />
        </div> : <></>;

        let __newCP = (
            <>
            <div id='LKMIB-CNew' className='create-new' style={{height: __height}}>
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
                            let __doSomething = (t) => {
                                let __currData = {};
                                let __query = {};
                                let __emptyCheck = (keys) => {
                                    let __what = true;
                                    keys.forEach(key => {
                                        if (document.getElementById(key).value === '') {
                                            __what = false;
                                            document.getElementById(key).style.backgroundColor = 'rgba(255, 0, 0, .1)';
                                        } else 
                                            document.getElementById(key).style.backgroundColor = '';
                                    });
                                    return __what;
                                };
                                switch (t) {
                                    case 'users':
                                        if (!__emptyCheck(['inputName', 'inputFIO', 'inputBDate'])) return;
                                        __currData = {
                                            name: document.getElementById("inputName").value,
                                            fio: document.getElementById("inputFIO").value,
                                            bdate: document.getElementById("inputBDate").value,
                                            type: document.getElementById("selectType").value,
                                            branch: document.getElementById("selectBranch").value,
                                            photo: this.state.currCP.photo
                                        };
                                        if (this.state.currCP.action === 1) { // update
                                            let __originalData = this.state.currCP.data;
                                            
                                            Object.keys(__originalData).map(key => {
                                                if (__currData[key] !== __originalData[key] && key !== 'photo' && key !== 'id') 
                                                    if (key === 'type' || key === 'branch') __query[key] = +__currData[key] + 1;
                                                    else __query[key] = __currData[key];
                                            });
                                            if (__query !== {}) 
                                                uploadFiles('updateUserInfo', { token: getToken(), id: __originalData.id, keys: __query }, [__currData.photo ? __currData.photo : undefined]).then(res => {
                                                    this.update(this.state.currCP.type);
                                                    this.showCreatePanel(1, this.state.currCP.type, Object.assign(__currData, {
                                                        id: __originalData.id, photo: __currData.photo ? window.URL.createObjectURL(__currData.photo) : __originalData.photo
                                                    }));
                                                });
                                        } else if (this.state.currCP.action === 0) { // create
                                            Object.keys(__currData).map(key => {
                                                if (key === 'type' || key === 'branch') __query[key] = +__currData[key] + 1;
                                                else if (key !== 'photo') __query[key] = __currData[key];
                                            });
                                            uploadFiles("createUser", {token: getToken(), keys: __query}, [__currData.photo ? __currData.photo : undefined]).then( res => {
                                                this.update(this.state.currCP.type);
                                                this.mib();
                                            });
                                        }
                                        return;
                                    case 'clients':
                                        if (!__emptyCheck(['inputName', 'inputFIO', 'inputBDate', 'inputpassport_series', 'inputpassport_number', 'inputPassportIssue', 'inputAuthority', 'selectStatus'])) return;
                                        __currData = {
                                            fio: document.getElementById("inputFIO").value,
                                            name: document.getElementById("inputName").value,
                                            passport_series: document.getElementById("inputpassport_series").value,
                                            passport_number: document.getElementById("inputpassport_number").value,
                                            issue_date: document.getElementById("inputPassportIssue").value,
                                            issuing_authority: document.getElementById("inputAuthority").value,
                                            status: document.getElementById("selectStatus").value,
                                            bdate: document.getElementById("inputBDate").value,
                                        };
                                        if (this.state.currCP.action === 1) { // update
                                            let __originalData = this.state.currCP.data;
                                            Object.keys(__originalData).map(key => {
                                                if (__currData[key] !== __originalData[key] && key !== 'id'){
                                                    __query[key] = __currData[key];
                                                }
                                            });
                                            if (__query !== {}) 
                                                request('updateClient', { token: getToken(), id: __originalData.id, keys: __query }).then(res => {
                                                    this.update(this.state.currCP.type);
                                                    this.showCreatePanel(1, this.state.currCP.type, Object.assign(__currData, { id: __originalData.id }));
                                                });
                                        } else if (this.state.currCP.action === 0) { // create
                                            Object.keys(__currData).map(key => {
                                                if (key !== 'photo') __query[key] = __currData[key];
                                            });
                                            request("createClient", {token: getToken(), client: __query}).then( res => {
                                                this.update(this.state.currCP.type);
                                                this.mib();
                                            });
                                        }
                                        return;
                                    case 'contracts':
                                        return;
                                    case 'payments':
                                        return;
                                    case 'usertypes':
                                        if (!__emptyCheck(['inputName'])) return;
                                        __currData = {
                                            name: document.getElementById('inputName').value
                                        };
                                        if (this.state.currCP.action === 1) { // update
                                            let __originalData = this.state.currCP.data;
                                            if (__currData.name !== __originalData.name)
                                                request('updateType', { token: getToken(), id: __originalData.id, name: __currData.name}).then(res => {
                                                    this.update(this.state.currCP.type);
                                                    this.showCreatePanel(1, this.state.currCP.type, Object.assign({ id: __originalData.id, type: __currData.name }));
                                                });
                                        } else if (this.state.currCP.action === 0) { // create
                                            request('createType', { token: getToken(), name: __currData.name}).then(res => {
                                                this.update(this.state.currCP.type);
                                                this.mib();
                                            });
                                        }
                                        return;
                                    case 'branches':
                                        if (!__emptyCheck(['inputName'])) return;
                                        __currData = {
                                            name: document.getElementById('inputName').value
                                        };
                                        if (this.state.currCP.action === 1) { // update
                                            let __originalData = this.state.currCP.data;
                                            if (__currData.name !== __originalData.name)
                                                request('updateBranch', { token: getToken(), id: __originalData.id, name: __currData.name}).then(res => {
                                                    this.update(this.state.currCP.type);
                                                    this.showCreatePanel(1, this.state.currCP.type, Object.assign(__currData, { id: __originalData.id }));
                                                });
                                        } else if (this.state.currCP.action === 0) { // create
                                            request('createBranch', { token: getToken(), name: __currData.name}).then(res => {
                                                this.update(this.state.currCP.type);
                                                this.mib();
                                            });
                                        }
                                        return;
                                    default:
                                        return;
                                }
                            };

                            __doSomething(this.state.currCP.type);
                        }}>??????????????????</button>
                    </div>
                    {__imageInput}
                </div>
            </div>
            {this.state.blocks.searchBox}
            </>
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
                            <p className='button-profile'> ?????????????? </p>
                            <p className='button-logout' onClick={() => this.logOut()} > ?????????? </p>
                        </div>
                    </li>
                </ul>
            </header>
            <div id='LK'>
                <div className='control-panel'>
                    <div id='categoriesList' className='gr-list'> {this.state.blocks.categories} </div>
                    <div className='list-of'>
                        <div className='list-controls'>
                            {this.state.blocks.inputXlsx}
                            <p id='createButton' className='button-create' onClick={() => {
                                this.showCreatePanel(0, this.state.currList, {});
                            }}> ?????????????? </p>
                        </div>
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