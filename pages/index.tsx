import React from "react";
import { useState, useContext } from "react";
import Axios from "axios";
import Modal from "react-modal";
import Spinner from "../components/Spinner";
import CSS from "csstype";
import Layout from "../components/layouts";
// /import { UserContext } from "../UserContext";
//import { login } from "../../utils/login";

interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  paymentId: [string];
  balance: number;
  transactions: [Object];
}

const Home = () => {
  const [paymentId, setPaymentId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setisLoading] = useState(false);

  // const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  let handleSubmit = (e: any) => {
    setisLoading(true);
    e.preventDefault();
    //console.log(paymentId);
    Axios({
      method: "GET",
      url: `https://skyewalletapi.herokuapp.com/users/findByPaymentId/${paymentId}`,
      // data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        // handle success
        setUserData(response.data);
        console.log(response);
        setisLoading(false);
        setIsOpen(true);
      })
      .catch(function (error) {
        // handle error
        setisLoading(false);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const modalStyles: CSS.Properties = {
    color: "blue",
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre>
      {user ? (
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          logout
        </button>
      ) : (
        <button
          onClick={async () => {
            const user = await login();
            setUser(user);
          }}
        >
          login
        </button>
      )} */}
      <div className="relative">
        <div className="h-screen flex justify-center items-center bg-background">
          <form onSubmit={handleSubmit}>
            {/* <h1>{msg}</h1> */}
            <input
              className="w-thirteenth h-12 px-3 rounded-sm"
              type="text"
              required
              value={paymentId}
              placeholder="Search Account holder by Payment ID"
              onChange={(e) => setPaymentId(e.target.value)}
            />
            <button
              className=" rounded-md font-semibold text-white text-sm h-12 bg-searchbtn px-12"
              type="submit"
            >
              Search
            </button>
          </form>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            // style={{ color: "blue" }}
          >
            <div
              className="flex flex-col justify-center items-center"
              style={{ color: "blue" }}
            >
              <div className="grid grid-cols-2 mb-4">
                <div className="grid grid-cols-1 gap-3">
                  <h1>Name</h1>
                  <h1>Email</h1>
                  <h1>Phone</h1>
                </div>
                {userData && (
                  <div className="grid grid-cols-1 gap-3">
                    <h1>{userData.name}</h1>
                    <h1>{userData.email}</h1>
                    <h1>{userData.phone}</h1>
                  </div>
                )}
              </div>
              <button
                onClick={closeModal}
                className="select-none font-bold whitespace-no-wrap py-2 px-20 rounded-lg text-base leading-normal no-underline text-white bg-primary hover:bg-blue-700 sm:py-2"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
        {isLoading && (
          <div className="absolute top-0 left-spinner">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: React.FC) {
  return <Layout>{page}</Layout>;
};

export default Home;
