import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/auth/UserContext";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
import EditPasswordForm from "../components/auth/EditPasswordForm";

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

  // componentDidMount() {
  //   console.log(this.state.userValues);
  //   this.setState({ userValues: this.props.context.user });
  // }
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

  transformText = (str) => {
    let strArr = str.split("");
    let ixArr = null;
    strArr.forEach((elem, i) => {
      if (elem.toUpperCase() === elem) {
        return (ixArr = i);
      } else return elem;
    });
    if (ixArr) {
      strArr.splice(ixArr, 0, " ");
    }
    strArr[0] = strArr[0].toUpperCase();
    let newStr = strArr.join("");
    return newStr;
  };
  transformPhoneNumber = (str) => {
    let phoneArr = str.split("");
    let newArr = phoneArr.map((elem, i) => {
      if (i !== 0 && i % 2 === 0) {
        return (elem = "." + elem);
      } else return elem;
    });
    return newArr;
  };

  transformDate = (date) => {
    return date.toString().substring(0, 10);
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
                      <td>{this.transformText(elem)}</td>
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
                          this.transformPhoneNumber(this.state.userValues[elem])
                        ) : elem === "birthDate" ? (
                          this.transformDate(this.state.userValues[elem])
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
                      <td>{this.transformText(elem)}</td>
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
        <div
          style={{
            color: "white",
            backgroundColor: "red",
            fontWeight: "600",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "fit-content",
            display: "flex",
            textAlign: "center",
          }}
          onClick={this.handleChangePassword}
        >
          Edit Password
        </div>
      </div>
    );
  }
}

export default withUser(Profile);
