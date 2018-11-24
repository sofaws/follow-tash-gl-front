import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import * as serviceWorker from './serviceWorker';
import AppComp from './Components/App';
import { muiTheme } from "./Stylesheets/themeConfiguration";

ReactDOM.render(
    <HashRouter>
        <MuiThemeProvider theme={muiTheme}>
                <AppComp/>
        </MuiThemeProvider>
    </HashRouter>
    , document.getElementById('app'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
