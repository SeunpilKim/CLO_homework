import React from 'react'

const Card = ({ item }) => {
    return (
        <Col xs={12} md={6} lg={4} xl={3}>
            { item.title }
        </Col>
    )
}

export default Card