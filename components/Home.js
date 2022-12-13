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
import TrackCard from "./TrackCard";
import Link from "next/link";
import { outTheWeekndAudioFeatures } from "../data/the_weeknd_audio_features";
import { outTracks } from "../data/tracks";

// instantiate new ChartJS Component
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

/**
 * Home component is called once the homepage is reached by the user
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = (props) => {
    // store data to fill chart
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [{
            data: []
        }]
    });

    /**
     *  When the page is loaded:
     *      - fetch all tracks ids from the props
     *      - fetch audio features for each The Weeknd track from database
     *      - create filled graphs
     */
    useEffect(() => {
        // create filled graphs
        // TODO: trash data for the moment but fetch it from state after
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

    /**
     * Allow to wait between each API request
     * @param ms
     * @returns {Promise<unknown>}
     */
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Reload audio features from the API (requires TOKEN)
     * TODO: form to get the token directly from a form and pass it as a parameter
     * @returns {Promise<void>}
     */
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

    /**
     * Return all audio-features for the given track id
     * @param trackId
     * @returns {*}
     */
    const getCorrespondingMetrics = (trackId) => {
        let toReturn = null;
        for(let i = 0; i < outTheWeekndAudioFeatures.length; i++) {
            if(outTheWeekndAudioFeatures[i]['id'] && (outTheWeekndAudioFeatures[i]['id'] == trackId)) {
                toReturn = outTheWeekndAudioFeatures[i];
                return toReturn;
            }
        }
    }

    const sortOutTracks = () => {
        outTracks.sort(function(first, second) {
            return first.index - second.index;
        });
        return outTracks;
    }

    return (
        <div>
            <h1>Welcome {props.dpName}</h1>
            <div style={{
               display: "flex"
            }}>
                <button className="custom-button">
                    <Link href="/metricsDescription">
                        Metrics description page
                    </Link>
                </button>
                <button className="custom-button" onClick={ () => refetchAudioFeatures() }>Fetch tracks features</button>
            </div>
            <h2>Setlist tracks:</h2>
            <section id="track-cards-container">
                {
                    sortOutTracks().map(track => {
                        return (
                            <TrackCard
                                key={ track.title }
                                title={ track.title }
                                duration={ track.duration_ms }
                                album={ track.album }
                                icon_url={ track.icon_url }
                                index={ track.index }
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
            </section>
        </div>
    )
}

export default Home;
