import React, { useContext, useEffect, useState } from "react";
import { addStyles } from "react-mathquill";
import { getChapters, getClasses, getCurrentUserQuestions, getSubjects, getTopics } from "../../../api";
import { userAuthContext } from "../../../App";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./AddQuestion.css";
import QuestionInfoForm from "./QuestionInfoForm";

addStyles();

const AddQuestion = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);

    const initialSourceState = {
        class: "",
        subject: "",
        chapter: "",
        topic: "",
        type: "",
    };

    const [sourceFound, setSourceFound] = useState(false);
    const [source, setSource] = useState(initialSourceState);
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
    }, []);
    console.log(userQuestions);
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
                <div>
                    {userQuestions.length &&
                        userQuestions.map((question) => <QuestionCard question={question} />)}
                </div>
            </div>
        </div>
    );
    
};


function QuestionSourceForm({ source, setSource, setSourceFound}){
        const foundSourcesState = {
            classes: [],
            subjects: [],
            chapters: [],
            topics: [],
        };
    const [foundSource, setFoundSource] = useState(foundSourcesState);

    useEffect(() => {
        
        const get = async (thing) => {
            try {
                const { data } =
                    thing === "classes"
                        ? await getClasses()
                        : thing === "subjects"
                        ? await getSubjects(source.class)
                        : thing === "chapters"
                        ? await getChapters(source.subject)
                        : thing === "topics"
                        ? await getTopics(source.chapter)
                        : {};
                setFoundSource({ ...foundSource, [thing]: data });
            } catch (error) {
                console.log(error.message);
            }
        };
        
        !foundSource.classes.length && get("classes");
        source.class && get("subjects");
        source.subject && get("chapters");
        source.chapter && get("topics");
    }, [source]);
    console.log(foundSource, source.class)
    
    const handleChange = (e) => {
        setSource({...source, [e.target.name]: e.target.value});
        
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
                {foundSource.classes.map((cls) => (
                    <option value={cls.classId}>{cls.name}</option>
                ))}
            </select>
            <select name="subject" value={source.subject} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Subject
                </option>
                {foundSource.subjects.map((sub) => (
                    <option value={sub.subjectId}>{sub.name}</option>
                ))}
            </select>
            <select name="chapter" value={source.chapter} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Chapter
                </option>
                {foundSource.chapters.map((chap) => (
                    <option value={chap.chapterId}>{chap.name}</option>
                ))}
            </select>
            <select name="topic" value={source.topic} onChange={handleChange} required>
                <option value="" selected disabled>
                    Select Topic
                </option>
                {foundSource.topics.map((topic) => (
                    <option value={topic.topicId}>{topic.name}</option>
                ))}
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
