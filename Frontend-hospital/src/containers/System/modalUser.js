import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      isShowPass: false,
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggle();
  };
  handleShowHide = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };
  handleOnchange = (event, id) => {
    /** 
    * TODO bad code
    this.state[id] = event.target.value;
    this.setState(
      {
        ...this.state,
      },
      () => {
        console.log("bad code check state", this.state);
      }
    );
    */

    //good code
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
      console.log("check", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNew = () => {
    //validate
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call API create user
      this.props.createUser(this.state);
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
          Create user
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
              this.handleAddNew();
            }}
          >
            Add new
          </Button>{" "}
          {/* <Button color="secondary" onClick={{this.toggle()}}>
            Cancel
          </Button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
