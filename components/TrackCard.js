import MetricCard from "./MetricCard";
import {Image} from "antd";

/**
 * Render a card track with the track's info and metric
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TrackCard = (props) => {
    const metricsLabel = ['valence', 'acousticness', 'liveness', 'speechiness', 'instrumentalness', 'energy', 'danceability'];
    return (
        <div className="track-card-container">
            <h3>
                {props.index}. {props.title} &nbsp;
                <Image src={props.icon_url} alt="Album icon" />
            </h3>
            <p>Album: {props.album} - Duration: {((props.duration/1000)/60).toFixed(2)} min</p>
            <p>Tempo: {props.metrics['tempo']}</p>
            <div className="metrics-card-container">
                {
                    metricsLabel.map(label => {
                        return (
                            <MetricCard
                                key={props.metrics[label]['id']}
                                metricLabel={label}
                                metricValue={props.metrics[label]}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TrackCard;
