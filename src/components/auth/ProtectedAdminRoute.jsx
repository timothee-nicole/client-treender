import React from "react";
import { Redirect, Route } from "react-router-dom";
import withUser from "./withUser.jsx";

//Component to make certain routes available only to a website Admin account

const ProtectedAdminRoute = ({ component: Component, context, ...rest }) => {
  console.log(context);
  if (context.isLoading) {
    return null;
  } else if (context.user.isAdmin) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default withUser(ProtectedAdminRoute);
