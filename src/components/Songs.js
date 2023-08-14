import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, Form, Button, Stack, Row, Col, Image } from 'react-bootstrap';
import config from '../config.json'
import { getToken } from '../handlers/tokenHandler'
import SongsTopSongs from './SongsTopSongs';

function Songs() {

    let endpoint = "https://api.spotify.com/v1/tracks/"

    // State variables
    let [song, setSong] = useState('')
    let [songs, setSongs] = useState([])

    // useEffect()
    // When the component is mounted, get the songs from local storage
    useEffect(() => {
        // get the songs from local storage
        const songsFromLocalStorage = localStorage.getItem('songs');
        // if there are songs in local storage, set the state
        if (songsFromLocalStorage) {
            setSongs(JSON.parse(songsFromLocalStorage));
        }
    }, [])

    // getSongFromName()
    // Gets the song from the name typed in the search bar
    async function getSongFromName() {
        const token = await getToken();

        const response = await fetch("https://api.spotify.com/v1/search?q=" + song + "&type=track", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const data = await response.json();
        console.log(data);
        setSongs(data.tracks.items);
        // Update the local storage
        localStorage.setItem('songs', JSON.stringify(data.tracks.items));
    }

    // enterPressed()
    // If the enter key is pressed, call getSongFromName()
    function enterPressed(event) {
        if (event.key === 'Enter') { 
            getSongFromName();
        }
    }

    // msToMinsAndSecs()
    // Converts song milliseconds to minutes and seconds for better formatting for the user
    function msToMinsAndSecs(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
    
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
      }

    return (
        <div>

            <Container className='mt-4'>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control
                        type="text"
                        placeholder="Search for a song"
                        onChange={e => setSong(e.target.value)}
                        onKeyDown={enterPressed}
                    />
                    <Button onClick={getSongFromName} variant='' style={{ color: "white", whiteSpace: 'nowrap', background: "linear-gradient(45deg, #02AAB0, #00CDAC)" }}>
                    Search
                    </Button>
                </Stack>
            </Container>

            <div>
                <Container className='mt-3'>
                    <div className='rounded mt-4'>
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
                          {songs ? 
                            songs.map((track, index) => {
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
                            })
                          : <div>no songs yet</div>}
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Songs;