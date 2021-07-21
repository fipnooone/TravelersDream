import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Authorization from './Components/Authorization';
import LK from './Components/lk';
import './index.sass';
//import reportWebVitals from './reportWebVitals';

const Auths = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/auth"/>
        <ProtectedRoute exact path="/auth" component={Authorization}/>
        <ProtectedRoute exact path="/lk" component={LK}/>
        <Redirect from="/" to="/auth"/>
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <>
  <noscript>Видимо, ваш браузер не поддерживает JavaScript, либо он выключен. Включите его для корректной работы сайта.</noscript>
  <Auths />
  <footer>
    <div className="footer-block">
      <p className="Org-Name text">ООО "Мечта путешественника"</p>
      <img id="LogoFooter" src="Sources/images/logo-ru.png" alt=""/>
      <a className="Sign text" href="http://fipnoo.one" target="_blank" rel="noopener noreferrer">developed by fipnooone</a>
    </div>
  </footer>
  </>, document.getElementsByTagName('body')[0]
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();