import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import Link from "next/link";
import {HomeOutlined} from "@ant-design/icons";
import {outMetrics} from "../data/metrics";
import RecommendationMetricCard from "../components/cards/RecommendationMetricCard";
import {useState, useEffect} from "react";
import {outAudioFeaturesBank} from "../data/audio_features_bank";
import SimpleTrackCard from "../components/cards/SimpleTrackCard";

const Recommendations = () => {

    const [pickedMetrics, setPickedMetrics] = useState(['valence']);
    const [filteredTracks, setFilteredTracks] = useState([]);

    useEffect(() => {
        console.log(`PickedMetrics init: ${JSON.stringify(pickedMetrics)}`);
    }, []);

    const searchButtonLabel = "> Search";

    const renderMetricsToDisplay = () => {
        let toRet = "> ";
        if(pickedMetrics.length > 0) {
            for(let i = 0; i < pickedMetrics.length; i++) {
                if(i === 0){
                    toRet += pickedMetrics[i];
                } else {
                    toRet += " - " + pickedMetrics[i];
                }
            }
        } else {
            toRet += "[No Metrics Picked]";
        }
        return toRet;
    }

    const handlePickedMetricsState = (event, met) => {
        let currentState = pickedMetrics;
        if(currentState.includes(met)) {
            // if the picked met is already on the state
            let idx = currentState.indexOf(met);
            if(idx > -1) {
                currentState.splice(idx, 1);
            }
        } else {
            // if the picked met is not on the state
            currentState.push(met);
        }
        setPickedMetrics(currentState);
        console.log(`just picked ${met} metric - state updated!`);
        console.log(JSON.stringify(pickedMetrics));
        document.querySelector('#metrics-tag').innerHTML = renderMetricsToDisplay();
    }

    const findBestTracks = () => {
        let metToSearch = pickedMetrics;
        let sortedMetToSearch = [];
        for(let i=0; i<metToSearch.length; i++) {
            for(let j=0; j<outAudioFeaturesBank.length; j++) {
                console.log(`${metToSearch[i]}: ${outAudioFeaturesBank[j]['audio-features'][metToSearch[i]]}`);

            }
        }
        setFilteredTracks(sortedMetToSearch);
    }

    return (
        <div>
            <SimpleHeader />
            <div className="recommendations-container">
                <button className="custom-button">
                    <Link href="/">
                        <HomeOutlined />
                    </Link>
                </button>
                {/* RECOMMENDATION VIEW */}
                <hr />
                <h3>Select here the metrics you like to get recommendations !</h3>
                <div className="recommendation-metric-cards-container">
                    {
                        outMetrics.map((met) => {
                            return (
                                <div
                                    onClick={(e) => handlePickedMetricsState(e, met)}
                                    key={met}
                                >
                                    <RecommendationMetricCard
                                        label={met}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <hr />
                <h3>
                    You can find just below some tracks you may appreciate based on your preferences:
                </h3>
                <button
                    className="custom-button"
                    onClick={() => findBestTracks() }
                >
                    { searchButtonLabel }
                </button>
                <h4 id="metrics-tag"></h4>
                <div className="simple-track-cards-container">
                    <p>
                        {
                            JSON.stringify(filteredTracks)
                        }
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Recommendations;
