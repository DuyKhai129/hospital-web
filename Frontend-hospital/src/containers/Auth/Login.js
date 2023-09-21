import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { Button } from "reactstrap";
import { handleLoginAPI } from "../../services"; // sử dụng một hàm

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPass: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    // console.log(event.target.value);
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    // console.log(event.target.value);
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }

      console.log(error);
    }
  };

  handleShowHide = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };

  render() {
    return (
      //jsx
      <div className="log-bg">
        <div className="log-container">
          <div className="log-content row ">
            <div className="col-12 log-text">Login</div>
            <div className="col-12 form-group log-input">
              <label className="lb-text">Username:</label>
              <input
                type="text"
                className="form-control text-input"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group log-input">
              <label className="lb-text">Password:</label>
              <div className="custom-password">
                <input
                  type={this.state.isShowPass ? "text" : "password"}
                  className="form-control text-input"
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span onClick={() => this.handleShowHide()}>
                  <i
                    className={
                      this.state.isShowPass ? "far fa-eye" : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 mt-2 mb-2" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 mt-2">
              <Button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </Button>
            </div>
            <div className="col-12 pt-2">
              <span className="fg-pass">Forgot your password</span>
            </div>
            <div className="col-12 text-center">
              <span className="log-other-text mt-3">Or login with:</span>
            </div>
            <div className="col-12 log-social">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
