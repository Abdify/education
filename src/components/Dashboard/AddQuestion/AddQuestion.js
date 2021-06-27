import React, { useState } from "react";
import "./AddQuestion.css";
import QuestionInfoForm from "./QuestionInfoForm";

const AddQuestion = () => {

    const [sourceFound, setSourceFound] = useState(false);
    const initialState = {
        class: "",
        subject: "",
        chapter: "",
        topic: "",
        type: "",
    };
    const [source, setSource] = useState(initialState);
    return (
        <div>
            <h2 className="title-text-2">Add Question</h2>
            {
                sourceFound ? <QuestionInfoForm source={source} setSourceFound={setSourceFound} /> : <QuestionSourceForm source={source} setSource={setSource} setSourceFound={setSourceFound} />
            }
            
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
            <select name="class" value={source.class} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Class
                </option>
                <option value="hsc">HSC</option>
            </select>
            <select name="subject" value={source.subject} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Subject
                </option>
                <option value="math1">Mathematics 1st Paper</option>
            </select>
            <select name="chapter" value={source.chapter} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Chapter
                </option>
                <option value="circle">Circle</option>
            </select>
            <select name="topic" value={source.topic} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Topic
                </option>
                <option value="equation-of-circle">Equation of A Circle</option>
            </select>
            <select name="type" value={source.type} onChange={handleChange} required>
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
