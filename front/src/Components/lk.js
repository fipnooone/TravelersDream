import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {request, uploadFiles, getToken} from './requests';

class LK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            type: "",
            picture: "",
            blocks: [],
            types: [],
            currentUser: {
                action: "",
                id: 0,
                originalData: {},
            }
        };
        this.box = React.createRef();
        this.getUserInfo();
        this.getEmployees();
        this.getTypes();
    };

    getUserInfo() {
        request("getUserInfo", {
            token: getToken(),
            keys: ["name", "type", "photo"]
        }).then(res => {
            if (res.success && !res.error) {
                this.setState({
                    username: res.data.name,
                    type: res.data.type,
                    picture: res.data.photo
                });
            }
            else {
                this.logOut();
            }
        });
    }
    getEmployees() {
        request("getEmployees", {
            "token": getToken() 
       }).then(res => {
           if (res.success && !res.error) {
               let __blocks = [];
               res.data.users.map(user => {
                   __blocks.push(
                       <div className="not-enought" onClick={ () => {
                            this.showCreatePanel('update', user.id, user.name, user.fio, user.bdate, user.typeid - 1, user.photo);
                            this.state.currentUser.action = "update";
                        }}>
                           <img className="user-picture" src={user.photo} alt="" />
                           <div className="user-info-nt">
                               <p className="user-name user-text">{user.name}</p>
                               <p className="user-type user-text">{user.type}</p>
                           </div>
                       </div>
                   );
               });
               this.setState({blocks: __blocks});
           }
       });
    }
    getTypes() {
        request("getTypes", {
            "token": getToken()
        }).then(res => {
            if (res.success && !res.error) {
                let __types= [];
                let counter = 0;
                res.data.types.map(type => {
                    __types.push(<option value={counter}>{type}</option>);
                    counter += 1;
                });
                this.setState({types: __types});
            }
            else {
                this.logOut();
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
    showCreatePanel(panelType, id=0, name="", fio="", bdate="", type=0, photo="http://dream/profilepictures/0.png") {
        this.setState({currentUser: {
            action: panelType, 
            id: id,
            originalData: {
                name: name,
                fio: fio,
                bdate: bdate,
                type: type,
                photo: photo
            }
        }});
        document.getElementById("CNewTitle").textContent = panelType === 'create' ? 'Создание' : name;
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
                    <div className="gr-list">
                        <p>Сотрудники</p>
                        <p>Клиенты</p>
                        <p>Агенты</p>
                    </div>
                    <div className="list-of">
                        <p className="button-create" onClick={ () => {
                            this.showCreatePanel("create");
                            this.state.currentUser.action = "create";
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
                            <div className="input-name input-row">
                                <p>Имя</p>
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
                                    {this.state.types}
                                </select>
                            </div>
                            <button className="button-save" onClick={() => {
                                let query = {};
                                let currentData = {
                                    name: document.getElementById("inputName").value,
                                    fio: document.getElementById("inputFIO").value,
                                    bdate: document.getElementById("inputBDate").value,
                                    type: +document.getElementById("selectType").value + 1,
                                    photo: this.state.currentUser.photo
                                };
                                console.log(this.state.currentUser.action);
                                if (this.state.currentUser.action == "update") {
                                    let originalData = this.state.currentUser.originalData;
                                    Object.keys(originalData).map(key => {
                                        if (currentData[key] != originalData[key] && key !== "photo") query[key] = currentData[key];
                                    });
                                    uploadFiles("updateUserInfo", {token: getToken(), id: this.state.currentUser.id, keys: query}, [currentData.photo ? currentData.photo : undefined]).then( res => {
                                        this.getUserInfo();
                                        this.getEmployees();
                                        this.getTypes();
                                        this.showCreatePanel(currentData.name, currentData.id, currentData.name, currentData.fio, currentData.bdate, currentData.type - 1, this.state.currentUser.photo ? window.URL.createObjectURL(currentData.photo) : originalData.photo);
                                    });
                                } else if (this.state.currentUser.action == "create") {
                                    let originalData = this.state.currentUser.originalData;
                                    Object.keys(originalData).map(key => {
                                        if (currentData[key] != originalData[key] && key !== "photo") query[key] = currentData[key];
                                    });
                                    uploadFiles("createUser", {token: getToken(), keys: query}, [currentData.photo ? currentData.photo : undefined]).then( res => {
                                        this.getUserInfo();
                                        this.getEmployees();
                                        this.getTypes();
                                        this.showCreatePanel(currentData.name, currentData.id, currentData.name, currentData.fio, currentData.bdate, currentData.type - 1, this.state.currentUser.photo ? window.URL.createObjectURL(currentData.photo) : originalData.photo);
                                    });
                                }
                            }}>Сохранить</button>
                        </div>
                        <div className="image-input-block">
                            <p className="image-title">Фото</p>
                            <input id="imageInput" className="image-input" type="image" onClick={ () => document.getElementById("fileInput").click() }/>
                            <input id="fileInput" type="file" accept="image/*" onChange={ (e) => {
                                this.state.currentUser.photo = e.target.files[0];
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
/* document.getElementById("imageInput").src="http://dream/profilepictures/1.png"
<li id="UserHeader">
                        <ul className="user-header-ul">
                            <li className="user-name"><p>{this.state.username}</p></li>
                            <li className="user-picture"><img src="https://randus.org/photos/w/c793b9797c7d3810.jpg" alt="" /></li>
                        </ul>
                        <a className="button button-logout" onClick={() => this.logOut() }>Выйти</a>
                        <div className="selection-shadow"></div>
                    </li> */
//onClick={this.setState({ currAction: false })}
export default LK;