
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from '../api'
import DialogBox from "../components/DialogBox";


const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER",
}

function AuthContextProvider(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.loggedIn) {
            auth.getLoggedIn();
        }
    }, []);

    const handleOpenDialog = (errorMessage) => {
        setErrorMessage(errorMessage);
    };
    
    const handleCloseDialog = () => {
        setErrorMessage('');
    };

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }
            case AuthActionType.UPDATE_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }

            case AuthActionType.DELETE_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }

            default:
                return auth;
        }
    }

    auth.registerUser = async function (userData) {
        try{
            const response = await api.registerUser(userData);  
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                navigate('/');
            } 
        } catch (error) {
            handleOpenDialog(error.response.data.errorMessage);
        }
    }


    auth.loginUser = async function (userData) {
        try{
            const response = await api.loginUser(userData);
            console.log(userData);
            if (response.status === 200) {
                console.log('login success');
                    authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                navigate('/');
            }
        }
        catch(error){
            handleOpenDialog(error.response.data.errorMessage);
        }
    }

    auth.logoutUser = async function () {
        try{
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
            }
        }
        catch(error){
            handleOpenDialog(error.response.data.errorMessage);
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch(error){
            handleOpenDialog(error.response.data.errorMessage);
        }
    }


    auth.updateUser = async function (userData) {
        try{
            const response = await api.updateUser(auth.user.id, userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.UPDATE_ACCOUNT,
                    payload: {
                        user: response.data.user
                    }
                });
                navigate('/');
            }
            
        }
        catch(error){
            handleOpenDialog(error.response.data.errorMessage);
        }
            
    }
    
    auth.deleteUser = async function () {
        try{
            const response = await api.deleteUser(auth.user.id);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.DELETE_USER,
                    payload: null
                });
            }
        }
        catch(error){
            handleOpenDialog(error.response.data.errorMessage);
        }
    }

    

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
            <DialogBox errorMessage={errorMessage} onClose={handleCloseDialog} />
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };