const TrackCard = (props) => {
    return (
        <div className="track-card-container">
            <h3>{props.index}. {props.title}</h3>
            <p>{((props.duration/1000)/60).toFixed(2)} min</p>
            <p>Album: {props.album}</p>
            <img src={props.icon_url} alt="Album icon"></img>
        </div>
    )
}

export default TrackCard;