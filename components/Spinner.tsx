import React from "react";
import spinner from "../spinner.gif";
import Image from "next/image";

const Spinner = () => {
  return (
    <Image src="/spinner.gif" alt="spinner" width={200} height={200} />
    // <img
    //   src={spinner}
    //   style={{ width: "200px", margin: "auto", display: "block" }}
    //   alt="Loading"
    // />
  );
};

export default Spinner;
