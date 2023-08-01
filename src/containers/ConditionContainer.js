import React from 'react'
import { connect } from 'react-redux';
import { setPricingOption, setKeywords } from '../store/modules/condition';

const ConditionContainer = () => {
    const handleChangePricingOption = () => {
        
    }

    return (
        <div>
            CONDITON FIELD
        </div>
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