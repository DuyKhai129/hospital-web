import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      isShowPass: false,
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "********",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggle();
  };
  handleShowHide = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };
  handleOnchange = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    const arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i in arrInput) {
      //   console.log("check", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSave = () => {
    //validate
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call API edit user
      this.props.editUser(this.state);
      console.log("data", this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className="user-container"
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit user
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Email
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(event) => this.handleOnchange(event, "email")}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="input-group mb-3 custom-password">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
              </div>
              <input
                type={this.state.isShowPass ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                onChange={(event) => this.handleOnchange(event, "password")}
                value={this.state.password}
                disabled
              />
              <span onClick={() => this.handleShowHide()}>
                <i
                  className={
                    this.state.isShowPass ? "far fa-eye" : "far fa-eye-slash"
                  }
                ></i>
              </span>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  First name
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                aria-label="First name"
                aria-describedby="basic-addon1"
                onChange={(event) => this.handleOnchange(event, "firstName")}
                value={this.state.firstName}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Last name
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                aria-label="Last name"
                aria-describedby="basic-addon1"
                onChange={(event) => this.handleOnchange(event, "lastName")}
                value={this.state.lastName}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Address
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                aria-label="Address"
                aria-describedby="basic-addon1"
                onChange={(event) => this.handleOnchange(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            className="px-3"
            onClick={() => {
              this.handleSave();
            }}
          >
            Save change
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
