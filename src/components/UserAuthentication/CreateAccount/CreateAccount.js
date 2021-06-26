import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../../api";
import '../LogIn/LogIn.css';
const CreateAccount = () => {
    const history = useHistory();
    return (
        <div className="login">
            <h1>Join for incredible</h1>
            <LogInForm />
            <small>
                <Link to="/login">How many times should I create account?</Link>
            </small>
        </div>
    );

    function LogInForm() {
        const [userName, setUserName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState('');
        return (
            <form onSubmit={handleLogIn} className="login-form">
                <FontAwesomeIcon icon={faUserLock} size="3x" color="white" />
                {error && <p className="error-text">{error}</p>}
                <input
                    name="name"
                    placeholder="What should I call you?"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "Person without any name are not acceptable!"
                        )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    pattern=".{6,}"
                    onChange={(e) => setPassword(e.target.value)}
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "Do you tell that a password!?"
                        )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                />
                <button className="transparent-btn">Create</button>
            </form>
        );

        function handleLogIn(e) {
            e.preventDefault();

            const user = {
                userName,
                email,
                password,
            };
            
            signUp(user)
                .then((data) => {
                    if (!data.success) {
                        setError(data.message);
                    } else {
                        // Account created successfully
                        history.push('/login');
                    }
                });
        }
    }
};

export default CreateAccount;
