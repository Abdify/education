import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import modulesData from "../../../fakeData/modules";
import userModules from "../../../fakeData/userModules";
import checkStatus from '../../../utilities/checkStatus';
import { statusStyle } from "../../../utilities/statusStyle";
import './CourseDetail.css';
import CourseHeader from "./CourseHeader/CourseHeader";

const CourseDetail = () => {
    const { courseId } = useParams();
    const match = useLocation();
    const currentCourseModules = modulesData.filter((module) => module.courseId === +courseId);
    let modules = [];

    // Backend demo
    userModules.map((module) => {
        const newModule = currentCourseModules.find((m) => module.moduleId === m._id);
        if(newModule) {
            newModule.progressPercentage = module.progressPercentage;
            modules.push(newModule);
        }
    });
        
    return (
        <>
            <CourseHeader />
            
            <div className="course-description">
                <div className="course-top-nav">
                    <h2 className="active-item">Modules</h2>
                    <h2>Calender</h2>
                    <h2>Messages</h2>
                </div>
                {modules.length && modules.map((module) => {
                    return (
                        <Link to={`${match.pathname}/module/${module._id}`}>
                            <div className="module">
                                <div
                                    className="completion-status"
                                    style={statusStyle(module.status)}
                                >
                                    {checkStatus(module.status)}
                                </div>
                                <h2> Week {module.weekId} - {module.moduleName}</h2>
                                <div className="module-status">
                                    <progress
                                        value={module.progressPercentage} max={100}
                                    ></progress>
                                    <p>
                                        {module.progressPercentage}% Complete
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default CourseDetail;
