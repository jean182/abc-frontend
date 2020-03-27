import React from "react";
import Layout from "./Layout";
import ReduxEventListContainer from "../../components/Events/EventListContainer";

function MainPage() {
  return (
    <Layout>
      <ReduxEventListContainer />
    </Layout>
  );
}

export default MainPage;
