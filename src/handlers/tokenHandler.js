async function getToken() {
    // fetch localhost:6969/token
    const response = await fetch('http://139.162.211.220:6969/token');
    const data = await response.json();
    console.log(data.token);
    return data.token;
}

export default getToken;