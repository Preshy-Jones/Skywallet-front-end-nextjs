import React from "react";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import TransactionHistory from "../components/TransactionHistory";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";

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

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const printRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element!);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };

  const generatePaymentId = (userId: string) => {
    Axios.put(
      `https://skyewalletapi.herokuapp.com/users/${userId}/generate`
      // {
      //   headers: {
      //     Authorization: "Bearer" + " " + localStorage.getItem("token"),
      //   },
      // }
    )
      .then((response) => {
        console.log(response);
        router.push("/dashboard");
        setUserData(response.data);
        console.log(userData);
        setErrorMessage("");
      })
      .catch(function (error) {
        // handle error
        console.log("hello");
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };
  const deletePaymentId = (paymentId: string, userId: string) => {
    Axios.put(
      `https://skyewalletapi.herokuapp.com/users/${userId}/${paymentId}/delete`
      // {
      //   headers: {
      //     Authorization: "Bearer" + " " + localStorage.getItem("token"),
      //   },
      // }
    )
      .then((response) => {
        console.log(response);
        router.push("/dashboard");
        setUserData(response.data);
        console.log(userData);
        setErrorMessage("");
      })
      .catch(function (error) {
        // handle error
        console.log("hello");
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };
  useEffect(() => {
    Axios.get("https://skyewalletapi.herokuapp.com/getauthenticateduserdata", {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      setUserData(response.data);
      console.log(userData);
    });
  }, []);

  return (
    <div className="h-screen ">
      {userData && (
        <div className="flex flex-col text-white items-center justify-center bg-background mb-6">
          <h1 className="text-center text-white mb-20">Dashboard</h1>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-1 gap-3">
              <h1>Name</h1>
              <h1>Email</h1>
              <h1>Phone</h1>
              <h1>Balance</h1>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <h1>{userData.name}</h1>
              <h1>{userData.email}</h1>
              <h1>{userData.phone}</h1>
              <h1>{userData.balance}</h1>
            </div>
          </div>
          <div>
            <h1>Payment Ids:</h1>
            <button
              onClick={() => generatePaymentId(userData._id!)}
              className="bg-green-700 rounded-md p-1.5 mb-4"
            >
              Generate Payment Id
            </button>
            <div className="flex flex-col items-center justify-center">
              {userData.paymentId.map((paymentId, index) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <h1 className="mr-3">{paymentId}</h1>
                    <button
                      onClick={() => deletePaymentId(paymentId, userData._id!)}
                      className="bg-red-700 rounded-sm p-1"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
            {errorMessage && <h1 className=" text-red-500">{errorMessage}</h1>}
          </div>
          <a href="/transaction" className="text-green-500 text-lg my-2">
            Make transaction
          </a>
          <button
            className="text-center bg-green-700 mb-2 text-white rounded-lg px-6 py-2 mt-6 cursor-pointer"
            type="button"
            onClick={handleDownloadPdf}
          >
            Retrieve transaction history
          </button>
        </div>
      )}
      {userData && <TransactionHistory ref={printRef} userData={userData} />}
    </div>
  );
};

export default Dashboard;
