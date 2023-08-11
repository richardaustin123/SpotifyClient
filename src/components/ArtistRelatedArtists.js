import React from 'react'
import { useState, useEffect } from 'react'
import { getToken } from '../handlers/tokenHandler'

function ArtistRelatedArtists({ id }) {

  const [relatedArtists, setRelatedArtists] = useState([])

  useEffect(() => {
    async function getRelatedArtists() {
      console.log('running');
      const token = await getToken()
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists?market=US`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setRelatedArtists(data.artists)
      console.log("Related Artists");
      console.log(data.artists);
    }
    getRelatedArtists()
  }, [id])

  return (
    <div>
      <h1 className='fw-bold'>Related Artists</h1>
      
    </div>
  )
}

export default ArtistRelatedArtists


