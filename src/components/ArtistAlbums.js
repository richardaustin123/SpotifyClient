import React from 'react'
import { useState, useEffect } from 'react'
import getToken from '../handlers/tokenHandler'
import { Card, Container, Row, Col } from 'react-bootstrap'

function ArtistAlbums({ id }) {

  const [albums, setAlbums] = useState([])

  useEffect(() => {
    async function getAlbums() {
      console.log('running');
      const token = await getToken()
      const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?market=US&limit=12`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setAlbums(data.items)
      console.log('albums');
      console.log(data.items);
    }
    getAlbums()
  }, [id])

  return (
    <div>
      <h1 className='fw-bold'>Albums</h1>
      {/* 5x2 grid of cards */}
      <Container>
        <Row>
          {albums.map((album, index) => {
            return (
              <Col key={index} xs={4} md={2} lg={2}>
                <Card className='mb-3'>
                  <Card.Img variant="top" src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Subtitle>
                      {album.release_date}
                    </Card.Subtitle>
                    <Card.Text>
                      {album.artists[0].name}
                      {album.artists[1] && `, ${album.artists[1].name}`}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default ArtistAlbums


