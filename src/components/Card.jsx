import React from 'react'
import { connect, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import './Card.scss'

const PRICING_OPTION = {
    PAID: 0,
    FREE: 1,
    VIEW_ONLY: 2,
    0: 'PAID',
    1: 'FREE',
    2: 'VIEW_ONLY'
}

const CardComponent = ({ item }) => {
    const conditionState = useSelector(state => state.condition)
    const parseItemPrice = () => {
        if (item.pricingOption === PRICING_OPTION.PAID) {
            return `$${item.price}`
        } else if (item.pricingOption === PRICING_OPTION.FREE) return 'FREE'
        else return 'View Only'
    }

    const filterCard = () => {
        if (conditionState.pricingOption.length === 0 && conditionState.keywords === '') return ''
        const isCheckedOption = conditionState.pricingOption.includes(PRICING_OPTION[item.pricingOption])
        const isContainedKeywords = item.title.indexOf(conditionState.keywords) !== -1 || item.creator.indexOf(conditionState.keywords) !== -1

        if (conditionState.keywords) {
            if ((conditionState.pricingOption.length > 0 && !isCheckedOption) || !isContainedKeywords) {
                return 'none'
            }
        } else {
            if (!isCheckedOption) {
                return 'none'
            }
        }
        return ''
    }

    return (
        <Col sm={6} md={4} xl={3} className="mb-2 card-wrapper" style={{ display: filterCard() }}>
            <Card style={{ width: '100%', height: '100%', maxHeight: '356px', backgroundColor: '#1b1a21', color: 'white' }}>
                <Card.Img variant="top" src={item.imagePath} style={{ maxHeight: '278px', minHeight: '278px' }}/>
                <Card.Body>
                    <div className="d-flex" style={{ alignItems: 'center' }}>
                        <div className="">
                            <Card.Text className="font-weight-bold">{item.title}</Card.Text>
                            <Card.Text>{item.creator}</Card.Text>
                        </div>
                        <div className="" style={{ marginLeft: 'auto' }}>
                            <Card.Text className="price">{parseItemPrice()}</Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

const mapStateToProps = ({ condition }) => ({
    pricingOption: condition.pricingOption,
    keyWords: condition.keyWords
});


export default connect(
    mapStateToProps,
)(CardComponent)