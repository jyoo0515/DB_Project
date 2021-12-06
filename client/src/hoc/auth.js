import React, { useEffect } from "react";
import apiClient from "../components/utils/axios";

export default function (SpecificComponent, loginRequired) {
  function AuthenticationCheck(props) {
    let user;
    let isAuth = false;

    useEffect(() => {
      apiClient
        .get("/users/me")
        .then((response) => {
          user = response.data;
          isAuth = true;
        })
        .catch((err) => {
          user = undefined;
          isAuth = false;
        });

      if (!isAuth) {
        if (loginRequired) {
          props.history.push("/login");
        }
      } else {
        if (loginRequired == null) {
          props.history.push("/friends");
        }
      }
    }, []);

    return (
      // <SpecificComponent {...props} user={user} />
      <SpecificComponent {...props} />
    );
  }
  return AuthenticationCheck;
}
