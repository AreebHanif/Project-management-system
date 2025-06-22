import React from "react";
import { LogIn, LayoutDashboard, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <div>HI</div>;
};

export default Home;
