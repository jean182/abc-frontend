import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axiosConfig from "../../api/config";

function MainPage() {
  const [data, setData] = useState({ hits: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axiosConfig("users/current");
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isError) return <div>Something went wrong ...</div>;

  return (
    <Layout>
      <h1>ABC Frontend</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <p>
          Hi
          {data.name}
        </p>
      )}
    </Layout>
  );
}

export default MainPage;
