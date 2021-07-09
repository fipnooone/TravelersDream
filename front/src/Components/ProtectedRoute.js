import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const cookie = Cookies.get();
    const logged = cookie.data ? JSON.parse(cookie.data).token ? true : false : false;
    return(
        <Route {...rest} render = {
            (props) => {
                switch (logged, props.location.pathname) {
                    case (logged === false && "/auth"):
                        return <Component props={props}/>;
                    case (logged === true && "/auth"):
                        return <Redirect to="/lk"/>;
                    case (logged === true && "/lk"):
                        return <Component props={props}/>;
                    default:
                        return <Redirect to="/auth"/>;
                }
            }
        }/>
    )
};

export default ProtectedRoute;