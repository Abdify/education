import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import courses from '../../../fakeData/courses';
import userCoursesData from '../../../fakeData/myCourses';
import ArrowButton from '../../../utilities/ArrowButton';
import CourseCard from '../CourseCard/CourseCard';
import './Courses.css';
import Search from './Search/Search';

const Courses = ({ coursesRef }) => {
    const myCourseRef = useRef();
    const featuredCourseRef = useRef();

    // Backend demo
    let userCourses = [];
    userCoursesData.map((course) => {
        const newCourse = courses.find((C) => course.courseId === C._id);
        newCourse["completedModules"] = course.completedModules;
        userCourses.push(newCourse);
    });

    return (
        <div className="courses-container" ref={coursesRef}>
            <Search />

            <div>
                <div className="courses-top">
                    <h1>My Courses</h1>
                    <ArrowButton wrapper={myCourseRef} direction={-1} />
                    <ArrowButton wrapper={myCourseRef} direction={1} />
                </div>

                <div ref={myCourseRef} className="courses">
                    {userCourses?.map((course) => (
                        <CourseCard course={course} details />
                    ))}
                </div>
            </div>

            <div>
                <div className="courses-top">
                    <h1>Featured Courses</h1>
                    <ArrowButton wrapper={featuredCourseRef} direction={-1} />
                    <ArrowButton wrapper={featuredCourseRef} direction={1} />
                </div>

                <div ref={featuredCourseRef} className="courses">
                    {courses
                        .filter((course) => course.isFeatured)
                        .map((course) => (
                            <CourseCard course={course} details />
                        ))}
                </div>
            </div>

            <button className="transparent-btn">Load more</button>
        </div>
    );
};

const ArrowBtns = ({wrapper}) => {
        const sideScroll = (element, speed, distance = 530, step) => {
            let scrollAmount = 0;
            const slideTimer = setInterval(() => {
                element.scrollLeft += step;
                scrollAmount += Math.abs(step);
                if (scrollAmount >= distance) {
                    clearInterval(slideTimer);
                }
            }, speed);
        };
        const [width, setWidth] = useState(0);
        useEffect(() => {
            setWidth(document.querySelector(".course-card")?.getBoundingClientRect().width)
        }, []);
        
    return (
        <>
            <button
                className="arrow-btn"
                onClick={() => {
                    sideScroll(wrapper.current, 10, width-5, -20);
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft} fixedWidth />
            </button>
            <button
                className="arrow-btn"
                onClick={() => {
                    sideScroll(wrapper.current, 10, width-5, 20);
                }}
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </>
    );
}

export default Courses;