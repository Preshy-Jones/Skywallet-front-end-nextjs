import React from "react";
import Navbar from "./NavBar";

const layouts: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default layouts;
