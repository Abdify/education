import React from 'react';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';

const HomeHeader = () => {
    return (
        <div className="home-header">
            <div>
                <h1>Are You Ready to <br/> Challenge Your Limits?</h1>
                <Link to="/learn">
                    <button className="transparent-btn">Yeah! Come on!</button>
                </Link>
            </div>
            <hr />
            <div>
                <h1 className="title-text">
                    <Typist avgTypingDelay={70}>
                        Learn
                        <Typist.Backspace count={5} delay={500} />
                        Show Creativity
                        <Typist.Backspace count={15} delay={500} />
                        Compete Friends
                        <Typist.Backspace count={15} delay={500} />
                        Exam
                    </Typist>
                </h1>
            </div>
        </div>
    );
};

export default HomeHeader;