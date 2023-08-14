import logo from './logo.svg';
import './App.css';
import config from './config.json'
import Artist from './components/Artist';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Stack } from 'react-bootstrap';

import ProfilePicture from './components/ProfilePicture';

function App() {

  let [accessToken, setAccessToken] = useState('')

  useEffect(() => {

    // if the access token is already in local storage, we don't need to do anything
    if (localStorage.getItem('access_token') != undefined) {
      console.log("Access token already in local storage")
      console.log(localStorage.getItem('access_token'));
      return
    }

    async function getAccessToken(code, redirectUri) {
      const endpoint = 'http://localhost:6969/userToken'
      // fetch access code from server
      const response = await fetch(endpoint + `?code=${code}`)
      const data = await response.json()
      console.log(data)
      // store all data in local storage
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('token_type', data.token_type)
      localStorage.setItem('expires_in', data.expires_in)
      localStorage.setItem('scope', data.scope)
      console.log("Got access token")
      // update the state
      setAccessToken(data.access_token)
    }

    // get the code and state params from the URL
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const code = params.get('code')
    const state = params.get('state')
    const clientId = config.clientId
    const redirectUri = config.redirectUri

    // if the code and state are not present, redirect to the spotify login page
    if (code && state) {
      console.log("Storing code and state in local storage")
      localStorage.setItem('code', code)
      localStorage.setItem('state', state)
      // exchange code for access token
      getAccessToken(code, redirectUri)
    }
  }, [])

  return (
    <div className="App">
      <Container className=''>
        <Router>
        <Navbar expand="lg">
          <Stack direction='horizontal' gap={3} className='w-100'>
            <Navbar.Brand as={Link} to="/" className='fw-bold fs-2'>Spotifapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
                <Nav.Link as={Link} to="/songs">Songs</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <div className='d-flex flex-row'>
              <div>
                {/* if access token is empty then show login button if not show profile picture */}
                {accessToken ? <ProfilePicture token={accessToken} /> : <a href="https://accounts.spotify.com/authorize?client_id=93a82d5e1f9243fe8ee5d873adc4f932&response_type=code&redirect_uri=http://localhost:3000/&scope=user-library-read%20playlist-read-private%20user-read-private%20user-read-email&state=123" className='btn btn-success'>Login</a>}
              </div>
            </div>
          </Stack>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artist />} />
          {/* <Route path="/songs" element={<Songs />} /> */}
        </Routes>
      </Router>
      </Container>
    </div>
  );
}

export default App;