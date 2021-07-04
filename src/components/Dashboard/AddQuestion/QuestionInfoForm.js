import { faArrowLeft, faEraser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import EquationEditor from "equation-editor-react";
import React, { useContext, useState } from 'react';
import { StaticMathField } from "react-mathquill";
import { addQuestion } from "../../../api";
import { userAuthContext } from "../../../App";
// addStyles();

const QuestionInfoForm = ({source, setSourceFound}) => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);

    const [questionInfo, setQuestionInfo] = useState({answer: "", imageLink: ""});
    const [question, setQuestion] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setQuestionInfo({...questionInfo, [e.target.name]: e.target.value});
    }
    const clear = () => {
        setQuestion("");
        setQuestionInfo({answer: "", imageLink: ""});
        setMessage("");
    }


    const handleInput = (e) => {
        
        // if (e.target.value[e.target.value.length - 1] === " " && e.nativeEvent.data !== null) 
        // setInput(e.target.value.slice(0,-1) + `\\ `);
        // else 
        setQuestion(e.target.value)
        
    }


    const Show = ({text}) => {
        const equations = text.match(/(\${2}[\w\d\s{}^*/\\=+-]+\${2})/gi);
        console.log(equations)
        return (
            <div>
                {
                    equations ? equations.map((equation, i) => {
                        
                        const start = text.indexOf(equation);
                        const end = start + equation.length;
                        const next = text.indexOf(equations[i+1]) || text.length;
                        return (
                            <span>
                                {i === 0 && text.slice(0, start)}
                                {/* <MathJax.Node inline formula={text.slice(start+2, end-2)} /> */}
                                <StaticMathField>{text.slice(start + 2, end - 2)}</StaticMathField>
                                <EquationEditor
                                    value={text.slice(start + 2, end - 2)}

                                    autoCommands="pi theta sqrt sum prod alpha beta gamma rho vec bar int"
                                    autoOperatorNames="sin cos tan"
                                />
                                {text.slice(end, next)}
                            </span>
                        );
                        
                    }) : (<p>{text}</p>)
                }
            </div>
        )

    }

    return (
        <form onSubmit={handleAddQuestion} className="add-question-form">
            <div className="arrow-btn-3" onClick={() => setSourceFound(false)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <div className="question-editor">
                <small>Question</small>
                <EquationEditor
                    value={question}
                    onChange={setQuestion}
                    autoCommands="pi theta sqrt sum prod alpha beta gamma rho vec bar int"
                    autoOperatorNames="sin cos tan"
                />
            </div>

            {/* <div>
                <textarea type="text" value={question} onChange={handleInput} />
                <Show text={question} />
            </div> */}

            <div>
                <small>Answer of the question</small>
                <input
                    name="answer"
                    placeholder="Enter Answer"
                    required
                    value={questionInfo.answer}
                    onChange={handleChange}
                />
            </div>
            <div>
                <small>If any photo needed for this question</small>
                <input type="file" required onChange={getImageLink} />
            </div>
            <div className="submit-btns">
                <button
                    className="btn transparent-btn btn-dark"
                    type="submit"
                    disabled={!(questionInfo.imageLink && question)}
                >
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                </button>
                <button className="btn transparent-btn btn-danger" type="reset" onClick={clear}>
                    <FontAwesomeIcon icon={faEraser} size="lg" />
                </button>
            </div>
            <h3>{message && message}</h3>
        </form>
    );


    async function handleAddQuestion(e) {
        e.preventDefault();
        if (questionInfo.imageLink.length) {
            const newQuestion = {
                addedBy: currentUser,
                source: source,
                question,
                answer: questionInfo.answer,
                imageLink: questionInfo.imageLink,
            };
            console.log(newQuestion)
            try {
                const {data} = await addQuestion(newQuestion)
                if (data._id) {
                    console.log(data);
                    setMessage("Added your question successfully!");
                } else {
                    setMessage("Something went wrong, please try again!");
                }
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            setMessage("Photo was not uploaded! Please wait");
        }
    }

    function getImageLink(e) {
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