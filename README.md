# The Weeknd Show's Setlist Analyze

# Context
The Weekn'd has announced some show dates in France next year. Since the setlist is available, we wondered how to analyze the tracks based on metrics provided by the Spotify API. 
Hopefully, our React class final exam requires to develop a web app using ReactJS & NextJS, so we decided to build this app around this problem because this project covers all the requirements of the class.

# Features - User Experience
If the current user is not connected, he will stay on a single page which only provides a login button. This button allows the user to sign in using its Google account. This is provided by Firebase Authentication services.

Once the user is signed in, he will be redirected on the homepage. Here, some features are proposed. Each track of the setlist is displayed as a custom card. On this, are displayed some info concerning the current track and some metrics cards for each metric (red for low level metric - orange for mid level - green for good level) are also displayed. All the cards are sorted chronologically to easily see the evolution of each metric through the concert.
You also can click on the title of each track and you will be redirected to a dynamic URL page proposing a more precise view of metrics value. Indeed, all these values are displayed on a bar graph so it is comfortable to visualize data.

Below the setlist tracks cards, are displayed 2 line charts. These graphs represent the evolution of each metric through time:
- the first graph shows all the metrics which are evaluate between 0 and 1
- the second graph shows the evolution of the tempo through time too

If the user is still signed in, a custom navbar contains few links to navigate through the app and to discover few features.

The navbar element 'Metrics Description' redirects the current user to another URL page proposing some cards which concisely explaining all of the metrics presented on the homepage.
Another navbar element is the recommendation one.

Once you correctly have been redirected to the recommendation page, you will be able to pick one or more metric you like. A simple recommendation algorithm will propose you some tracks you may like from your preferences. All the proposed tracks come from the Spotify Playlist 'Les Hits du Moment'.
Be careful, you will have to click on the search button to actualise the recommended tracks. If you want to remember of some tracks, you just have to click on the 'Export recommendation' button. This features will propose you to download a text file which contains your parsed recommended tracks.

Then, the about page briefly presents the project and our team.

The data may be changed by Spotify accross the year, to a feature available on the homepage allows you to refresh the database with updated value from API. For this, click on the 'Provide Spotify Token' button, this will open an alert box asking you for your Spotify Token. Once you will have enter it, you will can click on 'Refresh Database'

## How we built it ?
### Get all the tracks IDs
The Firestore Database stores all the tracks ids with the corresponding track's name. All these ids are directly provided by Spotify. To get it, you just have to get the share link to the track you want. It follows this pattern:
```
https://open.spotify.com/track/2Ghp894n1laIf2w98VeAOJ?si=d01ee74007e84fc8
```

So, the id is:
```
2Ghp894n1laIf2w98VeAOJ
```

By now, it is easy to manually get all the ids of the setlist and to store them in the Firestore Database.

### Fetch all tracks features
The app will fetch all IDs from the Firestore Database and a personal Spotify token to fetch the Spotify API endpoint:
```
/audio-features/{id}
```

This request returns data following the pattern:
```
{
  "danceability": 0.805,
  "energy": 0.498,
  "key": 7,
  "loudness": -7.927,
  "mode": 0,
  "speechiness": 0.0737,
  "acousticness": 0.0203,
  "instrumentalness": 0.0000237,
  "liveness": 0.085,
  "valence": 0.636,
  "tempo": 121.006,
  "type": "audio_features",
  "id": "2Ghp894n1laIf2w98VeAOJ",
  "uri": "spotify:track:2Ghp894n1laIf2w98VeAOJ",
  "track_href": "https://api.spotify.com/v1/tracks/2Ghp894n1laIf2w98VeAOJ",
  "analysis_url": "https://api.spotify.com/v1/audio-analysis/2Ghp894n1laIf2w98VeAOJ",
  "duration_ms": 214215,
  "time_signature": 4
}
```

Once all the data have been fetched, they are stored into the Firestore Database. 
Any user will not have the privileges to update these values.

## Run the app
### Access locally
```bash
$ git clone https://github.com/SimonDuperray/ESEO-NextAppSpotify.git
$ cd ESEO-NextAppSpotify
$ yarn dev
```

### Access online
```
Not deployed yet
```
