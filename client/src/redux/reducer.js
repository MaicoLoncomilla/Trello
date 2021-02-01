import actionCreator from './action-creator';
import actions from './actions'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';

const { USER, DASHBOARD, COLUMN } = actionCreator;
const { BUTTONTASKACTIVE, BUTTONNEWPROJECT } = actions

const initialState = {
    user: false,
    dashboard: [],
    column: [],
    buttonTaskActive: false,
    buttonNewProject: false
}

const reducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.payload
            } 
        case DASHBOARD:
            return {
                ...state,
                dashboard: action.payload
            }
        case COLUMN:
            return {
                ...state,
                column: action.payload
            }
        case BUTTONTASKACTIVE:
            return {
                ...state,
                buttonTaskActive: action.payload
            }
        case BUTTONNEWPROJECT:
            return {
                ...state,
                buttonNewProject: action.payload
            }
        default:
            return {...state}
    }
}

export default () => {
    const persistConfig = {
        key: 'root',
        storage,
    }
    const persistedReducer = persistReducer(persistConfig, reducer)
    
    const store = createStore(
        persistedReducer,
        applyMiddleware(thunk, createLogger())
    );
    const persistor = persistStore(store)
    return { store, persistor }
}