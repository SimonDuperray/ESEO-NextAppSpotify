import { useState, useEffect } from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../config/firebaseConfig";
import styles from "../styles/Home.module.css";
import {GoogleOutlined} from "@ant-design/icons";
import Home from "../components/Home";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import Link from "next/link";

/**
 * Homepage of the app
 * Render the login component if the user is not logged in, the track's info and graphs otherwise
 * @returns {JSX.Element}
 * @constructor
 */
function HomePage() {
    const [user, setUser] = useState({});
    const [tracks, setTracks] = useState([]);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const googleSignUp = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                console.log(response);
                setUser(response.user);
            })
            .catch((err) => {
                console.error(err.code);
            })
    }
    const signOut = () => {
        setUser({});
        getAuth(app).signOut()
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
     *   When the page is loaded:
     *      - fetch all tracks info from the firebase database
     */
    useEffect(() => {
        const fetchData = async () => {
            let tracksList = [];
            const querySnapshot = await getDocs(collection(getFirestore(app), "tracks"));
            querySnapshot.forEach((doc) => {
                tracksList.push(doc.data());
            })
            setTracks(tracksList);
            console.log(`tracks list: ${tracks}`);
        }
         fetchData()
             .catch((err) => {
                 console.error(err);
             })
    }, []);
    return (
        <div className={styles.container}>
            <header>
                <Link href="/">TW-Analyze</Link>
                {
                    user.email ? (
                        <div>
                            <button onClick={ signOut }>Sign out</button>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </header>
            <main className={styles.main}>
                {
                    user.email ? (
                        <Home uid={user.email} dpName={user.displayName} tracks={tracks}/>
                    ) : (
                        <div>
                            <h1 className={styles.title}>Welcome to Spotify Analytics App!</h1>

                            <button className={styles.gButton} onClick={ googleSignUp }>
                                <GoogleOutlined className={styles.gIcon} />
                                Sign Up with Google
                            </button>
                        </div>
                    )
                }
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/SimonDuperray/ESEO-NextAppSpotify"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © AUGER Caroline - DUPERRAY Simon
                </a>
            </footer>
        </div>
    )
}

export default HomePage;
