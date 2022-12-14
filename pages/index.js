import Link from "next/link";
import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import {GoogleOutlined} from "@ant-design/icons";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../config/firebaseConfig";
import Footer from "../components/Footer";
import { LogoutOutlined } from "@ant-design/icons";

const Index = () => {
    {/* STATE DECLARATION */}
    const [user, setUser] = useState({});
    const [uidFromLocal, setUidFromLocal] = useState("");

    {/* USE EFFECT DECLARATION */}
    useEffect(() => {
        setUidFromLocal(localStorage.getItem('uid'));
        console.info("got uid from local storage");
    }, []);

    {/* AUTH SERVICES */}
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const googleSignUp = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                console.log(response);
                setUser(response.user);
                window.localStorage.setItem('uid', response.user.uid);
                setUidFromLocal(window.localStorage.getItem('uid'));
            })
            .catch((err) => {
                console.error(err.code);
            })
    }
    const signOut = () => {
        setUser({});
        setUidFromLocal("");
        window.localStorage.removeItem('uid');
        if(window.localStorage.getItem('spotifyToken')) {
            window.localStorage.removeItem('spotifyToken');
        }
        getAuth(app).signOut()
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    {/* FUNCTIONS DECLARATION */}
    const getLocalUid = () => {
        return localStorage.getItem('uid');
    }

    return (
        <div>
            <header>
                <Link href="/">TW-Analyze</Link>
                {
                    uidFromLocal ? (
                        <div>
                            <button
                                className="custom-button"
                                id="sign-out-button"
                                onClick={ signOut }
                            >
                                <LogoutOutlined />
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </header>
            <div className="global-container">
                {
                    uidFromLocal ? (
                        <Home
                            uid={user.uid}
                            dpName={user.displayName}
                        />
                    ) : (
                        <div id="login-container">
                            <h3 id="login-text">Welcome on TW-Analyze app ! You first need to authenticate with Google before going further !</h3>
                            <button className="gbutton" onClick={ googleSignUp }>
                                <GoogleOutlined className="gicon" />
                                Sign Up with Google
                            </button>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
};

export default Index;
