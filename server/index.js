const express = require('express');
const axios = require('axios');
const app = express();
var passwordHash = require('password-hash');
const db = require('../database/index.js')
let connection = db.connection
//const api = require('./artsy.config.js');
//var hashedPassword = passwordHash.generate('password123');
const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  let search = req.query.searchTerm || 'atrocious';
  let artPiecesObjectIds;
  let collection = [];

  axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
  .then((results) => {
    artPiecesObjectIds = results.data.objectIDs;
    artPiecesObjectIds.forEach((objectId) => {
      axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
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

          connection.query(`INSERT INTO art VALUES (${piece.objectid}, "${piece.primaryImage}", "${piece.department}", "${piece.title}", "${piece.culture}", "${piece.objectDate}", "${piece.medium}", "${piece.region}", "${piece.country}", "${piece.artist}", "${piece.artistBio}");`, (err, success) => {
            if (err) {
              console.log(err);
            } else {
              connection.query(`INSERT INTO search (objectid, term) VALUES (${objectId}, "${search}");`, (error, positive) => {
                if (error) {
                  console.log(error);
                } else {
                  connection.query(`SELECT objectid FROM search WHERE term='${search}';`, (searchError, objectIds)=> {
                    if (searchError) {
                      console.log(searchError);
                    } else {
                      let queryString = 'SELECT * FROM art WHERE';
                      for (let i = 0; i < objectIds.length; i++) {
                        let item = objectIds[i];
                        queryString+= ` objectid=${item.objectid} OR` ;
                      }
                      const finalString = queryString.substring(0, queryString.length -4);

                      connection.query(finalString, (finalErr, finalResults) => {
                        if (finalErr) {
                          console.log(finalErr);
                        } else {
                          console.log('FINAL RESULTS:', finalResults);
                        }
                      })
                    }
                  })
                }
              })
            }
          });

        }
      })
    })
    //connection.end();
  })
  .catch((err) => {
    console.log(err);
  })
})

app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})