import React, { useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useLocation } from 'react-router-dom';

import config from '../config.json'

function Home() {

  const location = useLocation()

  useEffect(() => {
    console.log(location)
    // get the code and state params from the URL
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    const state = params.get('state')

    // if the code and state are not present, redirect to the spotify login page
    if (!code || !state) {
      console.log("Redirecting to spotify login page")
      // TODO: redirect to spotify login page
      const clientId = config.clientId
      const redirectUri = config.redirectUri
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
    }
  }, [location])


  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home