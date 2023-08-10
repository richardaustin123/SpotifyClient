import React from 'react'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import config from '../config.json'

//bootstrap
import Form from 'react-bootstrap/Form'

// TEST ID: 1Ffb6ejR6Fe5IamqA5oRUF, 630wzNP2OL7fl4Xl0GnMWq

function Artist() {

  // Information
  let endpoint = 'https://api.spotify.com/v1/artists/'
  
  let [artist, setArtist] = useState('')
  let [artistInfo, setArtistInfo] = useState([])

  function getArtistIDFromName() {
    // Get the artist from spotify API
    fetch('https://api.spotify.com/v1/search?q=' + artist + '&type=artist', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + config.access_token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      getArtist(data.artists.items[0].id)
    })
    .catch(error => {
      console.log(error)
    })
  }

  function getArtist(id) {
    // Get the artist from spotify API
    fetch(endpoint + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + config.access_token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setArtistInfo(data)
    })
    .catch(error => {
      console.log(error)
    })

  }

  return (
    <div>

      <h1>Search Artist</h1>
      <Form.Control type="text" placeholder="Search Artist" onChange={(e) => setArtist(e.target.value)} />
      <Button onClick={getArtistIDFromName}>Click me</Button>
      

      {artistInfo.length !== 0 &&
        <div>
          <h1>{artistInfo.name}</h1>
          <img src={artistInfo.images[1].url} alt="artist" />
          <p>Followers: {artistInfo.followers.total}</p>
          <p>Popularity: {artistInfo.popularity}</p>
          <p>Genres:</p>
          {artistInfo.genres.map((genre, index) => {
            return <p key={index}>{genre}</p>
          }
          )}
        </div>
      }

    </div>
  )
}

export default Artist

