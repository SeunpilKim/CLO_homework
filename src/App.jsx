import React, { useRef, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { connect, useSelector } from 'react-redux';
import ConditionContainer from './containers/ConditionContainer.jsx';
import Container from 'react-bootstrap/Container';
import Card from './components/Card.jsx'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';

const App = () => {
  const conditionState = useSelector(state => state.condition)
  const [cardTotalData, setCardTotalData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [size, ] = useState(16)
  const [cardData, setCardData] = useState([])
  const [totalLoaded, setTotalLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const loader = useRef(null);

  const getData = async () => {
    try {
      const res = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
      setCardTotalData(res.data)
      setPage(1)
      setTotalPage(Math.ceil(res.data.length / size))
      setCardData(JSON.parse(JSON.stringify(res.data)).slice(0, size))
    } catch (err) {
      console.warn(err)
    }
  }

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (cardTotalData.length && cardData.length) {
        const newArr = [...cardData, ...JSON.parse(JSON.stringify(cardTotalData)).slice(page * size - 1, Math.min(cardTotalData.length, (page + 1) * size - 1))]
        setCardData(newArr)
        setPage(page + 1)
        if (page + 1 >= totalPage ) setTotalLoaded(true)
      }
    }
  }, [cardTotalData, cardData, page, size, totalPage]);

  const sortedCardData = () => {
    switch(conditionState.sortBy) {
      case 'name':
        const newArr = [].concat(cardData).sort((a,b) => a.title > b.title ? 1 : -1)
        return newArr
      case 'highPrice':
        const newArr1 = [].concat(cardData).sort((a,b) => b.price - a.price)
        return newArr1
      case 'lowPrice':
        const newArr2 = [].concat(cardData).sort((a,b) => a.price - b.price)
        return newArr2
      default:
        break;
    }
  }

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

  useEffect(() => {
    setLoading(false)
  }, [cardData])

  return (
    <Container className='App'>
      <ConditionContainer />
      <Row style={{ width: '100%', height: 'calc(100% - 121px)', overflowY: 'auto' }} className="d-flex card-list-wrapper">
        {
          sortedCardData().map((card, idx) => {
            return (
              <Card item={card} key={`card-item-${idx}`}/>
            )
          })
        }
        {<div ref={loader} />}
      </Row>
    </Container>
  )
}

const mapStateToProps = ({ condition }) => ({
  sortBy: condition.sortBy
});

export default connect(
  mapStateToProps,
)(App)