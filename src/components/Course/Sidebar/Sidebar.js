import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import modules from "../../../fakeData/modules";
import weeks from "../../../fakeData/weeks";
import "./Sidebar.css";

const Sidebar = ({ course }) => {
    const { courseId } = useParams();

    // Backend demo
    const weekModules = weeks
        .filter((week) => week.courseId === +courseId)
        .map((week) => {
            return {
                weekName: week.weekName,
                modules: modules.filter(
                    (module) => module.courseId === +courseId && module.weekId === week._id
                ),
            };
        });

    return (
        <nav className="course-sidebar">
            <Link to="/learn" style={{ marginLeft: "-1rem" }}>
                <FontAwesomeIcon icon={faChevronLeft} /> &nbsp; Courses
            </Link>

            <Link to={`/course/${course._id}`} className="heading-text-2">
                {course?.title}
            </Link>

            {weekModules.map((week) => {
                return (
                    <div className="sidebar-week">
                        <p className="heading-text-2">{week.weekName}</p>

                        {week.modules.map((module) => {
                            return (
                                <h3>
                                    <CircularStatus status={module.status} />
                                    <Link to={`/course/${courseId}/module/${module._id}`}>
                                        {module.moduleName}
                                    </Link>
                                </h3>
                            );
                        })}
                    </div>
                );
            })}
        </nav>
    );
};

const CircularStatus = ({ status }) => {
    return (
        <span
            className="circular-status"
            style={{
                background: status === 3 ? "green" : "white",
                color: status === 3 ? "white" : "black",
            }}
        >
            &#10003;
        </span>
    );
};

export default Sidebar;
