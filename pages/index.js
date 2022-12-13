import App from "../components/Home"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import styles from "../styles/Home.module.css";
import {GoogleOutlined} from "@ant-design/icons";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../config/firebaseConfig";
import Footer from "../components/Footer";

const Index = () => {
    {/* STATE DECLARATION */}
    const [user, setUser] = useState({});
    const [uidFromLocal, setUidFromLocal] = useState("");

    {/* USE EFFECT DECLARATION */}
    useEffect(() => {
        setUidFromLocal(localStorage.getItem('uid'));
        console.info("got uid from local storage");
    }, [])

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
                                Sign out
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
                            <button className={styles.gButton} onClick={ googleSignUp }>
                                <GoogleOutlined className={styles.gIcon} />
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