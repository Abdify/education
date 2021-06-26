import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import startups from '../../../fakeData/startups';
import ArrowButton from '../../../utilities/ArrowButton';
import StartupCard from '../../Incubator/StartupCard/StartupCard';


const HomeStartups = () => {
    const startupsRef = useRef();

    return (
        <div className="home-cards-container">
            <div className="home-cards-left">
                <h1>Minority Startups</h1>
                <p>From idea to unicorn, we teach minorities to be world leaders in tech</p>
                <Link to="/incubator">
                    <button className="transparent-btn">View All Startups</button>
                </Link>
                <div className="home-cards-btns">
                    <ArrowButton wrapper={startupsRef} direction={-1} distance={700} />
                    <ArrowButton wrapper={startupsRef} direction={1} distance={700} />
                </div>
            </div>

            <div className="home-cards" ref={startupsRef}>
                {startups.map((startup) => (
                    <StartupCard startup={startup} />
                ))}
            </div>
        </div>
    );
};

export default HomeStartups;