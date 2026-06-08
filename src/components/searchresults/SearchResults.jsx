import React from 'react'
import TrackList from '../tracklist/Tracklist'
import './SearchResults.css'

function SearchResults({searchResults, onAddTrack}) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {/* Display the results in the form of a list */}
      <TrackList
        listResults = {searchResults}
        remove = {false}
        onAddTrack = {onAddTrack}
      />
    </div>
  )
}

export default SearchResults