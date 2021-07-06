import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getChapters, getClasses, getSubjects, getTopics } from '../../../api';
import { userAuthContext } from '../../../App';

const AddExam = () => {
    const [coverPhotoLink, setCoverPhotoLink] = useState("");

    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const history = useHistory();
    const [imageLoaded, setImageLoaded] = useState("");
    const initialSourceState = {
        class: "",
        subject: "",
        chapter: "",
        topic: "",
        type: "",
    };

    const [sourceFound, setSourceFound] = useState(false);
    const [source, setSource] = useState(initialSourceState);
    const [infoFound, setInfoFound] = useState(false);
    const [userQuestions, setUserQuestions] = useState({});
    return (
        <div>
            <h2 className="title-text-2">Start an Exam</h2>

            { 
                infoFound ? 
                <QuestionSourceForm source={source} setSource={setSource} setSourceFound={setSourceFound} />:
                <ExamInfo setInfoFound={setInfoFound} />
            }

            <form onSubmit={handleAddCourse}></form>
        </div>
    );

    function handleAddCourse(e){
        e.preventDefault();
        if (coverPhotoLink) {
            const newCourse = {
                coverPhotoLink,
            };
            console.log(newCourse);
            fetch(`https://pro-tutors.herokuapp.com/addCourse`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-access-token": localStorage.getItem('ptToken')
                },
                body: JSON.stringify(newCourse),
            })
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    console.log(data);
                    history.push("/");
                } else {
                    alert("Something went wrong, please try again!");
                }
            });
        } else {
            alert("Photo was not uploaded! Please wait");
        }
    }

    function getPhotoLink(e) {
        const imageData = new FormData();

        imageData.set("key", "944474bba0b71f9545ba1025a047dc94");
        imageData.append("image", e.target.files[0]);
        axios
        .post("https://api.imgbb.com/1/upload", imageData)
        .then((response) => {
                setCoverPhotoLink(response.data.data.display_url);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

function ExamInfo({setInfoFound}){
    const [examInfo, setExamInfo] = useState({
        marks: "",
        startTime: "",
        endTime: "",
        date: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setInfoFound(true);
    };
    const handleChange = (e) => {
        setExamInfo({...examInfo, [e.target.name]: e.target.value});
        console.log(examInfo)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="marks" placeholder="Total Marks" required value={examInfo.marks} onChange={handleChange} />
            <input name="startTime" placeholder="Start Time" type="time" required value={examInfo.time} onChange={handleChange} />
            <input name="endTime" placeholder="End Time" type="time" required value={examInfo.duration} onChange={handleChange} />
            <input name="date" type="date" required value={examInfo.date} onChange={handleChange} />
            <button className="btn btn-dark">Submit</button>
        </form>
    );
}

function QuestionSourceForm({ source, setSource, setSourceFound }) {
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
    console.log(foundSource, source.class);

    const handleChange = (e) => {
        setSource({ ...source, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSourceFound(true);
    };

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
            <br/>
            <button className="btn btn-dark">Submit</button>
        </form>
    );
}




export default AddExam;