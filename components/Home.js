import ArtistCard from "./Artist/ArtistCard";

const Home = (props) => {
    return (
        <div>
            <h1>Welcome {props.dpName}</h1>
            <h2>Artists:</h2>
            <div className="artist-cards-container">
                {
                    props.artists.map(artist => {
                        return (
                            <ArtistCard
                                key={artist.href}
                                href={artist.href}
                                name={artist.name}
                                nb_followers={artist.nb_followers}
                                popularity={artist.popularity}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;
