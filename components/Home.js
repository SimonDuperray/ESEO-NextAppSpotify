import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../config/firebaseConfig";

const Home = (props) => {
    return (
        <div>
            <h1>Welcome {props.dpName}</h1>
            <h2>Setlist tracks:</h2>
            <div>
                <ul>
                    {
                        props.tracks.map(track => {
                            return (
                                <li key={track.title}>{track.title}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Home;
