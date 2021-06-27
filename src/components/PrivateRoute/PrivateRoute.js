import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { logIn } from "../../api";
import { userAuthContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const { user } = JSON.parse(localStorage.getItem("profile"));
            
            logIn({email: user.email, password: user.password})
            .then(({data}) => {
                if(data.user) setCurrentUser(data.user);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);
    
    if (loading) {
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
