const Home = (props) => {
    return (
        <div>
            <h1>Welcome {props.dpName}</h1>
            <h2>Artists:</h2>
            <ul>
                {
                    props.artists.map(artist => {
                        return (
                            <li key={artist.name}>{artist.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Home;