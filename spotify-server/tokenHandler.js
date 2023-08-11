const secrets = require('./secrets.json');
const fs = require('fs');
const path = require('path');

async function refreshToken() {
    let endpoint = 'https://accounts.spotify.com/api/token';
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${secrets.clientId}&client_secret=${secrets.clientSecret}`
    });

    let data = await res.json();
    secrets.access_token = data.access_token;
    secrets.tokenRefreshDate = new Date();
    fs.writeFileSync(path.join(__dirname, 'secrets.json'), JSON.stringify(secrets, null, 4));

    console.log('Token refreshed');
}

module.exports = {
    refreshToken: refreshToken
}