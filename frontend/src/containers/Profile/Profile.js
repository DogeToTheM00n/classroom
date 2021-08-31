import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./Profile.module.css";

class Profile extends Component {
  render() {
    return (
      <>
        {!this.props.auth && <Redirect to="/" />}
        {this.props.auth && (
          <div className={classes.Parent}>
            <i className="fas fa-user-circle"></i>
            <div className={classes.Child}>
              <p>Username</p>
              <p>{this.props.user.username}</p>
            </div>
            <div className={classes.Child}>
              <p>Email</p>
              <p>{this.props.user.email}</p>
            </div>
            <div className={classes.Child}>
              <p>Role</p>
              {this.props.user.role ? <p>Teacher</p> : <p>Student</p>}
            </div>
            <button className={classes.Button}>Submit</button>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
