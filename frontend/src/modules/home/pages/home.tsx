import { useQuery } from "@apollo/client";
import React from "react";
import { useDemoQuery } from "../../../common/services/generate/generate-types";
import HomeLayout from "../components/Layouts/Home/Home.Layout";

const HomePage: React.FC = () => {
  const { data, error, loading } = useDemoQuery();

  loading && console.log(data?.serverStatus);

  return <HomeLayout></HomeLayout>;
};

export default HomePage;
