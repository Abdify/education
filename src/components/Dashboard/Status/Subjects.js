import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addSubject, getSubjects } from "../../../api";
import "./Status.css";

const Subjects = () => {
    const { classId } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [add, setAdd] = useState(false);
    const [newSubject, setNewSubject] = useState({ name: "", class: classId, numberOfChapters: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const get = async () => {
            try {
                const { data } = await getSubjects(classId);
                setSubjects(data);
            } catch (error) {
                console.log(error);
            }
        };

        get();
    }, [classId, message]);
    console.log(subjects);

    const handleChange = (e) => {
        setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
    };

    return (
        <div className="class-status">
            {message && <p>{message}</p>}

            <h3>Subject</h3>
            {subjects.map((cls) => (
                <div className="btn btn-dark mb-1">
                    <li>{cls.name}</li>
                </div>
            ))}
            <button className="btn btn-danger mt-2" onClick={() => setAdd(!add)}>
                <FontAwesomeIcon icon={add ? faMinus : faPlus} />
            </button>
            {add && (
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        name="name"
                        placeholder="Enter Subject name"
                        required
                        value={newSubject.name}
                        onChange={handleChange}
                    />
                    <input
                        className="form-control"
                        name="numberOfSubjects"
                        placeholder="Number of chapters"
                        value={newSubject.numberOfSubjects}
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
            const { data } = await addSubject(newSubject);
            if (data.name) {
                setMessage("Success!");
                setAdd(false);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    }
};

export default Subjects;
