import React from 'react';

function Registration() {
  return (
    <>
        <noscript>Видимо, ваш браузер не поддерживает JavaScript, либо он выключен. Включите его для корректной работы сайта.</noscript>
        <header>
            <ul>
                <li id="Logo"><img src="Sources/images/logo.png"  alt=""/></li>
                <li id="Auth">
                    <a href="/login" className="button button-login">Войти</a>
                    <a href="/register" className="button button-register">Регистрация</a>
                    <div className="selection-shadow"></div>
                </li>
            </ul>
        </header>
        <div id="Registration">
            <div className="Form">
                <svg width="64" height="78" viewBox="0 0 64 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 0H52C58.6274 0 64 5.37258 64 12V51.76C64 55.9458 61.8189 59.8291 58.2444 62.0073L38.2444 74.1948C34.4095 76.5317 29.5905 76.5317 25.7556 74.1948L5.75557 62.0073C2.18114 59.8291 0 55.9458 0 51.76V12C0 5.37258 5.37258 0 12 0H32Z" fill="#0e1118"></path>
                    <path d="M31.9963 37.7037C26.9645 37.7037 22.6665 38.4971 22.6665 41.6704C22.6665 44.8449 26.9377 45.6662 31.9963 45.6662C37.0282 45.6662 41.3262 44.8741 41.3262 41.6996C41.3262 38.5251 37.0562 37.7037 31.9963 37.7037Z" fill="#FAFAFA"></path>
                    <path opacity="0.4" d="M31.9963 34.681C35.4239 34.681 38.1703 31.9335 38.1703 28.507C38.1703 25.0805 35.4239 22.333 31.9963 22.333C28.5698 22.333 25.8223 25.0805 25.8223 28.507C25.8223 31.9335 28.5698 34.681 31.9963 34.681Z" fill="#FAFAFA"></path>
                </svg>
                <p id="TextLogin">Введите свое ФИО<br/>для регистрации</p>
                <div className="login-data">
                    <input id="Name" type="text" placeholder="ФИО" maxLength="255"></input>
                    <input id="Login" type="email" placeholder="Логин" maxLength="255"></input>
                    <input id="Password" type="password" placeholder="Пароль" maxLength="255"></input>
                    <button>Далее</button>
                </div>
            </div>
        </div>
        <footer></footer>
    </>
  );
}

export default Registration;