import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../components/auth/UserContext";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";

// Profile page to allow user to change certain lines of data in his/her account
// Instead of using the same form for CREATE and rendering it with user data in the componentDidMount(), we decided to
// a table on which each line could be rendered dynamically and the user information was more accessible to READ/EDIT.

export class Profile extends Component {
  static contextType = UserContext;

  state = {
    userValues: null,
    valuesToUpdate: {},
  };

  // componentDidMount() {
  //   console.log(this.state.userValues);
  //   this.setState({ userValues: this.props.context.user });
  // }

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

  render() {
    console.log("USER CONTEXT", this.context.user);
    console.log(this.state.userValues);
    return (
      <div>
        <h1>Profile Page</h1>
        <Table striped bordered hover size="sm">
          <tbody>
            {this.context.user !== null &&
              Object.keys(this.context.user).map((elem) =>
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
                      {this.state.valuesToUpdate[elem] ? (
                        <form>
                          <input
                            name={elem}
                            type="text"
                            // value={this.state.userValues[elem]}
                            onChange={this.handleChange}
                          />
                        </form>
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
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withUser(Profile);
