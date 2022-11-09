import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup
} from "firebase/auth";
import { app } from "../firebaseConfig";

const Login = () => {
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

export default Login;