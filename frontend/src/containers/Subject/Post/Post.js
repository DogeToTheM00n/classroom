import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={classes.Post}>
      <div className={classes.Flex}>
        <p>{props.username}</p>
        <p>{props.date}</p>
      </div>
      <p>{props.body}</p>
      <div className={classes.Footer}>
        <div>
        {props.urls.map((url) => {
          return url.substr(url.length - 3) === "pdf" ? (
            <div className={classes.Icon} key={url}>
              <i className="far fa-file-pdf"></i>
            </div>
          ) : (
            <div className={classes.Icon} key={url}>
              <i className="far fa-images"></i>
            </div>
          );
        })}</div>
        {(props.type === "assignment" || props.type === "test") && (
          <button className={classes.Button2}>View</button>
        )}
      </div>
    </div>
  );
};

export default Post;
