import Link from "next/link";
import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import {GoogleOutlined} from "@ant-design/icons";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../config/firebaseConfig";
import Footer from "../components/Footer";
import { LogoutOutlined } from "@ant-design/icons";
import ReallySimpleHeader from "../components/ReallySimpleHeader";
import {collection, getDocs, getFirestore} from "firebase/firestore";

const Index = () => {
    {/* STATE DECLARATION */}
    const [user, setUser] = useState({});
    const [uidFromLocal, setUidFromLocal] = useState("");
    const [dpNameFromLocal, setDpNameFromLocal] = useState("");
    const [twad, setTwad] = useState([]);
    const [afb, setAfb] = useState([]);
    const [tracks, setTracks] = useState([]);

    {/* USE EFFECT DECLARATION */}
    useEffect(() => {
        setUidFromLocal(localStorage.getItem('uid'));
        setDpNameFromLocal(localStorage.getItem('dpName'));
        console.info("got both uid and dpname from local storage");
    }, []);

    useEffect(() => {
        const fetchTwad = async () => {
            let twadBuffer = [];
            const querySnaphsot = await getDocs(collection(getFirestore(app), "the_weeknd_audio_features"));
            querySnaphsot.forEach((twadItem) => {
                twadBuffer.push(twadItem.data());
            })
            setTwad(twadBuffer);
        }
        fetchTwad()
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        const fetchAfb = async () => {
            let afbBuffer = [];
            const querySnaphsot = await getDocs(collection(getFirestore(app), "audio_features_bank"));
            querySnaphsot.forEach((afbItem) => {
                afbBuffer.push(afbItem.data());
            })
            setAfb(afbBuffer);
        }
        fetchAfb()
            .catch((err) => {
                console.log(err);
            })
    }, [twad]);

    useEffect(() => {
        const fetchTracks = async () => {
            let tracksBuffer = [];
            const querySnaphsot = await getDocs(collection(getFirestore(app), "tracks"));
            querySnaphsot.forEach((tracksItem) => {
                tracksBuffer.push(tracksItem.data());
            })
            setTracks(tracksBuffer);
        }
        fetchTracks()
            .catch((err) => {
                console.log(err);
            })
    }, [twad, afb]);


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
                window.localStorage.setItem('dpName', response.user.displayName);
                setDpNameFromLocal(window.localStorage.getItem('dpName'));
            })
            .catch((err) => {
                console.error(err.code);
            })
    }
    const signOut = () => {
        setUser({});
        setUidFromLocal("");
        window.localStorage.removeItem('uid');
        window.localStorage.removeItem('dpName')
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

    return (
        <div>
            {
                uidFromLocal && twad && afb && tracks ? (
                    <div>
                        <header>
                            <Link href="/">TW-Analyze</Link>
                            <Link id="navbar-elem" href="/metricsDescription">
                                Metrics Description
                            </Link>
                            <Link id="navbar-elem" href="/recommendations">
                                Recommendations
                            </Link>
                            <Link id="navbar-elem" href="/about">
                                About
                            </Link>
                                <div>
                                    <button
                                        className="custom-button"
                                        id="sign-out-button"
                                        onClick={ signOut }
                                    >
                                        <LogoutOutlined />
                                    </button>
                                </div>
                        </header>
                        <div className="global-container">
                            <Home
                                uid={user.uid}
                                dpName={dpNameFromLocal}
                                twadProps={twad}
                                afbProps={afb}
                                tracksProps={tracks}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <ReallySimpleHeader />
                        <div className="global-container">
                            <div id="login-container">
                                <h3 id="login-text">Welcome on TW-Analyze app ! You first need to authenticate with Google before going further !</h3>
                                <button className="gbutton" onClick={ googleSignUp }>
                                    <GoogleOutlined className="gicon" />
                                    Sign Up with Google
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    )
};

export default Index;
