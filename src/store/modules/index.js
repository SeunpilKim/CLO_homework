import { combineReducers } from 'redux' ;
import condition from './condition' ;

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["condition"]
};

export default persistReducer(persistConfig, combineReducers({ condition }));