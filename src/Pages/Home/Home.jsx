import React, { useContext } from "react";
import "./Home.css";
import { StoreContext } from "../../Context/ContextStore";

const Home = () => {
  const { user } = useContext(StoreContext);
  return (
    <div className="wrepper">
      <p>
        Welcome, <span> {user.username} </span> to admin pannel
      </p>
    </div>
  );
};

export default Home;
