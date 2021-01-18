import React, { Component } from "react";
import apiHandler from "../../api/apihandler";
import { UserContext } from "./UserContext";

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

  setUser = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true,
    });
  };

  setBasket = (currentBasket) => {
    this.setState({ currentBasket: currentBasket });
  };

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
