import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router';
import coursesData from '../../fakeData/courses';
import Activity from './Activity/Activity';
import './Course.css';
import CourseDetail from './CourseDetail/CourseDetail';
import Module from './Module/Module';
import Sidebar from './Sidebar/Sidebar';

const Course = () => {
    const { courseId } = useParams();
    const [currentCourse, setCurrentCourse] = useState({});
    
    // Backend demo
    useEffect(() => {
        const newCourse = coursesData.find(course => course._id === +courseId);
        setCurrentCourse(newCourse);

    }, [courseId]);
    
    return (
        <div className="course">
            <Sidebar course={currentCourse} />
            <div className="course-main">
                <Switch>
                    <Route exact path="/course/:courseId">
                        <CourseDetail />
                    </Route>
                    <Route exact path="/course/:courseId/module/:moduleId">
                        <Module />
                    </Route>
                    <Route path="/course/:courseId/module/:moduleId/activity/:activityId">
                        <Activity />
                    </Route>
                    
                </Switch>
            </div>
        </div>
    );
};

export default Course;