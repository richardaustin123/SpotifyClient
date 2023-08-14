import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'

function ProfilePicture({ token }) {

  let [profile, setProfile] = useState({})

  useEffect(() => {
    // get the access token from local storage
    const accessToken = localStorage.getItem('access_token')
    // use access token to get the profile picture
    async function getProfile() {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      const data = await response.json()
      console.log(data)
      setProfile(data)
    }
    // if the access token is not in local storage do nothing
    if (!accessToken) {
      console.log("No access token in local storage")
      return
    }
    getProfile()
  }, [token])

  return (
    <div className=''>
      <Image src={profile.images ? profile.images[0].url : ''} roundedCircle style={{height: 50}} />
    </div>
  )
}

export default ProfilePicture