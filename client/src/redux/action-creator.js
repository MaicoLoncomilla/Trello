import axios from 'axios';

const actionCreator = {

    USER: "USER",
    login: function (data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data)

            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    register: function (data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    DASHBOARD: 'DASHBOARD',
    getDashboard: function(email){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${email}`)
            this._dispatchPromise(promise, this.DASHBOARD, dispatch)
        }
    },

    COLUMN: 'COLUMN',
    newColumn: function(data, id) {
        const dataColumn = { id: id, title: data.title, description: data.description}
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/column/`, dataColumn)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },
    getColumn: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/column/${id}`)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    TASK: 'TASK',
    newTask: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/task/`, data)
            this._dispatchPromise(promise, this.TASK, dispatch)
        }
    },
    getTask: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/task/${id}`)
            this._dispatchPromise(promise, this.TASK, dispatch)
        }
    },
    _dispatchPromise: function(promise, type, dispatch){
        return promise
        .then(({data}) => {
            console.log(data)
            dispatch({type: type, payload: data})
        })
        .catch(err => {
            if(err.response){
                alert(`Error! \n Status: ${err.response.status} \n ${err.response.data}`);
            }else{
                alert(`Error! ${err}`);
            }
        })
    }
}

export default actionCreator;