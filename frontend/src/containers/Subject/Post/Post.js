import React from "react";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const date = new Date(props.date);
  const deadline = new Date(props.deadline);
  return (
    <div className={classes.Post}>
      <div className={classes.Flex}>
        <div>
        {(props.type === true || props.type === false) && (
          <p style={{fontSize:"2.5vh", fontWeight:"bold"}}>{props.title}</p>
        )}
          <p>{props.username}</p>
          <p>{date.toLocaleString()}</p>
        </div>
        {(props.type === true || props.type === false) && (
          <div>Due date: {deadline.toLocaleString()}</div>
        )}
      </div>
      <p>{props.body}</p>
      <div className={classes.Footer}>
        <div>
          {props.urls.map((file) => {
            return file.name.substr(file.name.length - 3) === "pdf" ? (
              <div className={classes.Icon} key={file.name}>
                <i className="far fa-file-pdf"></i>
              </div>
            ) : (
              <div className={classes.Icon} key={file.name}>
                <i className="far fa-images"></i>
              </div>
            );
          })}
        </div>
        {(props.type === true || props.type === false) && (
          <Link
            to={`/assignment?id=${props.id}&sub=${props.subId}`}
            className={classes.Button2}
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default Post;
