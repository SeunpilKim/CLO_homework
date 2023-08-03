import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ConditionContainer from './containers/ConditionContainer.jsx';
import Container from 'react-bootstrap/Container';
import Card from './components/Card.jsx'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';



const App = () => {
  const [cardData, setCardData] = useState([])
  const getData = async () => {
    try {
      const res = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
      setCardData(res.data)
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    getData()
  })

  return (
    <Container className='App'>
      <ConditionContainer />
      <Row style={{ width: '100%' }} className="d-flex">
        {
          cardData.map(card => {
            return (
              <Card item={card}/>
            )
          })
        }
      </Row>
    </Container>
  )
}

export default App;
