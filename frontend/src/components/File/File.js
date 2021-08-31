import React from "react";
import mime from "mime-types";
import classes from "./File.module.css";

const File = (props) => {
  return (
    <a
      href={props.viewLink}
      style={{ textDecoration: "none", color: "#064420" }}
    >
      <div className={classes.Flex}>
        <div className={classes.Child1}>
          {props.thumbnailLink ? (
            <img
              src={props.thumbnailLink}
              alt="Thumbnail"
              style={{ width: "4.2vw" }}
            />
          ) : (
            <i style={{"fontSize": "2.5vw"}} className="fas fa-file"></i>
          )}
        </div>
        <div className={classes.Child2}>
          {props.name}
          <p>{mime.extension(props.mimeType).toUpperCase()}</p>
        </div>
      </div>
    </a>
  );
};

export default File;
