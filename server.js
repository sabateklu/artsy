const express = require('express');
const axios = require('axios');
const app = express();
const api = require('./artsy.config.js');

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  let search = req.query.searchTerm || 'rodents'
  axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
  .then((results) => {
    let artPieces = results.data.objectIDs;
    artPieces.forEach((objectId) => {
      axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
      .then((response) => {
        res.send(response.data);
      })
    })
  })
  .catch((err) => err)
})


app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})