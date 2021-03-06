/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import LoadingOverlay from 'react-loading-overlay';

import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar.png";
import logo from "assets/img/reactlogo.png";
import {connect} from "react-redux";
import {startSync, stopSync} from "reducers/sync.reducer";
import {getStateSync, getSyncLoading} from "reducers/index.reducer";

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>;
        })}
    </Switch>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
        this.props.startSync();
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false});
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const {classes, syncState, syncLoading, ...rest} = this.props;
        return (
            <LoadingOverlay
                active={syncLoading}
                spinner
                text='Récupération des informations de BigBrother en cours..'
            >
                <div className={classes.wrapper}>
                    <Sidebar
                        startSync={startSync}
                        stopSync={stopSync}
                        sync={syncState}
                        routes={dashboardRoutes.filter(element => !element.notNavbar)}
                        logoText={"Big Brother"}
                        logo={logo}
                        image={image}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color="blue"
                        {...rest}
                    />
                    <div className={classes.mainPanel} ref="mainPanel">
                        <Header
                            routes={dashboardRoutes}
                            handleDrawerToggle={this.handleDrawerToggle}
                            {...rest}
                        />
                        <div className={classes.content}>
                            <div className={classes.container}>{switchRoutes}</div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        syncState: getStateSync(state),
        syncLoading: getSyncLoading(state),
    };
}

export default connect(
    mapStateToProps,
    {
        startSync,
        stopSync,
    }
)(withStyles(dashboardStyle)(App));

