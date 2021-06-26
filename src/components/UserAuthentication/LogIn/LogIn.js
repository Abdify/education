import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logIn } from "../../../api";
import { userAuthContext } from "../../../App";
import "./LogIn.css";

const LogIn = () => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className="login">
            <h1 className="title-text">Dive into it right now!</h1>
            <LogInForm />
            <small>
                No account yet? <Link to="/signup">Create one now!</Link>
            </small>
        </div>
    );

    function LogInForm() {
        const initialState = { email: "", password: "" };
        const [user, setUser] = useState(initialState);
        let history = useHistory();
        let location = useLocation();
        let { from } = location.state || { from: { pathname: "/" } };

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
                    onChange={handleChange}
                />
                <button className="transparent-btn">Log in</button>
            </form>
        );

        async function handleLogIn(e) {
            e.preventDefault();
            setLoading(true);

            try {
                const { data } = await logIn(user);
                
                if (data.user) {
                    localStorage.setItem("profile", JSON.stringify(data));
                    setCurrentUser(data.user);
                    history.replace(from);
                } else {
                    setError(data.message);
                    setLoading(false);
                }
            } catch (error) {
                setError("No user found! Create an account first.")
                setLoading(false);
            }
        }
    }
};

export default LogIn;
