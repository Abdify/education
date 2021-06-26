import React from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useParams } from 'react-router';
import userPhoto from '../../../../assets/images/Mask Group.png';
import modulesData from "../../../../fakeData/modules";
import userModules from '../../../../fakeData/userModules';
import users from '../../../../fakeData/users';
import './CourseHeader.css';


const CourseHeader = () => {
    const { courseId } = useParams();

    // Backend demo
    const currentCourseModules = modulesData.filter((module) => module.courseId === +courseId);
    const currentUserModules = userModules
        .filter((module) => currentCourseModules.find((c) => c._id === module.moduleId));
    
    const userProgress = 
        currentUserModules.reduce((total, module) => total + module.progressPercentage, 0);
    
    const percentage = userProgress / currentCourseModules.length;
    
    const user = users.find((user) => user._id === 1); // id will be sent through request header
    

    return (
        <div className="course-header">
            <div className="course-header-img">
                <CircularProgressbarWithChildren
                    value={percentage}
                    strokeWidth={5}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: "butt",
                        pathTransitionDuration: 0.5,

                        pathColor: `#274763`,
                        trailColor: "#fff",
                        backgroundColor: "#3e98c7",
                    })}
                >
                    <img src={userPhoto} alt="" />
                </CircularProgressbarWithChildren>
            </div>
            <div>
                <h1>
                    Welcome back, <br /> {user.userName}
                </h1>
                <h2>{percentage}% Completed</h2>
                <button className="transparent-btn">
                    {percentage === 100 ? "Completed" : percentage === 0 ? "Start" : "Resume"}
                </button>
            </div>
        </div>
    );
};

export default CourseHeader;