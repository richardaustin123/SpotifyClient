import React from 'react'
import { useState, useEffect } from 'react'
import getToken from '../handlers/tokenHandler'

import { Container, Row, Col, Image, Stack } from 'react-bootstrap'

function ArtistTopTracks({ id }) {

  const [topTracks, setTopTracks] = useState([])

  useEffect(() => {
    async function getTopTracks() {
      console.log('running');
      const token = await getToken()
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setTopTracks(data.tracks)
      console.log("tracks below");
      console.log(data.tracks)
    }
    getTopTracks()
  }, [id])

  function msToMinsAndSecs(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  return (
    <div>
        <h1 className='fw-bold mb-4'>Top Songs</h1>
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
        {topTracks.map((track, index) => {
        return (
            <Container direction='horizontal' gap={3} className='mb-2'>
                <Row className="justify-content-center align-items-center">
                    <Col md={1} className=''>
                      <div>
                        <Image className="rounded" src={track.album.images[2].url} alt="album cover" width={50} />
                      </div>
                    </Col>
                    <Col md={6}> 
                        <h3 className='fs-4 fw-light mb-auto'>{track.name}</h3>
                    </Col>
                    <Col md={4}>
                        <p className='fw-light mb-auto'>{track.album.name}</p>
                    </Col>
                    {/*
                    <Col> 
                        <p className='fw-light ms-5'>{track.album.release_date}</p> 
                    </Col>
                    */}
                    <Col md={1}>
                        <p className='text-center fw-light mb-auto'>{msToMinsAndSecs(track.duration_ms)}</p>
                    </Col>
                    
                </Row>
            </Container>
        )
        })}
    </div>
  )
}

export default ArtistTopTracks


