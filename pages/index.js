import { useState } from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../firebaseConfig";
import styles from "../styles/Home.module.css";
import {GoogleOutlined} from "@ant-design/icons";

function HomePage() {
    const [user, setUser] = useState({});

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
        getAuth(app).signOut();
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {
                    user.email ? (
                        <div>
                            <h1>Welcome {user.displayName}</h1>
                            <button onClick={ signOut }>Sign Out</button>
                        </div>
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