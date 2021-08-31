import React from "react";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";
import File from "../../../components/File/File.js";

const Post = (props) => {
  const date = new Date(props.date);
  const deadline = new Date(props.deadline);
  return (
    <div className={classes.Post}>
      <div className={classes.Flex}>
        <div>
          {(props.type === true || props.type === false) && (
            <p style={{ fontSize: "2.5vh", fontWeight: "bold" }}>
              {props.title}
            </p>
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
        <div className={classes.Files}>
          {props.urls.map((file) => {
            return (
              <File
                key={file.id}
                viewLink={file.viewLink}
                thumbnailLink={file.thumbnailLink}
                name={file.name}
                mimeType={file.mimeType}
              />
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
