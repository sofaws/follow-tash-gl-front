import React from "react";
// nodejs library that concatenates classes
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";

const styles = {
    boxNumbersStats: {
        margin: "20px"
    },
    titleNumberStats: {
        color: "#999999",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "0",
        marginBottom: "0"
    },
    cardTitle: {
        color: "#3C4858",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
};

function BoxNumber({ classes, title, description }) {
    return (
        <div className={classes.boxNumbersStats}>
            <h3 className={classes.cardTitle}>
                {title}
            </h3>
            <p className={classes.titleNumberStats}>
                {description}
            </p>
        </div>
    );
}

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default withStyles(styles)(BoxNumber);
