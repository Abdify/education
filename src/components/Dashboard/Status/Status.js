import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { getClasses } from '../../../api';
import GetItem from './GetItem';
import TopicDetail from './TopicDetail';

const Status = () => {
    
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getClasses();
                setClasses(data);
            } catch (error) {
                console.log(error);
            }
        };

        get();
    }, []);
    
    return (
        <div className="status">
            <Switch>
                <Route exact path="/dashboard/status">
                    <GetItem classs />
                </Route>
                <Route exact path="/dashboard/status/:classId">
                    <GetItem subject />
                </Route>
                <Route exact path="/dashboard/status/:classId/:subjectId">
                    <GetItem chapter />
                </Route>
                <Route exact path="/dashboard/status/:classId/:subjectId/:chapterId">
                    <GetItem topic />
                </Route>
                <Route exact path="/dashboard/status/:classId/:subjectId/:chapterId/:topicId">
                    <TopicDetail />
                </Route>
            </Switch>

        </div>
    );
};

export default Status;