import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from 'react';
import { useHistory } from "react-router";
import { addQuestion } from "../../../api";
import { userAuthContext } from "../../../App";

const QuestionInfoForm = ({source, setSourceFound}) => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const history = useHistory();

    const [questionInfo, setQuestionInfo] = useState({question: "", answer: "", imageLink: ""});
    const [imageLoaded, setImageLoaded] = useState("");

    const handleChange = (e) => {
        setQuestionInfo({...questionInfo, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={handleAddQuestion} className="add-question-form">
            <div className="arrow-btn-3" onClick={() => setSourceFound(false)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div>
                <small>Question</small>
                <textarea
                    name="question"
                    placeholder={`Use markdown syntax to format your text. e. g. 
                        # heading 1
                        ## heading 2
                        **Bold**
                        *Italic*
                        [Link](http://a.com)
                        `}
                    required
                    value={questionInfo.question}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <small>Answer of the question</small>
                <input name="answer" placeholder="Enter Answer" required value={questionInfo.answer} onChange={handleChange} />
            </div>
            <div>
                <small>If any photo needed for this question</small>
                <input type="file" onChange={getPhotoLink} />
                {imageLoaded && <p>{imageLoaded}</p>}
            </div>
            <button className="btn transparent-btn" disabled={!questionInfo.imageLink}>
                <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
        </form>
    );


    async function handleAddQuestion(e) {
        e.preventDefault();
        if (questionInfo.imageLink) {
            const newQuestion = {
                addedBy: currentUser,
                addedAt: new Date().getTime(),
                source: source,
                question: questionInfo.question,
                answer: questionInfo.answer,
                imageLink: questionInfo.imageLink,
            };
            console.log(newQuestion);

            try {
                const {data} = await addQuestion(newQuestion)
                if (data) {
                    console.log(data);
                    history.push("/");
                } else {
                    alert("Something went wrong, please try again!");
                }
            } catch (error) {
                
            }
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
                setQuestionInfo({...questionInfo , imageLink: response.data.data.display_url});
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export default QuestionInfoForm;