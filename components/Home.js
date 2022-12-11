import {useEffect, useState} from "react";
import {doc, setDoc, getDocs, getFirestore, collection} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TrackCard from "./TrackCard";
import Link from "next/link";
import {theWeekndAudioFeatures} from "../data/the_weeknd_audio_features-1670683376";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Home = (props) => {

    const [tracksId, setTracksId] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [{
            data: []
        }]
    });

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
            });
            setAudioFeatures(audioFeaturesList);
            console.log(JSON.stringify(audioFeaturesList));
            console.log("> All audio features have correctly been fetched from database.");
        };
         fetchAudioFeatures()
             .catch((err) => {
                 console.log(err);
             })

        let data = {
            labels: ['un', 'deux', 'trois'],
            datasets: [{
                label: 'Metrics evaluation',
                data: [1, 2, 3]
            }]
        };
        setBarData(data);
        console.log(`barData: ${barData}`)

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

    // TODO: Caroline - compute average values for each metric and create bar graph to render data
    const dataChart = {
        labels: ['energy', 'danceability'],
        datasets: [
            {
                label: '12',
                data: [1, 2],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    };
    const optionsChart = {};

    const getCorrespondingMetrics = (trackId) => {
        let toReturn = null;
        for(let i = 0; i < audioFeatures.length; i++) {
            if(audioFeatures[i]['id'] && (audioFeatures[i]['id'] == trackId)) {
                toReturn = audioFeatures[i];
                return toReturn;
            }
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
                                metrics={ getCorrespondingMetrics(track.id) }
                            />
                        )
                    })
                }
            </section>
            <section id="ana_metrics">
                <button>
                    <Link href="/metricsDescription">Metrics description</Link>
                </button>
                <Bar
                    data={dataChart}
                    options={optionsChart}
                ></Bar>
                <h2>Metrics Analyzer:</h2>
                {
                    audioFeatures.map((audiof) => {
                        return (
                            <p key={audiof['index']}>{audiof['danceability']}</p>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default Home;
