import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import Modal from "react-modal";
import { useHistory, useLocation, useParams } from "react-router";
import userPhoto from "../../../assets/images/Mask Group.png";
import activities from "../../../fakeData/activities";
import userActivities from "../../../fakeData/userActivities";
import checkStatus from "../../../utilities/checkStatus";
import { statusStyle } from "../../../utilities/statusStyle";
import "./Activity.css";

const Activity = () => {
    const { moduleId, activityId } = useParams();
    const history = useHistory();
    const match = useLocation();
    const [activity, setActivity] = useState({});
    const [userStatus, setUserStatus] = useState({});

    useEffect(() => {
        const newActivity = activities.find(activity => activity.moduleId === +moduleId && activity._id === +activityId);
        setActivity(newActivity);
        
        const newUserStatus = userActivities.find(
            (activity) => activity.moduleId === +moduleId && activity.activityId === +activityId
        );
        setUserStatus(newUserStatus);
        
    }, [moduleId, activityId]);

    const go = (direction) => {
        const totalActivity = userActivities.filter(activity => activity.moduleId === +moduleId).length;
        const path = match.pathname.split("/").slice(0, -1).join("/");
        
        if((direction === -1 && +activityId > 1) || (direction === 1 && (+activityId < totalActivity))){
            history.push(`${path}/${+activityId + direction}`)
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        go(1)
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: "45vh",
            left: "60%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            borderRadius: "10px"
        },
};

    return (
        <>
            <video
                className="activity-video"
                src={activity?.videoUrl}
                poster={activity.thumbnailUrl}
                controls
                onEnded={openModal}
            ></video>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <div className="modal">
                    <h3>Activity Completed!</h3>

                    <div className="modal-img">
                        <CircularProgressbarWithChildren
                            value={90}
                            strokeWidth={5}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                pathTransitionDuration: 0.5,

                                pathColor: `#5bff5b`,
                                trailColor: "#fff",
                                backgroundColor: "#3e98c7",
                            })}
                        >
                            <img src={userPhoto} alt="" />
                        </CircularProgressbarWithChildren>
                    </div>
                    <small>90% Complete</small>
                    <h4>You have just completed</h4>
                    <h3>
                        Activity {activity.activityNumber}: {activity.activityName}
                    </h3>
                    <button onClick={closeModal} className="transparent-btn">
                        Go to Next Lesson
                    </button>
                </div>
            </Modal>

            <div className="arrow-btn-2">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => go(-1)} />
                <FontAwesomeIcon icon={faArrowRight} onClick={() => go(1)} />
            </div>

            <div className="activity-description">
                <div className="completion-status" style={statusStyle(userStatus?.status)}>
                    {checkStatus(userStatus?.status)}
                </div>

                <h2>
                    Activity {activity?.activityNumber} - {activity?.activityName}
                </h2>
                <p>
                    <FontAwesomeIcon icon={faClock} /> 12 minutes
                </p>

                <h2>Header</h2>
                <p>{activity?.description}</p>

                <h2>Header</h2>
                <p>{activity?.description}</p>
            </div>
        </>
    );
};

export default Activity;
