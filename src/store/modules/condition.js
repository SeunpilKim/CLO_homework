// 액션 타입 정의
const SET_PRICING_OPTION = 'SET_PRICING_OPTION' ;
const SET_KEYWORDS = 'SET_KEYWORDS'
const SET_SORTBY = 'SET_SORTBY'
const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE'

// 액션 생성 함수 정의
export const setPricingOption = (pricingOption) => ({ type: SET_PRICING_OPTION, pricingOption }) ;
export const setKeywords = (keywords) => ({ type: SET_KEYWORDS, keywords })
export const setSortBy = (sortBy) => ({ type: SET_SORTBY, sortBy })
export const setSliderValue = (sliderValue) => ({ type: SET_SLIDER_VALUE, sliderValue })

// 초기 상태 정의
const initialState = {
    pricingOption: [],
    keywords: '',
    sortBy: 'name',
    sliderValue: [0, 999],
};

// 리듀서 작성
export default function Condition(state=initialState, action) {
    switch(action.type) {
        case SET_PRICING_OPTION:
            return {
                ...state,
                pricingOption: action.pricingOption,
            } ;
        case SET_KEYWORDS:
            return {
                ...state,
                keywords: action.keywords
            }
        case SET_SORTBY:
            return {
                ...state,
                sortBy: action.sortBy
            }
        case SET_SLIDER_VALUE:
            return {
                ...state,
                sliderValue: action.sliderValue
            }
        default:
            return state ;
    }
}