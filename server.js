const fs = require('fs');
const gemini = require('gemini-server');
const axios = require('axios');

const options = {
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
};

//Create gemini instance with cert and key
const app = gemini(options);

//On a request to / serve a gemini file
//This automatically detects the mime type and sends that as a header
app.on('/', async (req, res) => {
  try {
    const response = await axios.get( "https://api.ethermine.org/miner/0x2ff28D38FB01681B643E9E0c1c8301b5A78207fb/currentStats")
    res.data(
      "Averagehashrate of the miner in H/s during the last 24h: " +
      response.data.data.averageHashrate
    );
  }
  catch (err) {
    console.log(err);
  }
});

//start listening. Optionally specify port and callback
app.listen(() => {
  console.log("Listening...");
});
