import React from "react";
import { Hero, List, Footer } from "../components";
const Home = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <Hero />
      <List />
    </div>
  );
};

export default Home;
