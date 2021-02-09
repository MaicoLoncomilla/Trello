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
    addImgUser: function(data, id) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/image/${id}`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    DASHBOARD: 'DASHBOARD',
    getDashboard: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${id}`)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    newDashboard: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/dashboard/`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    modifyDashboard: function(data){
        return dispatch =>{
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/dashboard/`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    deleteDashboard: function({id, idUser}){
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${id}/${idUser}`)
            this._dispatchPromise(promise, this.USER, dispatch)
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

    modifyColumn: function(data) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/column/`, data)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },
    deleteColumn: function({id, idDashboard}){
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/column/${id}/${idDashboard}`)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },
    reorderTaskInColumn: function(data){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/column/reordertask/`, data)
            this._dispatchPromise(promise, false, dispatch)
        }
    },
    // -------------- Task -----------------
    newTask: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/task/`, data)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    modifyTask: function(data){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/task/`, data)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    deleteTask: function({id, idDashboard}) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/task/${id}/${idDashboard}`)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    reorderTask: function(data) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/task/reorder/`, data)
            this._dispatchPromise(promise, false, dispatch)
        }
    },
    
    _dispatchPromise: function(promise, type, dispatch){
        return promise
        .then(({data}) => {
            // console.log(data)
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