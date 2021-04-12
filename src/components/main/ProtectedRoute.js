import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
  isAuth: isAuth,
  component: Component,
  redirectionPage,
  ...rest
}) {
  return (
    <>
      {console.log("loggedIN", isAuth)}
      <Route
        {...rest}
        render={(props) => {
          if (isAuth) {
            return <Component />;
          } else {
            return <Redirect to={{ pathname: redirectionPage }} />;
          }
        }}
      />
    </>
  );
}

export default ProtectedRoute;
