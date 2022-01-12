import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
//import { UserContext } from "../UserContext";
//import { useNavigate } from "react-router-dom";

function NavBar() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authenticationStatus, setAuthenticationStatus] = useState(false);
  // const { user, setUser } = useContext(UserContext);
  // const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    // navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    Axios.get("https://skyewalletapi.herokuapp.com/getauthenticateduserdata", {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        setUserAuthenticated(true);
        setUserData(response.data);
        setAuthenticationStatus(true);
        console.log(userData);
      })
      .catch(function (error) {
        // handle error
        //        console.log("hello");
        console.log(error);
        setUserAuthenticated(false);
        setAuthenticationStatus(true);
        //        setErrorMessage(error.response.data.message);
      });
  }, []);
  return (
    <div className="flex pt-6 pb-4 md:px-28 bg-background">
      <a className="mr-auto" href="/">
        <img src="https://skyewallet.com/img/skye-logo-white.svg" alt="" />
      </a>
      <ul className="flex text-white">
        {!userAuthenticated && authenticationStatus && (
          <li className="mr-8">
            <a href="/login"> Login</a>
          </li>
        )}
        {!userAuthenticated && authenticationStatus && (
          <li className="mr-8">
            <a href="/register">SignUp</a>
          </li>
        )}
        {userAuthenticated && authenticationStatus && (
          <li className="mr-8">
            <a href="/dashboard">Dashboard</a>
          </li>
        )}
        {userAuthenticated && authenticationStatus && (
          <li className="mr-8">
            <a href="/transaction">Make Transaction</a>
          </li>
        )}
        {userAuthenticated && authenticationStatus && (
          <li className="cursor-pointer" onClick={logout}>
            Log out
          </li>
        )}

        {/* <li className="mr-8">
          <a href="#">
            {" "}
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </a>
        </li> */}
      </ul>
    </div>
  );
}

export default NavBar;
