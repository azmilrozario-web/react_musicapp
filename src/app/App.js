import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';

function App() {


  // "Create a piece of memory called data, start it as an empty array, and give me a function called setData that can change it."
  // Manage the application's data (state hooks)
  const [data, setData] = useState([]);                  // constant for us to search for track, album or artist
  const [searchResults, setSearchResults] = useState([]); // constant stores the search results
  const [playListTracks, setPlayListTracks] = useState([]); // constant stores the playlist of added tracks
  const [searchTerm, setSearchTerm] = useState("");       // constant stores the user searched term
  const [playListName, setPlayListName] = useState("New Playlist");   // constant stores the title of the playlist
  const [saveStatus, setSaveStatus] = useState(false); // constant stores the status of the playlist save action

  // Preparing the data to be used by the application
  // Once the component is mounted, we want to set the mock data for search results and playlist tracks
  useEffect(() => {
    // Set the mock data 
    setData(
      [
        {
          id: 1,
          name: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          uri: "spotify:track:0VjIjWp9m6pZpXpLup3mDs"
        },
        {
          id: 2,
          name: "Save Your Tears",
          artist: "The Weeknd",
          album: "After Hours",
          uri: "spotify:track:5Yy9m6pZpXpLup3mDs0VjI"
        },
        {
          id: 3,
          name: "Anti-Hero",
          artist: "Taylor Swift",
          album: "Midnights",
          uri: "spotify:track:0VjIjWp9m6pZpXpLup3mDs"
        },
        {
          id: 4,
          name: "Shake It Off",
          artist: "Taylor Swift",
          album: "1989",
          uri: "spotify:track:39Yp9m6pZpXpLup3mDs0VjI"
        },
        {
          id: 5,
          name: "Cruel Summer",
          artist: "Taylor Swift",
          album: "Lover",
          uri: "spotify:track:1Bpv9m6pZpXpLup3mDs0VjI"
        },
        {
          id: 6,
          name: "Flowers",
          artist: "Miley Cyrus",
          album: "Endless Summer Vacation",
          uri: "spotify:track:0y9u89S9pE9pXpLup3mDs"
        },
        {
          id: 7,
          name: "Levitating",
          artist: "Dua Lipa",
          album: "Future Nostalgia",
          uri: "spotify:track:4D76S8bWy3dY9pXpLup3mDs"
        },
        {
          id: 8,
          name: "Don't Start Now",
          artist: "Dua Lipa",
          album: "Future Nostalgia",
          uri: "spotify:track:6PjdY0CKqYf44v9pXpLup3"
        },
        {
          id: 9,
          name: "As It Was",
          artist: "Harry Styles",
          album: "Harry's House",
          uri: "spotify:track:0UweKu2_2eK3P3pXpLup3m"
        },
        {
          id: 10,
          name: "Watermelon Sugar",
          artist: "Harry Styles",
          album: "Fine Line",
          uri: "spotify:track:4Zp9m6pZpXpLup3mDs0VjI"
        }
      ]
    );
  }, []);


  // Handle search requests
  function onSearchTerm(term) {
    //1. find the search term against the data state hook
    //2. Inject the results to searchResults state hook
    //3. Search term: "Lights" will be searched against each object (element) name, artist, album

    const lowerCaseTerm = term.toLowerCase();

    const results = data.filter(element =>
      String(element["name"]).toLowerCase().includes(lowerCaseTerm) ||
      String(element["artist"]).toLowerCase().includes(lowerCaseTerm) ||
      String(element["album"]).toLowerCase().includes(lowerCaseTerm)
    );

    if (!results.length || term === "")
      return setSearchResults([{


        id: 0,
        name: "No results found",
        artist: "--",
        album: "--",
        uri: "--"
      }]);

    setSearchResults(results);

  }

  // Handle adding a track to playListTracks
  function onAddTrack(track) {

    // set the condition that the same song cannot be added twice
    const foundTrack = playListTracks.find(currentTrack => currentTrack.id === track.id);

    if (!foundTrack && track.name !== "No result found")
      setPlayListTracks([...playListTracks, track]);
  }

  // Handle removal of a track from playListTracks
  function onRemoveTrack(track) {


    // set the condition that the same song cannot be added twice
    const foundTrack = playListTracks.find(currentTrack => currentTrack.id === track.id);

    if (foundTrack)
      setPlayListTracks(playListTracks.filter(currentTrack => currentTrack.id !== track.id));

  }


  function onSavePlaylist() {

    const localStorage = window.localStorage;
    localStorage.setItem("playlistName", JSON.stringify(playListTracks));

    alert("Playlist saved to local storage!");
    setSearchTerm("");
    setPlayListTracks([]);
    setSearchResults([]);
    setPlayListName("New Playlist");
    setSaveStatus(true);

  }

  return (
      <div className="">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchTerm={onSearchTerm}
          saveStatus={saveStatus}
          setSaveStatus={setSaveStatus}
        />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults
            searchResults={searchResults}
            onAddTrack={onAddTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistTracks={playListTracks}
            onRemoveTrack={onRemoveTrack}
            playListName={playListName}
            setPlayListName={setPlayListName}
            onSavePlaylist={onSavePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
