import React from "react";
import { Route, Switch } from "react-router-dom";
import AddExam from "../AddExam/AddExam";
import AddQuestion from "../AddQuestion/AddQuestion";
import AddReview from "../AddReview/AddReview";
import EnrollCourse from '../EnrollCourse/EnrollCourse';
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageCourses from "../ManageCourses/ManageCourses";
import Sidebar from "../Sidebar/Sidebar";
import Status from "../Status/Status";

const Dashboard = () => {
    return (
        <div>
            <div className="row">
                <Sidebar />
                <div className="col-md-10">
                    <Switch>
                        {/* <Route exact path="/dashboard">
                            <EnrolledCoursesList />
                        </Route>
                        <Route path="/dashboard/enrolled-courses">
                            <EnrolledCoursesList />
                        </Route> */}
                        <Route exact path="/dashboard/enroll">
                            <EnrollCourse />
                        </Route>
                        <Route path="/dashboard/enroll/:courseId">
                            <EnrollCourse />
                        </Route>
                        <Route path="/dashboard/status">
                            <Status />
                        </Route>
                        <Route path="/dashboard/add-question">
                            <AddQuestion />
                        </Route>
                        <Route path="/dashboard/add-exam">
                            <AddExam />
                        </Route>
                        <Route path="/dashboard/make-admin">
                            <MakeAdmin />
                        </Route>
                        <Route path="/dashboard/review">
                            <AddReview />
                        </Route>
                        <Route path="/dashboard/manage-courses">
                            <ManageCourses />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
