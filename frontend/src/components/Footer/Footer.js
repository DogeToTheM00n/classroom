import React from "react";
import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <p className={classes.P}>
        Inspired by <i className="fab fa-google" style={{"fontWeight": "bold", "fontSize": "x-large", "marginLeft": "5px"}}></i>
    </p>
  );
};

export default Footer;
