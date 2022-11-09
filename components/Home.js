import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getAuth } from "firebase/auth";

const Home = () => {
    const signOut = () => {
        getAuth().signOut()
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <Link href="/">Spotify Analytics App!</Link>
                </h1>

                <button onClick={ signOut }>Sign Out</button>

                <p className={styles.description}>
                    Get started by <Link href="/login" style={{textDecoration: "underline"}}>login you</Link>.
                </p>

            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/SimonDuperray/ESEO-NextAppSpotify"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © AUGER Caroline - DUPERRAY Simon
                </a>
            </footer>
        </div>
    )
}

export default Home;