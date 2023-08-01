// 액션 타입 정의
const SET_PRICING_OPTION = 'SET_PRICING_OPTION' ;
const SET_KEYWORDS = 'SET_KEYWORDS'

// 액션 생성 함수 정의
export const setPricingOption = (pricingOption) => ({ type: SET_PRICING_OPTION, pricingOption }) ;
export const setKeywords = (keywords) => ({ type: SET_KEYWORDS, keywords })

// 초기 상태 정의
const initialState = {
    pricingOption: [],
    keyWords: '',
} ;

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
                keyWords: action.keyWords
            }
        default:
            return state ;
    }
}