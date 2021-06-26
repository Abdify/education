import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import activitiesData from '../../../fakeData/activities';
import modules from '../../../fakeData/modules';
import userActivitiesData from '../../../fakeData/userActivities';
import checkStatus from '../../../utilities/checkStatus';
import { statusStyle } from '../../../utilities/statusStyle';
import './Module.css';

const Module = () => {
    const { moduleId } = useParams();
    const match = useLocation();
    let completedActivity = 0;
    
    const module = modules.find(module => module._id === +moduleId);
    const activities = activitiesData.filter(activity => activity.moduleId === +moduleId);
    
    userActivitiesData.map(activity => {
        const newActivity = activities.find(a => a._id === activity.activityId);
        if(newActivity && activity.status === 3) completedActivity++;

    } )
    
    return (
        <>
            <div className="module-header">
                <h1>Week {module.weekId}</h1>
                <h2>Progress</h2>
                <div className="module-header-status">
                    <h2>
                        {completedActivity} / {activities.length}
                    </h2>
                    <progress value={completedActivity / activities.length}></progress>
                    <h2>{Math.round((completedActivity * 100) / activities.length) || 0}% Completed</h2>
                </div>
            </div>

            <div className="arrow-btn-2">
                <FontAwesomeIcon icon={faArrowLeft} />
                <FontAwesomeIcon icon={faArrowRight} />
            </div>

            <div className="module-details">
                {activities?.map((activity) => {
                    return (
                        <Link to={`${match.pathname}/activity/${activity._id}`}>
                            <div className="activity">
                                <img src={activity.thumbnailUrl} alt="" />
                                <h2>
                                    Activity {activity.activityNumber} - {activity.activityName}
                                </h2>
                                <div
                                    className="completion-status"
                                    style={statusStyle(activity.status)}
                                >
                                    {checkStatus(activity.status) || "Start"}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};


export default Module;