import { albums } from "../../data/albums";
import Link from "next/link";

export const getStaticPaths = () => {
    const paths = albums.map(repo => {
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
    let album = null;

    for(let i=0; i<albums.length; i++) {
        if(albums[i].id==id){
            album =albums[i];
            break;
        }
    }
    return {
        props: { album }
    }
}

const ArtistDetails = ({ album }) => {
    return (
        <main>
            <header>
                <button><Link href="/">Home</Link></button>
            </header>
            <h1>{album.name}</h1>
        </main>
    )
}

export default ArtistDetails;