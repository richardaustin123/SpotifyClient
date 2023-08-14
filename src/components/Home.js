import React, { useEffect, useState } from 'react'

function Home({ access_token }) {

  /*
    This function gets the user's profile from the Spotify API and stores it in state
  */
  async function getUserProfile() {
    let endpoint = "https://api.spotify.com/v1/me"
    // Make the GET request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + access_token
      }
    })
    // Convert the data to JSON
    const data = await response.json()
    console.log(data)
    // Update the state
    setUserProfile(data)
  }

  /*
    This function gets the user's top songs or artists from the Spotify API and stores it in state
  */
  async function getTopThing(type) {
    let endpoint = `https://api.spotify.com/v1/me/top/${type}`
    // Make the GET request
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + access_token
      }
    })
    // Convert the data to JSON
    const data = await response.json()
    console.log(data)
    // Return the data
    return data
  }

  /*
    This function gets the user's top songs from the Spotify API and stores it in state
  */
  async function getTopSongs() {
    const data = await getTopThing('tracks')
    setTopSongs(data.items)
  }

  /*
    This function gets the user's top artists from the Spotify API and stores it in state
  */
  async function getTopArtists() {
    const data = await getTopThing('artists')
    setTopArtists(data.items)
  }

  // State variables
  let [userProfile, setUserProfile] = useState({})
  let [topSongs, setTopSongs] = useState([])
  let [topArtists, setTopArtists] = useState([])

  // Call the functions to get top songs and artists when the access token changes (page loaded)
  useEffect(() => {
    getUserProfile()
    getTopSongs()
    getTopArtists()
  }, [access_token])

  return (
    <div>
        <h1>Home</h1>
        {access_token ? 
          <h2>Personal feed</h2>
          // feed goes here
          :
          <h2>Log in plz</h2>
        }
    </div>
  )
}

export default Home