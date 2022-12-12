import {collection, getDocs, getFirestore} from "firebase/firestore";
import {app} from "../config/firebaseConfig";
import {the_weeknd_audio_features} from "../data/the_weeknd_audio_features";

const fetchData = async () => {
    console.log('USE EFFECT TRIGGERED!!!!!!!!!!!!!!')
    // get tracks
    let tr = [];
    const querySnapshot = await getDocs(collection(getFirestore(app), "tracks"));
    querySnapshot.forEach((doc) => {
        tr.push(doc.data());
    })
    await setTracksList(tr);
    console.log(`tracks list stored: ${tracksList}`);

    // get ids
    let tracks_id = [];
    for (let i=0; i < Object.values(props.tracks).length; i++) {
        tracks_id.push(Object.values(props.tracks)[i]['id'])
    }
    await setTracksId(tracks_id);
    console.log(`tracks ids stored: ${tracksId}`);

    // fetch audio features
    let audioFeaturesList = [];
    const querySnapshot2 = await getDocs(collection(getFirestore(app), "the_weeknd_audio_features"));
    querySnapshot2.forEach((audio_features) => {
        audioFeaturesList.push(audio_features.data());
    });
    await setAudioFeatures(audioFeaturesList);
    console.log(`audio features stored: ${the_weeknd_audio_features}`);
}

fetchData()
    .catch((err) => {
        console.error(err);
    });