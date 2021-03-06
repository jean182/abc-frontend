import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import EventSidebarContent from "./EventSidebarContent";

function Layout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row flex-xl-nowrap">
        <Sidebar>
          <EventSidebarContent />
        </Sidebar>
        <main className="col-12 col-md-10 col-xl-10 px-md-5 bd-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
