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
        const [email, setEmail] = useState("demo@pb.com");
        const [password, setPassword] = useState("demo password");
        let history = useHistory();
        let location = useLocation();
        let { from } = location.state || { from: { pathname: "/dashboard" } };
        
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="transparent-btn">Log in</button>
            </form>
        );

        function handleLogIn(e) {
            e.preventDefault();
            setLoading(true);
            const user = {
                email,
                password,
            };

            logIn(user)
                .then((data) => {
                    // console.log(data);
                    if (data.success) {
                        localStorage.setItem("profile", data);
                        setCurrentUser(data.user);
                        history.replace(from);
                    } else {
                        setError(data.message);
                        setLoading(false);
                    }
                });
        }
    }
};

export default LogIn;
