import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Image } from 'react-bootstrap'

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
    // cut to max size of 10 songs
    // data.items.splice(10)
    setTopSongs(data.items)
  }

  /*
    This function gets the user's top artists from the Spotify API and stores it in state
  */
  async function getTopArtists() {
    const data = await getTopThing('artists')
    // cut to max size of 14 artists
    // data.items.splice(14)
    setTopArtists(data.items)
  }

  /*
    This function converts milliseconds to minutes and seconds for better formatting for the user
  */
  function msToMinsAndSecs(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
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
        {/* <h1>Home</h1> */}
        {topArtists && topSongs ? 
          // <h2>Personal feed</h2>
          // feed goes here
          <Container>
            <h2 className='fw-bold fs-2 mb-4 mt-4'>Your Top Artists</h2>
            <Row>
              {topArtists.map((artist, index) => {
                return (
                  <Card style={{ width: '10rem' }} key={index} className='m-2 h-100' border=''>
                    {/* <Card.Img variant="top" src={artist.images[1].url} className='object-fit-cover'/> */}
                    <Image src={artist.images[1].url} className='' />
                    <Card.Body>
                      <Card.Title className='fw-semibold fs-5'>{artist.name}</Card.Title>
                      <Card.Text className='fw-light fs-6'>
                        {artist.genres[0]}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })
            }
            </Row>
            <h2 className='fw-bold fs-2 mb-4 mt-5'>Your Top Songs</h2>
            <Container direction='horizontal' gap={3} className='mb-2'>
              <Row className="justify-content-center align-items-center fw-light">
                <Col md={1} className=''>
                </Col>
                <Col md={6}>
                  Name
                </Col>
                <Col md={4}>
                  Album
                </Col>
                <Col md={1}>
                </Col>
              </Row>
            </Container>
            <Row className='mb-5'>
              {topSongs.map((song, index) => {
                return (
                  // list of songs
                  <Container direction='horizontal' gap={3} className='mb-2'>
                    <Row className='justify-content-center align-items-center' key={index}>
                      <Col md={1} className=''>
                        <div>
                          <img className="rounded" src={song.album.images[2].url} alt="album cover" width={50} />
                        </div>
                      </Col>
                      <Col md={6}>
                        <h3 className='fs-4 fw-light mb-auto'>{song.name}</h3>
                      </Col>
                      <Col md={4}>
                        <p className='fw-light mb-auto'>{song.album.name}</p>
                      </Col>
                      <Col md={1}>
                        <p className='text-center fw-light mb-auto'>{msToMinsAndSecs(song.duration_ms)}</p>
                      </Col>
                    </Row>
                  </Container>
                )
              })
            }
            </Row>
          </Container>
          :
          <h2>Log in plz</h2>
        }
    </div>
  )
}

export default Home

