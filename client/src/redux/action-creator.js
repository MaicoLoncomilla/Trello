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

    addMembers: function(data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/dashboard/addMembers/`, data)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    
    COLUMN: 'COLUMN',
    newColumn: function(data) {
        return () => {
            axios.post(`${process.env.REACT_APP_API_URL}/column/`, data)
        }
    },
    getColumn: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/column/${id}`)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    modifyColumn: function(data) {
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/column/`, data)
        }
    },
    deleteColumn: function({ uuid }){
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/column/${uuid}`)
        }
    },
    reorderTaskInColumn: function(data){
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/column/reordertask/`, data)
        }
    },
    // -------------- Task -----------------
    newTask: function(data){
        return () => {
            axios.post(`${process.env.REACT_APP_API_URL}/task/`, data)
        }
    },

    modifyTask: function(data){
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/task/`, data)
        }
    },

    deleteTask: function({ uuid }) {
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/task/${uuid}`)
        }
    },

    reorderTask: function(data) {
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/task/reorder/`, data)
        }
    },
    addMemberInTask: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/task/addMember/`, data)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    addCoverImage: function(formData, data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/imageTask/addCoverTask/${data.uuid}/${data.dashboardUuid}`, formData)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },
    removeCoverImage: function(uuid) {
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/imageTask/${uuid}`)
        }
    },

    // -------------- Commentary -----------------
    createComment: function(data){
        return () => {
            axios.post(`${process.env.REACT_APP_API_URL}/comment/`, data)
        }
    },

    modifyComment: function(data){
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/comment/`, data)
        }
    },

    deleteComment: function({ uuid }){
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/comment/${uuid}`)
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