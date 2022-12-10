import ArtistCard from "./Artist/ArtistCard";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../config/firebaseConfig";

const Home = (props) => {

    const reloadDb = async () => {
        const artists_ids = ["63MQldklfxkjYDoUE4Tppz", "2UwqpfQtNuhBwviIC0f2ie", "3QVolfxko2UyCOtexhVTli", "1dfeR4HaWDbWqFHLkxsg1d"];
        const albums_ids = ["63MQldklfxkjYDoUE4Tppz", "4FpJcNgOvIpSBeJgRg3OfN", "2UwqpfQtNuhBwviIC0f2ie"];

        let artists_ids_string = ""
        artists_ids.map(artist => {
            artists_ids_string+=artist+"%"
        });
        let albums_ids_string = ""
        albums_ids.map(album => {
            albums_ids_string+=album+"%"
        });



        const artistData = {
            "genres": ["french rap", "variete francaise"],
            "href": "https://www.github.com/SimonDuperray",
            "image_url": "https://www.github.com/SimonDuperray",
            "name": "Moi",
            "nb_followers": 12434,
            "popularity": 12
        }
        //await setDoc(doc(getFirestore(app), "artists", "grhsejgvherjhejvhbej"), artistData);
    }

    const addLike = (e) => {

    }
    const removeLike = (e) => {

    }
    return (
        <div>
            <h1>Welcome {props.dpName}</h1>
            <button onClick={ reloadDb }>Reload database</button>
            <h2>Artists:</h2>
            <div className="artist-cards-container">
                {
                    props.artists.map(artist => {
                        return (
                            <ArtistCard
                                key={artist.href}
                                id={artist.id}
                                href={artist.href}
                                name={artist.name}
                                nb_followers={artist.nb_followers}
                                popularity={artist.popularity}
                                liked={artist.liked}
                                uid={props.uid}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;
