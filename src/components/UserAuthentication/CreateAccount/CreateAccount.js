import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../../api";
import "../LogIn/LogIn.css";
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
        const initialState = { userName: "", email: "", password: "", confirmPassword: "" };
        const [user, setUser] = useState(initialState);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        const handleChange = (e) => {
            setUser({ ...user, [e.target.name]: e.target.value });
        };

        return (
            <form onSubmit={handleLogIn} className="login-form">
                {loading && (
                    <div className="loading">
                        <h1>Loading...</h1>
                    </div>
                )}
                <FontAwesomeIcon icon={faUserLock} size="3x" color="white" />
                {error && <p className="error-text">{error}</p>}

                <input
                    name="userName"
                    placeholder="What should I call you?"
                    required
                    value={user.userName}
                    onChange={handleChange}
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Person without any name are not acceptable!")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={user.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={user.password}
                    pattern=".{6,}"
                    onChange={handleChange}
                    onInvalid={(e) => e.target.setCustomValidity("Do you tell that a password!?")}
                    onInput={(e) => e.target.setCustomValidity("")}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
                <button className="transparent-btn">Create</button>
            </form>
        );

        async function handleLogIn(e) {
            e.preventDefault();
            setLoading(true);

            try {
                const { data } = await signUp(user);
                
                if(!data.user){
                    setError(data.message);
                    setLoading(false);
                    return;
                }
                history.push("/login");
                
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
    }
};

export default CreateAccount;
