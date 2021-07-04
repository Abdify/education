import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { StaticMathField } from 'react-mathquill';
import ReactToPdf from 'react-to-pdf';
import './QuestionCard.css';

// addStyles();

const QuestionCard = ({question}) => {
    const ref = React.createRef();
    
    return (
        <div className="question-card" ref={ref}>
            <div>
                <small>Question:</small>
                <p className="question-lines">
                    {question.question.split("\\ ").map((word) => (
                        <StaticMathField>{word}</StaticMathField>
                    ))}
                </p>

                <img src={question.imageLink} alt="" />
            </div>
            <small>
                {" "}
                <FontAwesomeIcon icon={faClock} /> {Date(question.addedAt).slice(0, 21)}
            </small>
            <div>
                <small>Answer:</small>
                <p>{question.answer}</p>
            </div>

            <div>
                <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                    {({ toPdf }) => <button className="btn-dark" onClick={toPdf}>Generate pdf</button>}
                </ReactToPdf>
                
            </div>
        </div>
    );
};

export default QuestionCard;