import React from 'react'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import config from '../config.json'

import { Container, Row, Col, Stack, Image, ProgressBar, Form } from 'react-bootstrap'

import getToken from '../handlers/tokenHandler'

import ArtistTopTracks from './ArtistTopTracks'
import ArtistAlbums from './ArtistAlbums'
import ArtistRelatedArtists from './ArtistRelatedArtists'

function Artist() {

  // Information
  let endpoint = 'https://api.spotify.com/v1/artists/'
  
  let [artist, setArtist] = useState('')
  let [artistInfo, setArtistInfo] = useState([])
  let [id, setID] = useState('')

  useEffect(() => {
    // get the artist from local storage
    const artist = JSON.parse(localStorage.getItem('artist'))
    if (artist) {
      setArtistInfo(artist)
      setID(artist.id)
    }
  }, [])

  async function getArtistIDFromName() {
    const token = await getToken()
    // Get the artist from spotify API
    const response = await fetch('https://api.spotify.com/v1/search?q=' + artist + '&type=artist', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const data = await response.json()
    console.log(data)
    setID(data.artists.items[0].id)
    getArtist(data.artists.items[0].id, token)    
  }

  async function getArtist(id, token) {
    // Get the artist from spotify API
    const response = await fetch(endpoint + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const data = await response.json()
    console.log(data)
    setArtistInfo(data)

    // save the artist to local storage
    localStorage.setItem('artist', JSON.stringify(data))
  }

  function enterPressed(event) {
    if (event.key === 'Enter') {
      getArtistIDFromName();
    }
  }

  return (
    <div className="center-div" >
      <Container className='mt-4'>
      {/* <h2 className='text-start fw-semibold'>Search Artist</h2> */}
        <Stack direction="horizontal" gap={3}>

            <Form.Control
            type="text"
            placeholder="Search Artist"
            onChange={e => setArtist(e.target.value)}
            onKeyDown={enterPressed}
            />
            <Button  onClick={getArtistIDFromName} variant='' style={{ color: "white", whiteSpace: 'nowrap', background: "linear-gradient(45deg, #02AAB0, #00CDAC)" }}>
              Search
            </Button>
            {/* <div className="vr" />
            <Button variant='' style={{ color: "white", whiteSpace: 'nowrap', background: "black" }}>
              Settings
            </Button> */}
        </Stack>
      </Container>

      {artistInfo.length !== 0 && (
        <div>
        <Container className='rounded mt-3 p-3'>
          <Row>
            <Col md={8}>
              <h1 className='fs-1 fw-bold mb-1'>{artistInfo.name}</h1>
              <p className='fs-4 mb-1'>{artistInfo.followers.total.toLocaleString("en-US")} Followers</p>
              <p className='fs-5 m-0 fw-light'>Popularity</p>
              <ProgressBar className='mt-2 mb-3 w-50' variant='success' now={artistInfo.popularity}/>
              <div className='d-flex align-items-center'>  
                {artistInfo.genres.map((genre, index) => {
                  return <Button variant='dark' key={index} className='me-2'>{genre}</Button>
                })}
              </div>

              {/* top tracks */}
              <div className='rounded mt-5'>  
                <ArtistTopTracks id={id} />
              </div>

            </Col>
            <Col md={4}>
              <Image src={artistInfo.images[0].url} rounded style={{width: "100%"}} />

              {/* related artists */}
              <div className='rounded mb-5 mt-4'>
                <ArtistRelatedArtists id={id} />
              </div>

            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
            {/* albums */}
              <div className='rounded mb-5'>  
                <ArtistAlbums id={id} />
              </div>
            </Col>
          </Row>
        </Container>
        </div>

      )}

    </div>
  )
}


export default Artist

