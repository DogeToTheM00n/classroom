import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./Profile.module.css";
import ResetModal from "./ResetModal/ResetModal.js";

class Profile extends Component {
  state = {
    show: false,
  };
  showResetModal = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
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
              {!this.props.user.role ? <p>Teacher</p> : <p>Student</p>}
            </div>
            <button className={classes.Button} onClick={this.showResetModal}>
              Reset password
            </button>
          </div>
        )}
        <ResetModal show={this.state.show} handleClose={this.handleClose} />
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
