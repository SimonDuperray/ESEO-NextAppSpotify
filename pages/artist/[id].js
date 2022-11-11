import { artists } from "../../data/artists";

export const getStaticPaths = () => {
    const paths = artists.map(repo => {
        return {
            params: {
                id: repo.id.toString()
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = (context) => {
    const id = context.params.id;
    let artist = null;

    for(let i=0; i<artists.length; i++) {
        if(artists[i].id==id){
            artist =artists[i];
            break;
        }
    }
    return {
        props: { artist }
    }
}

const ArtistDetails = ({ artist }) => {
    return (
        <div>
            <h1>{artist.name}</h1>
        </div>
    )
}

export default ArtistDetails;