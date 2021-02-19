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

    deleteDashboard: function({uuid, idUser}){
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${uuid}/${idUser}`)
            this._dispatchPromise(promise, false, dispatch)
        }
    },
    
    COLUMN: 'COLUMN',
    newColumn: function(data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/column/`, data)
            this._dispatchPromise(promise, false, dispatch)
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
            this._dispatchPromise(promise, false, dispatch)
        }
    },
    deleteColumn: function({uuid, dashboardId}){
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/column/${uuid}/${dashboardId}`)
            this._dispatchPromise(promise, false, dispatch)
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
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    modifyTask: function(data){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/task/`, data)
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    deleteTask: function({id, idDashboard}) {
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/task/${id}/${idDashboard}`)
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    reorderTask: function(data) {
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/task/reorder/`, data)
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    // -------------- Commentary -----------------
    createComment: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/comment/`, data)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    modifyComment: function(data){
        return dispatch => {
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/comment/`, data)
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    deleteComment: function({ id, dashboardId }){
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/comment/${id}/${dashboardId}`)
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