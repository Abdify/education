import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
    addChapter, addClass, addSubject, addTopic,
    getChapters, getClasses, getSubjects, getTopics
} from "../../../api";
import './Status.css';

// TODO: Don't use Linters

const GetItem = ({classs, subject, chapter, topic}) => {
    const { classId, subjectId, chapterId } = useParams();
    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState({});
    const itemName = classs ? "class" : subject ? "subject" : chapter ? "chapter" : topic ? "topic" : "";
    
    const [message, setMessage] = useState("");
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    
    useEffect(() => {

        const get = async () => {
            
            try {
                const {data} = 
                classs ? await getClasses() :
                subject ? await getSubjects(classId) : 
                chapter ? await getChapters(subjectId) :
                topic ? await getTopics(chapterId) :
                {data: []};
                
                setList(data);
            } catch (error) {
                console.log(error);
            }
        };
        
        get();
    }, [classId, subjectId, chapterId, classs, chapter, subject, topic, message]);
    
    useEffect(() => {
        const initialState = 
            classs ? { name: "", numberOfSubjects: "" } : 
            subject ? { name: "", class: classId, numberOfChapters: 0 } : 
            chapter ? { name: "", class: classId, subject: subjectId, numberOfTopics: 0 } : 
            topic ? { name: "", class: classId, subject: subjectId, chapter: chapterId, } : 
            {};
        setNewItem(initialState)
    }, [classs, subject, chapter, topic]);

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    return (
        <div className="class-status">
            {message && <p className="text-danger">{message}</p>}

            <h3>{itemName.toUpperCase()}</h3>
            {list.length &&
                list.map((listItem) => {
                    
                //const url = `/dashboard/status/${itemName}/${listItem._id}`;
                const url =
                chapterId ? `/dashboard/status/${classId}/${subjectId}/${chapterId}/${listItem.topicId}` :
                subjectId ? `/dashboard/status/${classId}/${subjectId}/${listItem.chapterId}` :
                classId ? `/dashboard/status/${classId}/${listItem.subjectId}` :
                `/dashboard/status/${listItem.classId}`;
                
                return (
                    <Link to={url} className="btn btn-dark mb-1">
                        <li>{listItem.name}</li>
                    </Link>
                );
                
                })}
            <button
                className="btn btn-danger mt-2"
                onClick={() => setShowAddItemForm(!showAddItemForm)}
            >
                <FontAwesomeIcon icon={showAddItemForm ? faMinus : faPlus} />
            </button>
            {showAddItemForm && (
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        name="name"
                        placeholder="Enter name"
                        required
                        value={newItem.name}
                        onChange={handleChange}
                    />
                    <input
                        className="form-control"
                        name="numberOfSubjects"
                        placeholder="Number of sub item"
                        value={newItem.numberOfSubjects}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-danger">
                        Add
                    </button>
                </form>
            )}
        </div>
    );

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = 
            classs ? await addClass(newItem) :
            subject ? await addSubject(newItem) :
            chapter ? await addChapter(newItem) :
            topic ? await addTopic(newItem) :
            {data: {message: "Nothing to add!"}};

            if (data.name) {
                setMessage("Success!");
                setTimeout(() => {
                    setMessage("");
                }, 2000);
                setShowAddItemForm(false);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    }
};

export default GetItem;
