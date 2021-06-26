import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ArrowButton = ({ wrapper, direction, distance = 700 }) => {
    const sideScroll = (element, speed, distance, step) => {
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
        setWidth(document.querySelector(".course-card")?.getBoundingClientRect().width);
    }, []);

    return (
        <div
            className="arrow-btn-3"
            onClick={() => {
                sideScroll(wrapper.current, 10, width || distance, direction * 20);
            }}
        >
            {direction === -1 ? (
                <FontAwesomeIcon icon={faArrowLeft} />
            ) : (
                <FontAwesomeIcon icon={faArrowRight} />
            )}
        </div>
    );
};

export default ArrowButton;
