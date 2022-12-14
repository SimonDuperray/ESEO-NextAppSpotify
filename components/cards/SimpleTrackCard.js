import Link from "next/link";

const SimpleTrackCard = (props) => {
    return (
        <div className="simple-track-card">
            <p className="simple-track-card-title">{props.title}</p>
            <p>by {props.artist}</p>
        </div>
    );
};

export default SimpleTrackCard;
