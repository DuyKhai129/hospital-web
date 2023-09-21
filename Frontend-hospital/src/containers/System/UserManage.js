import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers } from "../../services";
import "./UserManage.scss";
import ModalUser from "./modalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
    };
  }

  async componentDidMount() {
    const response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    console.log("response", response);
  }

  handleAdd() {
    this.setState({
      isOpenModal: true,
    });
  }
  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  render() {
    //console.log("check", this.state);
    const arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser isOpen={this.state.isOpenModal} toggle={this.toggleModal} />
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button className="btn-add px-3" onClick={() => this.handleAdd()}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="user-table mt-3 mx-2">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="btn-delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
