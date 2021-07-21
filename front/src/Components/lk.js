import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {request, getToken} from './requests';

class LK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            type: "",
            picture: "",
            blocks: [],
            types: []
        };
        this.box = React.createRef();
        request("getUserInfo", {
            token: getToken(),
            keys: ["name", "type", "picture"]
        }).then(res => {
            console.log(res);
            if (res.success && !res.error) {
                this.setState({
                    username: res.data.name,
                    type: res.data.type,
                    picture: res.data.picture
                });
            }
            else {
                this.logOut();
            }
        });
        request("getEmployees", {
             "token": getToken() 
        }).then(res => {
            console.log(res);
            if (res.success && !res.error) {
                let __blocks = [];
                res.data.users.map(user => {
                    __blocks.push(
                        <div className="not-enought">
                            <img className="user-picture" src={user.picture} alt="" />
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
    };
    
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
        document.getElementById("LKMIB-CNEW").style.animation = "hideToDown 0.3s";
        document.getElementById("LKMIB-CNEW").style.visibility = "hidden";
        document.getElementById("LKMIB-CNEW").style.opacity = "0";
    };
    showCreatePanel() {
        document.getElementById("LKMIB").style.visibility = "visible";
        document.getElementById("LKMIB").style.opacity = "1";
        document.getElementById("LKMIB-CNEW").style.animation = "showFromUp 0.3s";
        document.getElementById("LKMIB-CNEW").style.visibility = "visible";
        document.getElementById("LKMIB-CNEW").style.opacity = "1";
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
                        <p className="button-create" onClick={ () => this.showCreatePanel() }>Создать</p>
                        {this.state.blocks}
                    </div>
                </div>
                <div id="LKMIB" className="mib" onClick={ () => this.mib() }/>
                <div id="LKMIB-CNEW" className="create-new">
                    <div className="title-block">
                        <p className="title-name">Константинов А.Л.</p>
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
                                <input id="inputFIO" type="text" />
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
                            <button className="button-save">Сохранить</button>
                        </div>
                        <div className="image-input-block">
                            <p className="image-title">Фото</p>
                            <input id="imageInput" className="image-input" type="image" src="http://dream/profilepictures/0.png" onClick={ () => document.getElementById("fileInput").click() }/>
                            <input id="fileInput" type="file" accept="image/*" onChange={ (e) =>  document.getElementById("imageInput").src = window.URL.createObjectURL(e.target.files[0]) } />
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