import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import {app} from "../config/firebaseConfig";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

export const googleSignUp = () => {
    let user = null;
    signInWithPopup(auth, googleProvider)
        .then((response) => {
            console.log(response);
            user = response.user;
        })
        .catch((err) => {
            console.error(err.code)
        });

    if(user != null) {
        return user;
    }
}

export const signOut = () => {
    getAuth(app).signOut()
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        })
    return {};
}