const express = require('express');
const axios = require('axios');
const app = express();
const api = require('./artsy.config.js');

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  // let artist = req.query.artist;
  // const type = api.token.type;
  // const token = api.token.token;
  // search term returns an object of object ids
  // send another request for each object id
  // save all of those results in a database (figure out which data points to save)
  // allow a user to flip through all of the images and on click (or hover or in a modal) reveal information on the art

  let search = req.query.searchTerm
  axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
  // .then((data) => {
  //   res.send(data.data);
  // })
  // .catch((err) => err)
})


app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})