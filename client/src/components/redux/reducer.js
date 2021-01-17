import actionCreator from './action-creator';

const { TEST } = actionCreator;

const initialState = {
    user: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                user: action.payload
            } 
        default:
            return {...state}
    }
}
export default reducer