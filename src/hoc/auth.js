import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/userAction";

export default function (Component, option, adminRoute = null) {
    // option
    // null => Anyone can access
    // true => Only logged in user can access
    // false => Logged in user cannot access
    function AuthCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())
            .then(res => {
                if (!res.payload.data.isAuth) {
                    if (option) {
                        props.history.push('/signin');
                    }
                } else {
                    if (option != null) {
                        if (!option) {
                            console.log('!');
                            props.history.push('/');
                        }
                    }
                }
            });
        }, []);
        
        return <Component />
    }
    
    return AuthCheck;
}