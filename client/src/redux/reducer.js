import actionCreator from './action-creator';
import actions from './actions'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';

const { USER, DASHBOARD, COLUMN, TOKEN } = actionCreator;
const { BUTTONTASKACTIVE, BUTTONNEWPROJECT, BUTTONMODIFYPROJECT, DISPLAYTASK, ACTIVEFORMADDMEMBERS, LISTADDTOCARD } = actions

const initialState = {
    user: false,
    dashboard: false,
    column: [],
    buttonTaskActive: false,
    buttonNewProject: false,
    buttonModifyProject: false,
    displayTask: false,
    activeFormAddMembers: false,
    listAddToCard: false,
}

const reducer = (state = initialState, action) => {
    // console.log(action.payload)
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
        case BUTTONMODIFYPROJECT:
            return {
                ...state,
                buttonModifyProject: action.payload
            }
        case DISPLAYTASK:
            return {
                ...state,
                displayTask: action.payload
            }
        case ACTIVEFORMADDMEMBERS:
            return {
                ...state,
                activeFormAddMembers: action.payload
            }
        case LISTADDTOCARD:
            return {
                ...state,
                listAddToCard: action.payload
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