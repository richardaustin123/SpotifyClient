async function getToken() {
    // fetch localhost:6969/token
    const response = await fetch('http://176.58.127.94:6969/token');
    const data = await response.json();
    console.log(data.token);
    return data.token;
}

module.exports = {
    getToken: getToken
}