import logo from './logo.svg';
import './App.css';
import config from './config.json'
import Artist from './components/Artist';
import Home from './components/Home';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Stack } from 'react-bootstrap';

import ProfilePicture from './components/ProfilePicture';

function App() {

  useEffect(() => {

    // if the access token is already in local storage, we don't need to do anything
    if (localStorage.getItem('access_token') != undefined) {
      console.log("Access token already in local storage")
      console.log(localStorage.getItem('access_token'));
      return
    }

    async function getAccessToken(code, redirectUri) {
      const endpoint = 'https://accounts.spotify.com/api/token'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${config.clientId}&client_secret=6c1ae53ec81e41908bedaa24933e3952`
      })
      const data = await response.json()
      console.log(data)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('token_type', data.token_type)
      localStorage.setItem('expires_in', data.expires_in)
      localStorage.setItem('scope', data.scope)
      console.log("Got access token")
    }

    // get the code and state params from the URL
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const code = params.get('code')
    const state = params.get('state')
    const clientId = config.clientId
    const redirectUri = config.redirectUri

    // if the code and state are not present, redirect to the spotify login page
    if (!code || !state) {
      console.log("Redirecting to spotify login page")
      // redirect to spotify login page
      const scopes = "user-library-read playlist-read-private user-read-private user-read-email"
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&state=123`
      // redirect to the oauth page
      window.location.href = url
    }
    // if we have the code and state, we can exchange the code for an access token (or just store if using implicit grant flow)
    // for now just store the code and state in local storage
    else {
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
                <ProfilePicture />
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