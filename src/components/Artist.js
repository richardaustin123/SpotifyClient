import React from 'react'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import config from '../config.json'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image'
import ProgressBar from 'react-bootstrap/ProgressBar'
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

  function enterPressed(event) {
    if (event.key === 'Enter') {
      getArtistIDFromName();
    }
  }

  return (
    <div className="center-div">
      <Container>
      <h2 className='text-start fw-semibold'>Search Artist</h2>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            type="text"
            placeholder="Search Artist"
            onChange={e => setArtist(e.target.value)}
            onKeyDown={enterPressed}
          />
          <Button onClick={getArtistIDFromName} variant='dark' style={{ whiteSpace: 'nowrap', background: "linear-gradient(45deg, #02AAB0, #00CDAC)" }}>
            Search
          </Button>
        </Stack>
      </Container>

      {artistInfo.length !== 0 && (
        <Container className='mt-5'>
          <Row>
            <Col md={8}>
              <h1 className='fs-1 fw-bold mb-1'>{artistInfo.name}</h1>
              <p className='fs-4 mb-1'>{artistInfo.followers.total.toLocaleString("en-US")} Followers</p>
              <p className='fs-5 m-0 fw-light'>Popularity</p>
              <ProgressBar className='mt-2 mb-3 w-50' variant='info' now={artistInfo.popularity}/>
              <div className='d-flex align-items-center'>  
                {artistInfo.genres.map((genre, index) => {
                  return <Button variant='dark' key={index} className='me-2'>{genre}</Button>
                })}
              </div>
            </Col>
            <Col md={4}>
              <Image src={artistInfo.images[1].url} rounded style={{width: "100%"}} />
            </Col>
          </Row>
        </Container>

      )}

      <Container>
        <Row>
          <Col md={8}>
            {/* top songs */}
            {/* albums */}
          </Col>
          <Col md={4}>
            {/* related artists */}
          </Col>
        </Row>
      </Container>

    </div>
  )
}


export default Artist

