import React, { useEffect, useState } from 'react';
import axios from 'axios';
import faker from 'faker';
import About from './About.jsx';

function App () {
  const [art, setArt] = useState([]);

  const getArt = (searchTerm = faker.random.word())=> {
    axios.get(`/api/search?searchTerm=${searchTerm}`)
    .then((response) => {
      console.log(response);
      setArt(response.data);
    })
    .catch((err) => {
      throw err;
    })
  }

  useEffect(() => {
    getArt();
  }, [])

  return (
    <>
      <About />
    </>
  );
}

export default App;