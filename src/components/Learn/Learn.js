import React, { useRef } from 'react';
import Courses from './Courses/Courses';
import LearnHeader from './LearnHeader/LearnHeader';

const Learn = () => {
    const coursesRef = useRef();
    return (
        <div>
            <LearnHeader coursesRef={coursesRef} />
            <Courses coursesRef={coursesRef} />
        </div>
    );
};

export default Learn;