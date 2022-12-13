import { outTracks } from "../../data/tracks";
import { outTheWeekndAudioFeatures } from "../../data/the_weeknd_audio_features";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import SimpleHeader from "../../components/SimpleHeader";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export const getStaticPaths = () => {
    const paths = outTracks.map(track => {
        return {
            params: {
                id: track.id.toString()
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = (context) => {
    const id = context.params.id;
    let track = null;
    for(let i=0; i<outTracks.length; i++) {
        if(outTracks[i].id == id){
            track = outTracks[i];
            break;
        }
    }
    return {
        props: { track }
    }
}

const TrackDetails = ({ track }) => {

    const [detailsMetrics, setDetailsMetrics] = useState({
        labels: [],
        datasets: [{
            data: []
        }]
    });

    const getAudioFeaturesById = (id) => {
        let toRet = null;
        for(let i=0; i<outTheWeekndAudioFeatures.length; i++) {
            if(outTheWeekndAudioFeatures[i]['id'] && outTheWeekndAudioFeatures[i]['id'] == id){
                toRet = outTheWeekndAudioFeatures[i];
                break;
            }
        }
        return toRet;
    }

    useEffect(() => {
        let audioFeatures = getAudioFeaturesById(track.id);
        let data = {
            labels: [
                "acousticness", "danceability", "energy", "instrumentalness",
                "liveness", "speechiness", "valence"
            ],
            datasets: [{
                label: `Metrics Evaluation for track: ${track.title}`,
                data: [
                    audioFeatures['acousticness'],
                    audioFeatures['danceability'],
                    audioFeatures['energy'],
                    audioFeatures['instrumentalness'],
                    audioFeatures['liveness'],
                    audioFeatures['speechiness'],
                    audioFeatures['valence']
                ],
                backgroundColor: "rgba(255, 255, 255, .2)",
                borderColor: "rgba(255, 255, 255, 1)",
                borderWidth: 1,
                fill: true
            }]
        }
        setDetailsMetrics(data);
    }, []);

    return (
        <div>
            <SimpleHeader />
            <div>
                <h1>{track.title}</h1>
                <button className="custom-button">
                    <Link href="/">
                        Back to homepage
                    </Link>
                </button>
                <div className="graph-container">
                    <Bar
                        data={ detailsMetrics }
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    ticks: {
                                        color: 'white',
                                        beginAtZero: true
                                    },
                                    grid: {
                                        color: 'gray'
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: 'white',
                                        beginAtZero: true
                                    },
                                    grid: {
                                        color: 'gray'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TrackDetails;
