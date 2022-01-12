import React from "react";
import { useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import { useRouter } from "next/router";

import {
  BaseModal,
  BottomModal,
  CenterModal,
  ModalTitle,
  ModalCloseTarget,
} from "react-spring-modal";
import Spinner from "../components/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  Axios.defaults.withCredentials = true;

  const login = (e: any) => {
    e.preventDefault();
    setisLoading(true);
    console.log(
      JSON.stringify({
        email: email,
        password: password,
      })
    );
    Axios({
      method: "POST",
      url: "https://skyewalletapi.herokuapp.com/auth/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          console.log(response.data);
          localStorage.setItem("token", response.data.access_token);
          setLoginStatus(true);
          setisLoading(false);
          setOpen(true);
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const checkIfUserAuthenticated = (e: any) => {
    Axios.get("https://skyewalletapi.herokuapp.com/getauthenticateduserdata", {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  function closeModal() {
    setIsOpen(false);

    //    navigate("/dashboard");
    window.location.reload();
  }

  function redirectToDashboard() {
    router.push("/dashboard");
    //    navigate("/dashboard");
    //    window.location.reload();
  }
  return (
    <div className="bg-background">
      <h1 className="text-center">Login</h1>
      {/* {isLoading && (
        <h1 className="text-green-400 text-lg text-center">Loading....</h1>
      )} */}
      <div className="relative">
        <div className="flex justify-center">
          <form
            onSubmit={login}
            className=" w-4/12 flex flex-col px-6 space-y-6 sm:px-10 sm:space-y-8"
          >
            <div className="flex flex-wrap">
              <label className="block text-white text-sm  mb-2 sm:mb-4">
                E-Mail Address
              </label>
              <input
                id="email"
                type="email"
                className="form-input w-full rounded-md border border-fourth h-12  "
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap">
              <label className="block text-white text-sm  mb-2 sm:mb-4">
                Password
              </label>
              <input
                type="password"
                className="form-input w-full rounded-md border border-fourth  h-12 "
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center">
              <button
                type="submit"
                className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
              >
                Login
              </button>
              <p className="w-full text-xs text-center text-primary my-6 sm:text-sm sm:my-8">
                Haven't signed up yet?
                <a
                  className="text-primary hover:text-blue-700 no-underline hover:underline"
                  href="{{ route('admin.login') }}"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
        {isLoading && (
          <div className="absolute top-0 left-spinner">
            <Spinner />
          </div>
        )}
        <div className="flex justify-center">
          <BottomModal
            isOpen={isOpen}
            onDismiss={() => setOpen(false)}
            contentTransition={{
              from: {
                background: "lightcoral",
                transform: "translateY(-100%)",
              },
              enter: { background: "lightcyan", transform: "translateY(0)" },
              leave: {
                background: "lightcoral",
                transform: "translateY(-100%)",
              },
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center mb-16">Logged in Successfully</h1>
              <ModalCloseTarget>
                <button
                  onClick={redirectToDashboard}
                  className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-secondary hover:bg-green-700 sm:py-2"
                >
                  Go to dashboard
                </button>
              </ModalCloseTarget>
            </div>
          </BottomModal>
          {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center mb-16">Logged in Successfully</h1>
            <button
              onClick={closeModal}
              className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
            >
              Go to dashboard
            </button>
          </div>
        </Modal> */}
        </div>
      </div>
      {/* <button onClick={openModal}>Open Modal</button> */}

      {/* {loginStatus && (
        <button
          onClick={checkIfUserAuthenticated}
          className="select-none text-center font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
        >
          Check
        </button>
      )} */}
    </div>
  );
}

export default Login;
