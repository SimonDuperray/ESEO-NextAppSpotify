# The Weeknd Show's Setlist Analyze

## Description
This project aims to analyze the setlist of The Weeknd's show.

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

### User Experience

If the user is not signed in, the homepage will be displayed with a button to sign in with Google.
When the user is signed in, all the setlist's tracks banners will be shown.
Each banner is composed of the track's:
- icon/image
- title
- album
- duration (in s)

Under this track's details section, another one will use the metrics provided by the previously used API endpoint and analyze it graphically.

Some graphs will represent 'danceability', 'energy', 'speechiness' or even 'instrumentalness' metrics for each song. A podium for each metric will be proposed to get the more 'liveness' or 'acousticness' track of the setlist.

NOTE: More details will be provided here later.

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

## ToDo
- fetch data from the dabase (not locally)
- bubble/line chart for main analysis
- recommendation from Trend Songs metrics
- form token spotify to refetch data
- deal with useEffect, useState and asynchronous requests
