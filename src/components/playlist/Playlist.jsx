import React from 'react'
import './Playlist.css';
import Tracklist from '../tracklist/Tracklist.jsx'

function Playlist({ playlistTracks,
  onRemoveTrack,
  playListName,
  setPlayListName,
  onSavePlaylist
}) {

  function handlePlaylistName(event) {
    setPlayListName(event.target.value);
  }

  function handleSavePlaylist() {
    onSavePlaylist();
  }

  return (
    <div className="Playlist">
      <input
        value={playListName}
        onChange={handlePlaylistName}
      />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist
        listResults={playlistTracks}
        remove={true}
        onRemoveTrack={onRemoveTrack}
      />
      <button className="Playlist-save" onClick={handleSavePlaylist}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}

export default Playlist
