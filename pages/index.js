import { useState, useEffect } from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../firebaseConfig";
import styles from "../styles/Home.module.css";
import {GoogleOutlined} from "@ant-design/icons";
import Home from "../components/Home";
import { getDocs, collection, getFirestore } from "firebase/firestore";

function HomePage() {
    const [user, setUser] = useState({});
    const [artists, setArtists] = useState([]);

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
    useEffect(() => {
        const fetchData = async () => {
            let artistsList = [];
            const querySnapshot = await getDocs(collection(getFirestore(app), "artists"));
            querySnapshot.forEach((doc) => {
                artistsList.push(doc.data());
            })
            setArtists(artistsList);
        }
        fetchData()
            .catch((err) => {
                console.error(err);
            })
    }, []);
    return (
        <div className={styles.container}>
            <header>
                <p>Logo</p>
                {
                    user.email ? (
                        <button onClick={ signOut }>Sign out</button>
                    ) : (
                        <></>
                    )
                }
            </header>
            <main className={styles.main}>
                {
                    user.email ? (
                        <Home dpName={user.displayName} artists={artists}/>
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