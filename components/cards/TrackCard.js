import MetricCard from "./MetricCard";
import Link from "next/link";

/**
 * Render a card track with the track's info and metric
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TrackCard = (props) => {
    const metricsLabel = ['valence', 'acousticness', 'liveness', 'speechiness', 'instrumentalness', 'energy', 'danceability'];
    return (
        <div className="track-card">
            <h3>
                {props.index}.&nbsp;
                <Link
                    href={`/track/${props.metrics.id}`}
                    state={{
                        metrics: props.metrics
                    }}
                >
                    {props.title}
                </Link>
            </h3>
            <img className="icon-url-img" src={props.icon_url} alt="Album icon" />
            <p>
                <span className="mini-title">Album:</span> &nbsp;
                 {props.album}
            </p>
            <p>
                <span className="mini-title">Duration: </span> &nbsp;
                 {new Date(props.duration).toISOString().slice(14, 19)} min
            </p>
            <p>
                <span className="mini-title">Tempo: </span> &nbsp;
                 {Math.floor(props.metrics['tempo'])} bpm</p>
            <p><span className="mini-title">Metrics:</span> &nbsp;</p>
            <div className="metrics-cards-container">
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
