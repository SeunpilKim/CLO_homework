import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import './Card.scss'

const PRICING_OPTION = {
    PAID: 0,
    FREE: 1,
    VIEW_ONLY: 2,
}

const CardComponent = ({ item }) => {
    const parseItemPrice = () => {
        if (item.pricingOption === PRICING_OPTION.PAID) {
            return `$${item.price}`
        } else if (item.pricingOption === PRICING_OPTION.FREE) return 'FREE'
        else return 'View Only'
    }
    return (
        <Col sm={6} md={4} xl={3}>
            <Card style={{ width: '100%', height: '100%' }}>
                <Card.Img variant="top" src={item.imagePath} style={{ height: '100%' }}/>
                <Card.Body>
                    <div className="d-flex align-center">
                        <div className="">
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.creator}</Card.Text>
                        </div>
                        <div className="ml-auto">
                            <Card.Text>{parseItemPrice()}</Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CardComponent