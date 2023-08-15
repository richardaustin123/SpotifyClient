import React from 'react'
import { useState, useEffect } from 'react'
import getToken from '../handlers/tokenHandler'
import { Card, Container, Row, Col } from 'react-bootstrap'

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
      // trim to 6 artists
      data.artists.splice(6)
      setRelatedArtists(data.artists)
      console.log("Related Artists");
      console.log(data.artists);
    }
    getRelatedArtists()
  }, [id])

  return (
    <div>
      <h1 className='fw-bold'>Related Artists</h1>
      <Container >
        <Row>
          {relatedArtists.map((artist, index) => {
            return (
              <Col key={index} xs={4} md={4} lg={4}>
                <Card className='mb-3'>
                  <Card.Img variant="top" src={artist.images[0].url} />
                  <Card.Title className='fw-light fs-6 p-2'>{artist.name}</Card.Title>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default ArtistRelatedArtists


