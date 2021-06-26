import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course, details }) => {
    const completePercentage = Math.round((course.completedModules * 100) / course.totalModules);

    return (
        <div className="course-card">
            <div className="course-dif-level">
                <li>
                    <span> {course.difficultyLevel}</span>
                </li>
            </div>

            <h1>{course.title}</h1>
            
            <p className="course-info">{course.description}</p>
            <Link to={`/course/${course._id}`}>
                <button className="learn-btn">Learn</button>
            </Link>

            {details && (
                <div>
                    <p className="course-info" style={{ textAlign: "right" }}>
                        {course.completedModules}/{course.totalModules} Modules
                    </p>
                    <progress value={course.completedModules} max="10"></progress>
                    <p style={{ textAlign: "center", margin: "5px" }}>
                        {completePercentage}% Completed
                    </p>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
