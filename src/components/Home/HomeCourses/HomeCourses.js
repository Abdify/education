import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import courses from '../../../fakeData/courses';
import ArrowButton from '../../../utilities/ArrowButton';
import CourseCard from '../../Learn/CourseCard/CourseCard';

const HomeCourses = () => {
    const coursesRef = useRef();

    return (
        <div className="home-cards-container">
            <div className="home-cards-left">
                <h1>Learn With Us</h1>
                <p>From Zero to One</p>
                <Link to="/learn">
                    <button className="transparent-btn">View All Courses</button>
                </Link>
                <div className="home-cards-btns">
                    <ArrowButton wrapper={coursesRef} direction={-1} distance={550} />
                    <ArrowButton wrapper={coursesRef} direction={1} distance={550} />
                </div>
            </div>

            <div className="home-cards" ref={coursesRef}>
                {courses
                    .filter((course) => course.isFeatured)
                    .map((course) => (
                        <CourseCard course={course} />
                    ))}
            </div>
        </div>
    );
};

export default HomeCourses;