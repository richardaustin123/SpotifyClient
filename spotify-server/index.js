// Description: This is the main file for the server. It will handle all the requests and responses.
const express = require('express');
const app = express();
const secrets = require('./secrets.json');
const { refreshToken } = require('./tokenHandler');
const cors = require('cors');

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

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // return json object
    res.json({
        token: secrets.access_token
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


