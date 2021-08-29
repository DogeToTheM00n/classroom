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
      })}
      {(props.type === "assignment" || props.type === "test") && (
        <button>View</button>
      )}
    </div>
  );
};

export default Post;
