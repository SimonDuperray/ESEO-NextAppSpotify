import {useEffect, useState, useId} from "react";
import {doc, setDoc, getDocs, getFirestore, collection} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import TrackCard from "./cards/TrackCard";
import { outMetrics } from "../data/metrics";
import { Line } from 'react-chartjs-2';

// instantiate new ChartJS Component
ChartJS.register(
    LineElement,
    PointElement,
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
    const [spotifyToken, setSpotifyToken] = useState('');

    const outTheWeekndAudioFeatures = props.twadProps;
    const outTracks = props.tracksProps;

    const id = useId();

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
        if(spotifyToken) {
            const stoken = spotifyToken;
        } else {
            alert("You still not provided your Spotify token");
        }

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
        setSpotifyToken('');
        alert('For confidential reasons, your token has been deleted. You have to regenerate a new one to refetch data again.');
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
            if(outTheWeekndAudioFeatures[i]['id'] && (outTheWeekndAudioFeatures[i]['id'] === trackId)) {
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

    const provideToken = () => {
        let token = prompt("Please enter your Spotify Token");
        setSpotifyToken(token);
        window.localStorage.setItem('spotifyToken', token);
        alert('Your token has been successfully stored!');
    }

    const dpNameFromLocal = window.localStorage.getItem('dpName');

    const colors = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(201, 203, 207, 1)'
    ]

    const buildDatasetsWithoutTempo = () => {
        let dts = [];
        for(let i=0; i<outMetrics.length; i++) {
            if(outMetrics[i] !== "tempo" && outMetrics[i] !== "loudness") {
                let mets = [];
                for(let j=0; j<outTheWeekndAudioFeatures.length; j++) {
                    mets.push(outTheWeekndAudioFeatures[j][outMetrics[i]]);
                }
                dts.push({
                    label: outMetrics[i],
                    data: mets,
                    fill: false,
                    borderColor: colors[i],
                    tension: 0.1
                });
            }
        }
        return dts;
    }

    const buildDatasetTempo = () => {
        let tempod = [];

        for(let j=0; j<outTheWeekndAudioFeatures.length; j++){
            tempod.push(outTheWeekndAudioFeatures[j]['tempo']);
        }

        return [{
            label: 'Tempo',
            data: tempod,
            fill: false,
            borderColor: colors[0],
            tension: 0.1
        }];
    }

    const lineChartDataWithoutTempo = {
        labels: [...Array(30).keys()],
        datasets: buildDatasetsWithoutTempo()
    };

    const lineChartDataWithTempo = {
        labels: [...Array(30).keys()],
        datasets: buildDatasetTempo()
    };

    return (
        <div>
            <h1>Welcome { dpNameFromLocal } !</h1>
            <h5>Reload data:</h5>
            <div style={{
                display: "flex"
            }}>
                <button
                    className="custom-button"
                    onClick={() => provideToken()}
                >
                    Provide Spotify Token
                </button>
                <button disabled={true} className="custom-button" onClick={ () => refetchAudioFeatures() }>Fetch tracks features</button>
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
                <h2>Setlist metrics evolution through the concert</h2>
                <p>The following graph represents the evolution of each metric through the concert.</p>
                <p>You can click on the metric you want to remove it from the graph.</p>
                <div className="graph-container">
                    <Line
                        data={ lineChartDataWithoutTempo }
                    />
                </div>
                <div
                    className="graph-container"
                    id="tempo-graph"
                >
                    <Line
                        data={ lineChartDataWithTempo }
                    />
                </div>
            </section>
        </div>
    )
}

export default Home;
