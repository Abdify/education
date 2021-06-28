import React, { useContext, useEffect, useState } from "react";
import { addStyles } from "react-mathquill";
import { getCurrentUserQuestions } from "../../../api";
import { userAuthContext } from "../../../App";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./AddQuestion.css";
import QuestionInfoForm from "./QuestionInfoForm";

addStyles();

const AddQuestion = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);

    const initialState = {
        class: "",
        subject: "",
        chapter: "",
        topic: "",
        type: "",
    };

    const [sourceFound, setSourceFound] = useState(false);
    const [source, setSource] = useState(initialState);
    const [userQuestions, setUserQuestions] = useState({});

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const { data } = await getCurrentUserQuestions(currentUser._id);
                setUserQuestions(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getQuestions();
    }, [])

    console.log(userQuestions)
    return (
        <div>
            <h2 className="title-text-2">Add Question</h2>
            {sourceFound ? (
                <QuestionInfoForm source={source} setSourceFound={setSourceFound} />
            ) : (
                <QuestionSourceForm
                    source={source}
                    setSource={setSource}
                    setSourceFound={setSourceFound}
                />
            )}
            <div className="mt-5 question-preview">
                <h1>Your Questions</h1>
                {userQuestions.length &&
                    userQuestions.map((question) => (
                        <QuestionCard question={question} />
                    ))}
            </div>
        </div>
    );
    
};


function QuestionSourceForm({ source, setSource, setSourceFound}){


    const handleChange = (e) => {
        setSource({...source, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSourceFound(true);
    }

    return (
        <form onSubmit={handleSubmit} className="question-source-form">
            <select name="class" value={source.class} onChange={handleChange} >
                <option value="" selected disabled>
                    Select Class
                </option>
                <option value="hsc">HSC</option>
            </select>
            <select name="subject" value={source.subject} onChange={handleChange} >
                <option value="" selected disabled>
                    Select Subject
                </option>
                <option value="math1">Mathematics 1st Paper</option>
            </select>
            <select name="chapter" value={source.chapter} onChange={handleChange} >
                <option value="" selected disabled>
                    Select Chapter
                </option>
                <option value="circle">Circle</option>
            </select>
            <select name="topic" value={source.topic} onChange={handleChange} >
                <option value="" selected disabled>
                    Select Topic
                </option>
                <option value="equation-of-circle">Equation of A Circle</option>
            </select>
            <select name="type" value={source.type} onChange={handleChange} >
                <option value="" selected disabled>
                    Select Type
                </option>
                <option value="board">Board Question</option>
                <option value="book">Book Question</option>
                <option value="admission">Admission Book question</option>
                <option value="self">Self Created Question</option>
            </select>
            <button className="btn btn-dark">Submit</button>
        </form>
    );
}

export default AddQuestion;
