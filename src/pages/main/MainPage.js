import React from "react";
import Layout from "./Layout";
import EventListContainer from "../../components/Events/EventListContainer";

function MainPage() {
  return (
    <Layout>
      <EventListContainer />
    </Layout>
  );
}

export default MainPage;
