import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  createUserService,
  delUserService,
  editUserService,
} from "../../services";
import "./UserManage.scss";
import ModalAddUser from "./modalAddUser";
import ModelEditUser from "./modelEditUser";
import { emitter } from "../../utils";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalAdd: false,
      isOpenModalEdit: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    const response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    //console.log("response", response);
  };
  handleAdd() {
    this.setState({
      isOpenModalAdd: true,
    });
  }
  toggleModalAdd = () => {
    this.setState({
      isOpenModalAdd: !this.state.isOpenModalAdd,
    });
  };
  createUser = async (data) => {
    try {
      let response = await createUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsers();
        this.setState({
          isOpenModalAdd: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await delUserService(user.id);
      console.log(await delUserService(user.id), res);
      if (res && res.errCode === 0) {
        await this.getAllUsers();
      } else {
        alert(res.errMessage);
      }
      //console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  handleEdit = (user) => {
    // console.log("check edit", user);
    this.setState({
      isOpenModalEdit: true,
      userEdit: user,
    });
  };
  toggleModalEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEdit: false,
        });
        await this.getAllUsers();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    //console.log("check", this.state);
    const arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalAddUser
          isOpen={this.state.isOpenModalAdd}
          toggle={this.toggleModalAdd}
          createUser={this.createUser}
        />
        {this.state.isOpenModalEdit && (
          <ModelEditUser
            isOpen={this.state.isOpenModalEdit}
            toggle={this.toggleModalEdit}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
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
                        <button
                          className="btn-edit"
                          onClick={() => {
                            this.handleEdit(item);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
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
