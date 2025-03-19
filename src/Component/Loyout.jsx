import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the page content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
