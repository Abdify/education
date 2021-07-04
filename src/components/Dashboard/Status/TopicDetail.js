import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getTopicQuestions } from '../../../api';
import QuestionCard from '../QuestionCard/QuestionCard';

const TopicDetail = () => {
    const { topicId } = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getTopicQuestions(topicId);
                setQuestions(data);
            } catch (error) {
                console.log(error);
            }
        }
        get();
    }, []);
    console.log(questions)

    return (
        <div className="topic-questions">
            {
                questions.map(question => (
                    <QuestionCard question={question} />
                ))
            }
        </div>
    );
};

export default TopicDetail;