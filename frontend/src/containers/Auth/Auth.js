import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Auth.module.css";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: 0, // 0 - teacher, 1 - student
    authFlag: 0, // 0 - SignIn, 1 - SignUp
  };
  changeAuthFlag = () => {
    this.setState((prevState) => {
      return { authFlag: prevState.authFlag === 0 ? 1 : 0 };
    });
  };
  change = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = () => {
    if (this.state.authFlag === 0) {
      // Call for signin
    } else {
      // Call for signup
    }
  };
  render() {
    return (
      <Container className={classes.Container}>
        <h1 className={classes.H1}>CLASSROOM</h1>
        <Row className="mt-3">
          <Col className="col-5">
            {this.state.authFlag === 1 ? (
              <Form className={classes.Font}>
                <Form.Group className="mb-3" controlId="Username">
                  <Form.Label className={classes.Label}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    onChange={this.change}
                    value={this.state.username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Email">
                  <Form.Label className={classes.Label}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={this.change}
                    name="email"
                    value={this.state.email}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                  <Form.Label className={classes.Label}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="•••••"
                    onChange={this.change}
                    name="password"
                    value={this.state.password}
                  />
                </Form.Group>
                <p className={classes.P}>Select your role:</p>
                <Form.Select
                  onChange={this.change}
                  name="role"
                  value={this.state.role}
                >
                  <option value="0">Teacher</option>
                  <option value="1">Student</option>
                </Form.Select>
                <button
                  type="submit"
                  className={classes.Button}
                  onClick={this.submit}
                >
                  Submit <i className="fas fa-arrow-circle-right"></i>
                </button>
                <p style={{ cursor: "pointer" }} onClick={this.changeAuthFlag}>
                  Existing User?
                </p>
              </Form>
            ) : (
              <Form className={classes.Font}>
                <Form.Group className="mb-3" controlId="Username">
                  <Form.Label className={classes.Label}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={this.change}
                    name="username"
                    value={this.state.username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Password">
                  <Form.Label className={classes.Label}>Password</Form.Label>
                  <Form.Control
                    onChange={this.change}
                    name="password"
                    value={this.state.password}
                    type="password"
                    placeholder="•••••"
                  />
                </Form.Group>
                <button
                  type="submit"
                  className={classes.Button}
                  onClick={this.submit}
                >
                  Submit <i className="fas fa-arrow-circle-right"></i>
                </button>
                <p style={{ cursor: "pointer" }} onClick={this.changeAuthFlag}>
                  New User?
                </p>
                <p style={{ cursor: "pointer" }}>Forgot Password?</p>
              </Form>
            )}
          </Col>
          <Col>
            <div className={classes.Vr} />
          </Col>
          <Col className="mt-5">
            <div className={classes.googleBtn}>
              <div className={classes.googleIconWrapper}>
                <img
                  alt="google-icon"
                  className={classes.googleIconSvg}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <div className={classes.btnText}>Continue with Google</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;
