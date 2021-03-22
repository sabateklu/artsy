const express = require('express');
const axios = require('axios');
const app = express();
var passwordHash = require('password-hash');


const api = require('./artsy.config.js');
//var hashedPassword = passwordHash.generate('password123');
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  let search = req.query.searchTerm || 'rodents'
  axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
  .then((results) => {
    let artPieces = results.data.objectIDs;
    artPieces.forEach((objectId) => {
      axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
      .then((response) => {
        if(response.data.primaryImage.length > 0) {
          //establish database to store images and what information about the image you want to store
        };
      })
    })
  })
  .catch((err) => err)
})


app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})