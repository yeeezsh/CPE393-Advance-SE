import React from "react";
import BookmarkContainer from "../containers/Bookmark";
import HomeContainer from "../containers/Home/Home.container";

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <BookmarkContainer></BookmarkContainer>
    </HomeContainer>
  );
};

export default HomePage;
