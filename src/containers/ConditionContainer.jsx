import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { setPricingOption, setKeywords } from '../store/modules/condition';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import Icon from '@mdi/react';
import { mdiMagnify  } from '@mdi/js';

import './ConditionContainer.scss'

const PRICING_OPTION = {
    PAID: 0,
    FREE: 1,
    VIEW_ONLY: 2,
}

const ConditionContainer = () => {
    const conditionState = useSelector(state => state.condition)
    const dispatch = useDispatch()
    const [searchKeyword, setSearchKeyword] = useState(conditionState.keywords)

    const isCheckedOption = (option) => {
        if (conditionState.pricingOption.find(opt => opt === option)) return true
        return false
    }

    const handleChangeKeywords = () => {
        dispatch({ type: 'SET_KEYWORDS', keywords: searchKeyword })
    }

    const handleKeydownInput = (e) => {
        if (e.key === 'Enter') {
            dispatch({ type: 'SET_KEYWORDS', keywords: searchKeyword })
        }
    }

    const handleChangePricingOption = (e) => {
        if (e.target.checked) {
            dispatch({ type: 'SET_PRICING_OPTION', pricingOption: [...conditionState.pricingOption, e.target.name] })
        } else {
            dispatch({ type: 'SET_PRICING_OPTION', pricingOption: conditionState.pricingOption.filter(option => option !== e.target.name) })
        }
    }

    const handleEmptyPricingOption = () => {
        dispatch({ type: 'SET_PRICING_OPTION', pricingOption: [] })
    }

    return (
        <>
            <Row>
                <Col>
                    <InputGroup className="keyword wrapper">
                        <Form.Control
                            value={searchKeyword}
                            placeholder="Find the items you're looking for"
                            aria-describedby="keyword-input"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={handleKeydownInput}
                        />
                        <Icon path={mdiMagnify}
                            size={1}
                            color="white"
                            id="keyword-input"
                            onClick={handleChangeKeywords}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="filter wrapper">
                        <Form.Text className="">Pricing Option</Form.Text>
                        {
                            Object.keys(PRICING_OPTION).map((option, idx) => {
                                return (
                                    <Form.Check
                                        inline
                                        label={option}
                                        name={option}
                                        type='checkbox'
                                        checked={isCheckedOption(option)}
                                        onChange={handleChangePricingOption}
                                        className="checkbox-option"
                                        key={`pricing-option-${option}`}
                                    />
                                )
                            })
                        }
                        <Button variant="outline-secondary" id="button-addon2" onClick={handleEmptyPricingOption}>
                            Reset
                        </Button>
                    </Form>
                </Col>
            </Row>
            {/* <Row>
                <Col className="d-flex">
                    <DropdownButton className="ml-auto">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row> */}
        </>
    )
}

const mapStateToProps = ({ condition }) => ({
    pricingOption: condition.pricingOption,
    keyWords: condition.keyWords
});

const mapDispatchToProps = { setPricingOption, setKeywords } ; 


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConditionContainer)