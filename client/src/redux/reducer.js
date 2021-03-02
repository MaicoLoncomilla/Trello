import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import actionCreator from './action-creator';
import actions from './actions';

const { USER, DASHBOARD, COLUMN } = actionCreator;
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
    const store = createStore(
        reducer,
        applyMiddleware(thunk)
    );
    return { store }
}