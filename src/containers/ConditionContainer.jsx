import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { setPricingOption, setKeywords, setSortBy, setSliderValue } from '../store/modules/condition';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Icon from '@mdi/react';
import { mdiMagnify  } from '@mdi/js';
import ReactSlider from 'react-slider';

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
        dispatch({ type: 'SET_SLIDER_VALUE', sliderValue: [0,999] })
    }

    const handleSliderChange = (val) => {
        dispatch({ type: 'SET_SLIDER_VALUE', sliderValue: val })
    }

    const handleChangeSortBy = (e) => {
        dispatch({ type: 'SET_SORTBY', sortBy: e.target.value })
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
                        <span style={{ marginLeft: '12px', marginRight: '8px', opacity: !conditionState.pricingOption.includes('PAID') ? 0.4 : 1}}>{ `$ ${conditionState.sliderValue[0]}` }</span>
                        <ReactSlider 
                            className="price-slider"
                            thumbClassName="slider-thumb"
                            trackClassName="slider-track"
                            defaultValue={conditionState.sliderValue}
                            value={conditionState.sliderValue}
                            min={0}
                            max={999}
                            disabled={!conditionState.pricingOption.includes('PAID')}
                            renderThumb={(props, state) => <div {...props}></div>}
                            pearling
                            minDistance={10}
                            onChange={handleSliderChange}
                        />
                        <span className="" style={{ marginLeft: '8px', opacity: !conditionState.pricingOption.includes('PAID') ? 0.4 : 1}}>{ `$ ${conditionState.sliderValue[1]}` }</span>
                        <Button variant="outline-secondary" id="button-addon2" onClick={handleEmptyPricingOption}>
                            Reset
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex" style={{ marginBottom: '12px' }}>
                    <div className="d-flex px-1" style={{ marginLeft: 'auto' }}>
                        <span style={{ fontWeight: 700, color: 'white', marginRight: '8px' }}>Sort By</span>                        
                        <select
                            onChange={handleChangeSortBy}
                            key={`select-sortby`}
                            
                            defaultValue={conditionState.sortBy}
                        >
                            <option value={'name'}>
                                {'Item Name'}
                            </option>
                            <option value={'highPrice'}>
                                {'Higher Price'}
                            </option>
                            <option value={'lowPrice'}>
                                {'Lower Price'}
                            </option>
                        </select>
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = ({ condition }) => ({
    pricingOption: condition.pricingOption,
    keyWords: condition.keyWords,
    sortBy: condition.sortBy,
    sliderValue: condition.sliderValue
});

const mapDispatchToProps = { setPricingOption, setKeywords, setSortBy, setSliderValue } ; 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConditionContainer)