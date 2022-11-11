import Link from "next/link";

const ArtistCard = (props) => {
    return (
        <div className="card-container">
            <Link href={props.href}>
                <p className="artist-name">{props.name}</p>
            </Link>
            <p>Nb followers: {props.nb_followers}</p>
            <p>Popularity: {props.popularity}</p>
        </div>
    )
};

export default ArtistCard;
