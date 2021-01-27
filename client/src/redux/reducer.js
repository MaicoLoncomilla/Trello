import actionCreator from './action-creator';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';

const { USER, DASHBOARD, COLUMN, TASK } = actionCreator;

const initialState = {
    user: false,
    dashboard: [],
    column: [],
    task: []
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
        case TASK: 
            return {
                ...state,
                task: action.payload
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