import MetricCard from "./MetricCard";

const TrackCard = (props) => {
    const metricsLabel = ['valence', 'acousticness', 'tempo', 'speechiness', 'loudness', 'liveness', 'instrumentalness', 'energy', 'danceability'];
    return (
        <div className="track-card-container">
            <h3>
                {props.index}. {props.title} &nbsp;
                <img src={props.icon_url} alt="Album icon"></img>
            </h3>
            <p>Album: {props.album} - Duration: {((props.duration/1000)/60).toFixed(2)} min</p>
            <div className="metrics-card-container">
                {/*{*/}
                {/*    metricsLabel.map(label => {*/}
                {/*        return (*/}
                {/*            <MetricCard*/}
                {/*                key={props.metrics[label]['id']}*/}
                {/*                metricLabel={label}*/}
                {/*                metricValue={props.metrics[label]}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </div>
        </div>
    )
}

export default TrackCard;
