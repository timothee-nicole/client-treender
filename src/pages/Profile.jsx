import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/auth/UserContext";
import apihandler from "../api/apihandler";

// Profile page to allow user to change certain lines of data in his/her account
// Instead of using the same form for CREATE and rendering it with user data in the componentDidMount(), we decided to
// a table on which each line could be rendered dynamically and the user information was more accessible to READ/EDIT.

export class Profile extends Component {
  static contextType = UserContext;
  state = {
    updatedValues: {},
    isUpdating: {},
  };

  componentDidMount() {
    this.setState({ updatedValues: this.context.user });
  }

  handleChange = (e) => {
    let newUpdatedValues = { ...this.state.updatedValues };
    newUpdatedValues[e.target.name] = e.target.value;
    this.setState({ updatedValues: newUpdatedValues });
  };

  // FUNCTION
  handleEdit = (elem) => {
    let isNewUpdating = { ...this.state.isUpdating };
    !isNewUpdating[elem]
      ? (isNewUpdating[elem] = true)
      : (isNewUpdating[elem] = false);
    this.setState({ isUpdating: isNewUpdating });
  };

  handleConfirm = (elem) => {
    let isNewUpdating = { ...this.state.isUpdating };
    !isNewUpdating[elem]
      ? (isNewUpdating[elem] = true)
      : (isNewUpdating[elem] = false);
    this.setState({ isUpdating: isNewUpdating });
    this.context.setUser(this.state.updatedValues);
    apihandler
      .editUser(this.state.updatedValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <Table striped bordered hover size="sm">
          <tbody>
            {Object.keys(this.context.user).map((elem) =>
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
                <tr>
                  <td>{elem}</td>
                  <td>
                    {this.state.isUpdating[elem] ? (
                      <form>
                        <input
                          name={elem}
                          type="text"
                          value={this.state.updatedValues[elem]}
                          onChange={this.handleChange}
                        />
                      </form>
                    ) : (
                      `${this.state.updatedValues[elem]}`
                    )}
                  </td>
                  {this.state.isUpdating[elem] ? (
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
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Profile;
