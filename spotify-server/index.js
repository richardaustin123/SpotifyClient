// Description: This is the main file for the server. It will handle all the requests and responses.
const express = require('express');
const app = express();
const secrets = require('./secrets.json');
const { refreshToken } = require('./tokenHandler');
const cors = require('cors');
const fs = require('fs');
const { log } = require('console');

app.use(cors());

const port = process.env.PORT || 6969;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// endpoint for getting the token
app.get('/token', async (req, res) =>  {
    // check if the token is expired (one hour)
    const tokenRefreshDate = new Date(secrets.tokenRefreshDate);
    const now = new Date();
    const diff = now.getTime() - tokenRefreshDate.getTime();
    const diffInHours = diff / (1000 * 3600);

    if (diffInHours > 1) {
        // refresh the token
        console.log('Refreshing token');
        await refreshToken();
    }

    // get the token from secrets.json

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // return json object
    res.json({
        token: secrets.access_token
    });
});

// endpoint for getting a users access token
app.get('/userToken', async (req, res) => {
    // get param for code
    const code = req.query.code;
    // if there is no code then return an error
    if (!code) {
        res.status(400).json({
            error: 'No code provided'
        });
        return;
    }
    // make the request to spotify for the access token
    const endpoint = 'https://accounts.spotify.com/api/token'
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${secrets.redirectUri}&client_id=${secrets.clientId}&client_secret=${secrets.clientSecret}`
    });
    const data = await response.json();
    console.log(data);
    // return the access token
    res.json({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        scope: data.scope
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


