import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../../axiosClass.js";
import { connect } from "react-redux";
import classes from "./Auth.module.css";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: 0, // 0 - teacher, 1 - student
    authFlag: 0, // 0 - SignIn, 1 - SignUp
    req: true,
    emailVal: false,
    userErr: false,
    emailErr: false,
    loginErr: false,
  };
  changeAuthFlag = () => {
    this.setState((prevState) => {
      return { authFlag: prevState.authFlag === 0 ? 1 : 0 };
    });
  };
  change = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (event.target.name === "email") {
        const pattern =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const checkPattern = pattern.test(event.target.value);
        this.setState({
          emailVal: checkPattern,
        });
      }
      if (this.state.authFlag === 0) {
        if (
          this.state.username.length === 0 ||
          this.state.password.length === 0
        ) {
          this.setState({ req: true });
        } else {
          this.setState({ req: false });
        }
      } else {
        if (
          this.state.username.length === 0 ||
          this.state.password.length === 0 ||
          this.state.email.length === 0
        ) {
          this.setState({ req: true });
        } else {
          this.setState({ req: false });
        }
      }
    });
  };
  submit = (event) => {
    event.preventDefault();
    if (this.state.authFlag === 0) {
      this.setState({ loginErr: false });
      if (!this.state.req) {
        const userData = {
          username: this.state.username,
          password: this.state.password,
        };
        axios
          .post("/api/login", userData)
          .then((res) => {
            if (res.status === 200) {
              const user = {
                username: res.data.username,
                email: res.data.email,
                role: res.data.role,
              };
              this.props.setAuthTrue(user);
              localStorage.setItem("user", JSON.stringify(user));
              this.props.history.push("/");
            } else {
              this.setState({ loginErr: true });
            }
          })
          .catch((err) => {
            this.setState({ loginErr: true });
          });
      }
    } else {
      if (!this.state.req && this.state.emailVal) {
        this.setState({ emailErr: false, userErr: false });
        const userData = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
        };
        axios.post("/api/signup", userData).then((res) => {
          if (res.status === 200) {
            if (res.data.username !== true && res.data.email !== true) {
              // Save user to local storage
              const user = {
                username: res.data.username,
                email: res.data.email,
                role: res.data.role,
              };
              this.props.setAuthTrue(user);
              localStorage.setItem("user", JSON.stringify(user));
              this.props.history.push("/");
            } else {
              if (res.data.username === true) {
                this.setState({ userErr: true });
              }
              if (res.data.email === true) {
                this.setState({ emailErr: true });
              }
            }
          }
        });
      }
    }
  };
  render() {
    return (
      <Container className={classes.Container}>
        <h1 className={classes.H1}>CLASSROOM</h1>
        <Row className="mt-3">
          <Col className="col-5">
            {this.state.req && (
              <p className={classes.Error}>*All fields are required.</p>
            )}
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
                {this.state.userErr && (
                  <p className={classes.Error}>*Username already exists</p>
                )}
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
                {this.state.emailErr && (
                  <p className={classes.Error}>*Email already exists</p>
                )}
                {!this.state.emailVal && (
                  <p className={classes.Error}>*Please enter a valid email</p>
                )}
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
              <>
                {this.state.loginErr && (
                  <p className={classes.Error}>*Invalid credentials</p>
                )}
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
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={this.changeAuthFlag}
                  >
                    New User?
                  </p>
                  <p style={{ cursor: "pointer" }}>Forgot Password?</p>
                </Form>
              </>
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

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthTrue: (user) => dispatch({ type: "True_Auth", user: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
