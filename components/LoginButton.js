import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup
} from "firebase/auth";
import { app } from "../config/firebaseConfig";

/**
 * Allow the user to log in by using Google Auth Provided
 * @returns {JSX.Element}
 * @constructor
 */
const LoginButton = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const googleSignUp = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err.code);
            })
    }
    return (
        <div>
            <button onClick={ googleSignUp }>Sign Up with Google</button>
        </div>
    )
}

export default LoginButton;
