import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import Link from "next/link";
import {HomeOutlined} from "@ant-design/icons";
import {outMetrics} from "../data/metrics";
import RecommendationMetricCard from "../components/cards/RecommendationMetricCard";
import {useState} from "react";

const recommendations = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [pickedMetrics, setPickedMetrics] = useState([]);

    const handlePickedMetricsState = (event, met) => {
        console.log(`just picked ${met} metric!`);
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
                                    <RecommendationMetricCard label={met}/>
                                </div>
                            )
                        })
                    }
                </div>
                <hr />
                <h3>According to your preferences, here are the tracks you may appreciate:</h3>
            </div>
            <Footer />
        </div>
    );
};

export default recommendations;
