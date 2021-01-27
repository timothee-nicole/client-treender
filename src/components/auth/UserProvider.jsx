import React, { Component } from "react";
import apiHandler from "../../api/apihandler";
import { UserContext } from "./UserContext";

// Wrapper component to allow access to the user's context in the entire application

class UserProvider extends Component {
  state = {
    user: null,
    currentBasket: null,
    newBasket: true,
    isLoggedIn: false,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({
          user: data,
          isLoggedIn: true,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        });
      });
  }

  // "sets" (creates/updates) the user's context
  setUser = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true,
    });
  };
  // "sets" (creates/updates) the user's basket within his context
  setBasket = (currentBasket) => {
    this.setState({ currentBasket: currentBasket });
  };

  // Logs out user; sets user's context to NULL by removing the user information from state
  removeUser = () => {
    this.setState({
      user: null,
      isLoggedIn: false,
    });
  };

  render() {
    const authValues = {
      user: this.state.user,
      currentBasket: this.state.currentBasket,
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
      setBasket: this.setBasket,
      setUser: this.setUser,
      removeUser: this.removeUser,
    };

    return (
      <UserContext.Provider value={authValues}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
