import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
