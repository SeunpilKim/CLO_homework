import React, { useEffect } from 'react'
import axios from 'axios'

import ConditionContainer from './containers/ConditionContainer.js';
import Container from 'react-bootstrap/Container';
import './App.scss'



const App = () => {
  const getData = async () => {
    try {
      const res = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
      console.log(res)

    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    getData()
  })

  return (
    <Container fluid className='App'>
      <ConditionContainer />
      {
        
      }
    </Container>
  )
}

export default App;
