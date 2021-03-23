const express = require('express');
const axios = require('axios');
const app = express();
const passwordHash = require('password-hash');
//const api = require('./artsy.config.js');
//var hashedPassword = passwordHash.generate('password123');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js')

let connection = db.connection
const port = 3000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.get('/api/search', (req, res) => {
  let search = req.query.searchTerm || 'rodents';
  let artPiecesObjectIds;
  let collection = [];

  axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
  .then(async (results) => {
    artPiecesObjectIds = results.data.objectIDs;
    for (const objectId of artPiecesObjectIds) {
      await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
      .then((response) => {
        if(response.data.primaryImage.length > 0) {
          let piece = {
            objectid: objectId,
            primaryImage: response.data.primaryImage,
            department: response.data.department.replace(/"/g, ""),
            title: response.data.title.replace(/"/g, ""),
            culture: response.data.culture.replace(/"/g, ""),
            objectDate: response.data.objectDate.replace(/"/g, ""),
            medium: response.data.medium.replace(/"/g, ""),
            region: response.data.state.replace(/"/g, ""),
            country: response.data.country.replace(/"/g, ""),
            artist: response.data.artistDisplayName.replace(/"/g, ""),
            artistBio: response.data.artistDisplayBio.replace(/"/g, "")
          };
          collection.push(piece);
        }
      })
    }
    res.status(200).send(collection);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})

