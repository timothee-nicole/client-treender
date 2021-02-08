import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/auth/UserContext";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
import EditPasswordForm from "../components/auth/EditPasswordForm";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import transformDate from "../javascript/transformDate";
import transformPhoneNumber from "../javascript/transformPhoneNumber";
import transformText from "../javascript/transformText";
import { Confirm } from "semantic-ui-react";

// Profile page to allow user to change certain lines of data in his/her account
// Instead of using the same form for CREATE and rendering it with user data in the componentDidMount(), we decided to
// a table on which each line could be rendered dynamically and the user information was more accessible to READ/EDIT.

export class Profile extends Component {
  static contextType = UserContext;

  state = {
    userValues: null,
    valuesToUpdate: {
      address: {},
    },
    changePassword: false,
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleChangePassword = () => {
    this.setState({
      changePassword: !this.state.changePassword,
    });
  };

  componentDidUpdate() {
    if (this.context.user && !this.state.userValues) {
      this.setState({ userValues: this.context.user });
    }
  }

  handleChange = (e) => {
    let newuserValues = { ...this.state.userValues };
    newuserValues[e.target.name] = e.target.value;
    this.setState({ userValues: newuserValues });
  };

  // FUNCTION to edit lines of user value
  handleEdit = (elem) => {
    let updatedValues = { ...this.state.valuesToUpdate };
    !updatedValues[elem]
      ? (updatedValues[elem] = true)
      : (updatedValues[elem] = false);
    this.setState({ valuesToUpdate: updatedValues });
  };

  handleAddressChange = (e) => {
    let newuserValues = { ...this.state.userValues };
    newuserValues.address[e.target.name] = e.target.value;
    this.setState({ userValues: newuserValues });
  };

  handleAddressEdit = (elem) => {
    let updatedValues = { ...this.state.valuesToUpdate };
    !updatedValues.address[elem]
      ? (updatedValues.address[elem] = true)
      : (updatedValues.address[elem] = false);
    this.setState({ valuesToUpdate: updatedValues });
  };

  handleAddressConfirm = (elem) => {
    let updatedValues = { ...this.state.valuesToUpdate };
    !updatedValues.address[elem]
      ? (updatedValues.address[elem] = true)
      : (updatedValues.address[elem] = false);
    this.setState({ valuesToUpdate: updatedValues });
    this.context.setUser(this.state.userValues);
    apihandler
      .editUser(this.state.userValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // FUNCTION to confirm and update lines of user value
  handleConfirm = (elem) => {
    let updatedValues = { ...this.state.valuesToUpdate };
    !updatedValues[elem]
      ? (updatedValues[elem] = true)
      : (updatedValues[elem] = false);
    this.setState({ valuesToUpdate: updatedValues });
    this.context.setUser(this.state.userValues);
    apihandler
      .editUser(this.state.userValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // FUNCTION to delete user's account from DB and context
  handleDelete = (e) => {
    e.preventDefault();
    apihandler
      .deleteUser()
      .then(() => {
        this.context.removeUser();
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Profile Page</h1>
        {this.state.changePassword ? (
          <EditPasswordForm passwordStatus={this.handleChangePassword} />
        ) : (
          <Table striped bordered hover size="sm">
            <tbody>
              {this.state.userValues !== null &&
                Object.keys(this.state.userValues).map((elem, i) =>
                  // If elem is equal to this, then don't display this on our profile edit page.
                  elem === "isAdmin" ||
                  elem === "agree" ||
                  elem === "_id" ||
                  elem === "profilePicture" ||
                  elem === "__v" ||
                  elem === "address" ||
                  elem === "allOrders" ||
                  elem === "isNL" ? (
                    ""
                  ) : (
                    <tr key={i}>
                      <td>{transformText(elem)}</td>
                      <td>
                        {this.state.valuesToUpdate[elem] ? (
                          <form>
                            <input
                              name={elem}
                              type="text"
                              value={this.state.userValues[elem]}
                              onChange={this.handleChange}
                            />
                          </form>
                        ) : elem === "phoneNumber" ? (
                          transformPhoneNumber(this.state.userValues[elem])
                        ) : elem === "birthDate" ? (
                          transformDate(this.state.userValues[elem])
                        ) : (
                          this.state.userValues[elem]
                        )}
                      </td>
                      {this.state.valuesToUpdate[elem] ? (
                        <td onClick={() => this.handleConfirm(elem)}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </td>
                      ) : (
                        <td onClick={() => this.handleEdit(elem)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </td>
                      )}
                    </tr>
                  )
                )}
              {this.state.userValues !== null &&
                Object.keys(this.state.userValues.address).map((elem, i) => {
                  return (
                    <tr key={i}>
                      <td>{transformText(elem)}</td>
                      <td>
                        {this.state.valuesToUpdate.address[elem] ? (
                          <form>
                            <input
                              name={elem}
                              type="text"
                              value={this.state.userValues.address[elem]}
                              onChange={this.handleAddressChange}
                            />
                          </form>
                        ) : (
                          this.state.userValues.address[elem]
                        )}
                      </td>
                      {this.state.valuesToUpdate.address[elem] ? (
                        <td onClick={() => this.handleAddressConfirm(elem)}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </td>
                      ) : (
                        <td onClick={() => this.handleAddressEdit(elem)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
        <div>
          <Button
            variant="contained"
            color="default"
            onClick={this.handleChangePassword}
          >
            {!this.state.changePassword ? "Edit Password" : "Go Back"}
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={this.open}
          >
            Delete Account
          </Button>
          <Confirm
            open={this.state.open}
            onCancel={this.close}
            onConfirm={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(Profile));
