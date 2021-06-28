import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { StaticMathField } from 'react-mathquill';
import './QuestionCard.css';

const QuestionCard = ({question}) => {
    return (
        <div className="question-card">
            <div>
                <small>Question:</small>
                {question.question.split("\n").map((line) => (
                    <StaticMathField>{line}</StaticMathField>
                ))}
                <img src={question.imageLink} alt=""/>
            </div>
            <small> <FontAwesomeIcon icon={faClock} /> {Date(question.addedAt).slice(0, 21)}</small>
            <div>
                <small>Answer:</small>
                <p>{question.answer}</p>
            </div>
        </div>
    );
};

export default QuestionCard;