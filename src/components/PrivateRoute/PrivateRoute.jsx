import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
// This is private route. you cannot go without login
const PrivateRoute = ({ children, ...rest }) => {
  const { mail, loading } = useSelector((state) => state.user);
  console.log(mail);
  if (loading) {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        mail ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
