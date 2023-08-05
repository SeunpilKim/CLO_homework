import React, { useRef, useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import ConditionContainer from './containers/ConditionContainer.jsx';
import Container from 'react-bootstrap/Container';
import Card from './components/Card.jsx'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';



const App = () => {
  const [cardTotalData, setCardTotalData] = useState([])
  const [page, setPage] = useState(1)
  const [cardData, setCardData] = useState([])
  const [totalLoaded, setTotalLoaded] = useState(false)

  const loader = useRef(null);

  const getData = async () => {
    try {
      const res = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
      setCardTotalData(res.data)
      setPage(1)
      setCardData(JSON.parse(JSON.stringify(res.data)).slice(0, 16))
    } catch (err) {
      console.warn(err)
    }
  }

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (cardTotalData.length && cardData.length) {
        const newArr = [...cardData, ...JSON.parse(JSON.stringify(cardTotalData)).slice(page * 16 - 1, Math.min(cardTotalData.length, (page + 1) * 16 - 1))]
        setCardData(newArr)
        setPage(page + 1)
        if (cardTotalData.length && cardTotalData.length <= newArr.length ) setTotalLoaded(true)
      }
    }
  }, [cardTotalData, cardData]);

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const option = {
      root: document.querySelector('.container'),
      rootMargin: "10px",
      threshold: [0, 0.5, 1]
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <Container className='App'>
      <ConditionContainer />
      <Row style={{ width: '100%', height: 'calc(100% - 112px)', overflowY: 'auto' }} className="d-flex card-list-wrapper">
        {
          cardData.map((card, idx) => {
            return (
              <Card item={card} key={`card-item-${idx}`}/>
            )
          })
        }
        { !totalLoaded && <div ref={loader} />}
      </Row>
      
    </Container>
  )
}

export default App;
