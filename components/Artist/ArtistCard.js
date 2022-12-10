import Link from "next/link";
import { LikeFilled, LikeOutlined} from "@ant-design/icons";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {app} from "../../config/firebaseConfig";
import {useEffect, useState} from "react";

const ArtistCard = (props) => {

    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const fetchLikes = async () => {
            let likes = [];
            const querySnapshot = await getDocs(collection(getFirestore(app), "likes"));
            querySnapshot.forEach((doc) => {
                likes.push(doc.data());
            });
            setLikes(likes);

            likes.forEach((like) => {
                console.log(like);
            })
        }
        fetchLikes()
            .catch((err) => {
                console.error(err);
            })
    }, []);

    const renderLikeBtn = () => {
        let uid = props.uid;
        let isLikeFilled = false;
        likes.forEach((like) => {
           if(like['user_id']===uid){
               like['liked_artists'].forEach((liked_artist) => {
                   console.log(liked_artist, props.id);
                   if(liked_artist==props.id){
                       isLikeFilled = true;
                   }
               })
           }
        });
        if(!uid) {
            return (
                <LikeFilled />
            )
        } else {
            return (
                <LikeOutlined />
            )
        }
    }
    const handleLikeBtn = () => {
        console.log("Toggle like button status. In progress...")
    }
    return (
        <div className="card-container">
            <Link href={props.href}>
                <p className="artist-name">{props.name}</p>
            </Link>
            <div onClick={ handleLikeBtn() }>
                { renderLikeBtn() }
            </div>
            <p>Nb followers: {props.nb_followers}</p>
            <p>Popularity: {props.popularity}</p>
        </div>
    )
};

export default ArtistCard;
