import {useEffect, useState} from "react";
import {doc, setDoc, getDocs, getFirestore, collection} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import MetricsAnalyzer from "./MetricsAnalyzer";
import TrackCard from "./TrackCard";

const Home = (props) => {

    const [tracksId, setTracksId] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);

    useEffect((fieldPath, options) => {
        // get tracks id
        let tracks_id = [];
        for (let i=0; i < Object.values(props.tracks).length; i++) {
            tracks_id.push(Object.values(props.tracks)[i]['id'])
        }
        setTracksId(tracks_id);
        console.log("> Tracks ids successfully stored in state!");

        // fetch audio-features
        const fetchAudioFeatures = async () => {
            let audioFeaturesList = [];
            const querySnapshot = await getDocs(collection(getFirestore(app), "the_weeknd_audio_features"));
            querySnapshot.forEach((audio_features) => {
                audioFeaturesList.push(audio_features.data());
                console.log(audio_features.data())
            });
            setAudioFeatures(audioFeaturesList);
            console.log("> All audio features have correctly been fetched from database.");
        };

        fetchAudioFeatures()
            .catch((err) => {
                console.log(err);
            })

    }, []);

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const refetchAudioFeatures = async () => {
        const TOKEN = "BQCcQW6UqlutdkosoFYRFAsCMIOmbccuU05k7VmgEeJu6rMT2d9mSauXmZQkThRnzRBStZbNN9g2uLl3Sr2w5cDdqfeLzwV9laFOyLUGiSP4MHaeAKJ_09S2hzyDvi_BjS7Us_l_n10hQLzavMss7w8iTGjER_wZAlkSKp1mgtmDl7oYmvZusLo";

        // go through these ids and send request
        for (let j = 0; j < tracksId.length; j++) {
            let response = await fetch(`https://api.spotify.com/v1/audio-features/${tracksId[j]}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                }
            });
            let data = await response.json();
            await setDoc(doc(getFirestore(app), "the_weeknd_audio_features", tracksId[j]), data);
            console.log("> Data added to the database");
            await sleep(5000);
        }
    }

    return (
        <div>
            <h1>Welcome {props.dpName}</h1>
            <h2>Setlist tracks:</h2>
            <button onClick={() => refetchAudioFeatures()}>Fetch tracks features</button>
            <section id="track_cards_container">
                {
                    props.tracks.map(track => {
                        return (
                            <TrackCard
                                key={track.title}
                                title={track.title}
                                duration={track.duration_ms}
                                album={track.album}
                                icon_url={track.icon_url}
                                index={track.index}
                            />
                        )
                    })
                }
            </section>
            <section id="ana_metrics">
                <h2>Metrics Analyzer:</h2>
                <MetricsAnalyzer metrics={audioFeatures} />
            </section>
        </div>
    )
}

export default Home;
