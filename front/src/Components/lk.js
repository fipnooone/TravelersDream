import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class LK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            type: "",
            picture: "",
            blocks: []
        };
        this.box = React.createRef();
        this.getUserInfo();
        this.getEmployees();
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
    }
    logOut() {
        Cookies.remove('data', { path: '', domain: 'localhost' });
        this.props.props.history.push({
            pathname: '/auth'
        })
    };
    getUserInfo() {
        let formData = new FormData();
        formData.append("method", "getUserInfo");
        formData.append("data", JSON.stringify({
            "token": JSON.parse(Cookies.get("data")).token,
            "keys": ["name", "type", "picture"]
        }));
        axios.post("http://dream", formData).then(res => {
            if (res.data.success) {
                this.setState({
                    username: res.data.data.name,
                    type: res.data.data.type,
                    picture: res.data.data.picture
                });
            }
            else {
                this.logOut();
            }
        })
        .catch(err => {
            this.logOut();
        });
    };
    getEmployees() {
        let formData = new FormData();
        formData.append("method", "getEmployees");
        formData.append("data", JSON.stringify({ "token": JSON.parse(Cookies.get("data")).token }));
        axios.post("http://dream", formData).then(res => {
            if (res.data.success) {
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
    }
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
                        <p className="button-create"></p>
                        {this.state.blocks}
                    </div>
                </div>
            </div>
        </>
        );
    };
}
/*
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