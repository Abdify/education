import React from 'react';
import './LearnHeader.css';

const LearnHeader = ({coursesRef}) => {
    return (
        <div className="learn-header">
            <div></div>
            <div className="learn-header-description">
                <p className="title-text">
                    Learn The Basics <br /> Conquer the Field
                </p>
                <button
                    className="transparent-btn"
                    onClick={() => coursesRef.current.scrollIntoView({ behavior: "smooth" })}
                >
                    Show Courses
                </button>
            </div>
        </div>
    );
};

export default LearnHeader;