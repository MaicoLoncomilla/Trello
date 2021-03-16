import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import actionCreator from './action-creator';
import actions from './actions';

const { USER, DASHBOARD, COLUMN } = actionCreator;
const { DISPLAYTASK, LISTADDTOCARD, SPINNER } = actions

const initialState = {
    user: false,
    dashboard: false,
    column: [],
    displayTask: false,
    listAddToCard: false,
    spinner: false
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
        case DISPLAYTASK:
            return {
                ...state,
                displayTask: action.payload
            }
        case LISTADDTOCARD:
            return {
                ...state,
                listAddToCard: action.payload
            }
        case SPINNER:
            return {
                ...state,
                spinner: action.payload
            }
        default:
            return {...state}
    }
}

export default () => {
    const store = createStore(
        reducer,
        applyMiddleware(thunk)
    );
    return { store }
}