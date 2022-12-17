import SimpleHeader from "../components/SimpleHeader";
import Footer from "../components/Footer";
import DeveloperCard from "../components/cards/DeveloperCard";

const About = () => {
    const devs = [
        {
            name: "Caroline AUGER",
            linkedinHref: "https://www.linkedin.com/in/carolineauger44/",
            class: "E5E LD - ESEO"
        },
        {
            name: "Simon DUPERRAY",
            linkedinHref: "https://www.linkedin.com/in/simon-duperray/",
            class: "E5E LD - ESEO"
        }
    ]
    return (
        <div>
            <SimpleHeader />
            <div className="about-container">
                <h2>Context</h2>
                <p>
                    Our React JS class proposes us to develop a web app following certain constraints:
                    <ul>
                        <li>The app has to be developed with ReactJS framework</li>
                        <li>Use a graphics library</li>
                        <li>Propose Authentication from Firebase Authentication</li>
                        <li>Use Firestore as database</li>
                        <li>Be hosted on Firebase Hosting</li>
                        <li>Fetch at least one API</li>
                        <li>Propose some graphical representations of data</li>
                    </ul>
                </p>
                <h2>Our idea</h2>
                <p>
                    This web app aims to propose a detailled analysis of The Weeknd fresh new tour: After Hours Til Dawn.
                </p>
                <p>img</p>
                <p>
                    The Spotify API provides some informations about tracks. So it is easy to fetch these data with a secret token. The tracks informations are stored into a Firestore Database and we fetch it to graphically represent data.
                    For example, you will can see the evolution of the acoustic behavior of each tracks through the concert.
                    Furthermore, for each track you will see the evaluatation of each metric provided by Spotify.
                </p>
                <p>This app is also able to recommend you some tracks based on your prefered metrics. So, you can pick the metrics you like, and the app will display the track you may like.</p>
                <h2>The team</h2>
                <div className="devs-cards-container">
                    {
                        devs.map((dev) => {
                            return (
                                <DeveloperCard
                                    key={dev.name}
                                    name={dev.name}
                                    linkedinHref={dev.linkedinHref}
                                    class={dev.class}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
