import React from "react";
import "./Home.css";
import HomeCourses from "./HomeCourses/HomeCourses";
import HomeHeader from "./HomeHeader/HomeHeader";

const Home = () => {

    return (
        <div className="home">

            <HomeHeader />

            <HomeCourses />
        </div>
    );
};

export default Home;
