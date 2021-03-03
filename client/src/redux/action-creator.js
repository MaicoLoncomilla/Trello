import axios from 'axios';

const header = {
    headers: { 'x-access-token': localStorage.getItem('token')}
}
const actionCreator = {
    
    USER: "USER",
    login: function (data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data)
            this._dispatchPromiseToken(promise, false, dispatch)
        }
    },
    loginWithToken: function(token){
        console.log(token)
       return dispatch => {
           const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${token}`)
           this._dispatchPromise(promise, this.USER, dispatch)
       } 
    },

    getUser: function(data) {
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${data}`)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    register: function (data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data)
            this._dispatchPromiseToken(promise, this.USER, dispatch)
        }
    },
    addImgUser: function(data, id) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/image/${id}`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    DASHBOARD: 'DASHBOARD',
    getDashboard: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/dashboard/${id}`, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    newDashboard: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/dashboard/`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    modifyDashboard: function(data){
        return dispatch =>{
            const promise = axios.put(`${process.env.REACT_APP_API_URL}/dashboard/`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    deleteDashboard: function({uuid, idUser}){
        return dispatch => {
            const promise = axios.delete(`${process.env.REACT_APP_API_URL}/dashboard/${uuid}/${idUser}`, header)
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    addMembers: function(data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/dashboard/addMembers/`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },
    
    COLUMN: 'COLUMN',
    newColumn: function(data) {
        return () => {
            axios.post(`${process.env.REACT_APP_API_URL}/column/`, data, header)
        }
    },
    getColumn: function(id){
        return dispatch => {
            const promise = axios.get(`${process.env.REACT_APP_API_URL}/column/${id}`, header)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    modifyColumn: function(data) {
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/column/`, data, header)
        }
    },
    deleteColumn: function({ uuid }){
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/column/${uuid}`, header)
        }
    },
    reorderTaskInColumn: function(data){
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/column/reordertask/`, data, header)
        }
    },
    // -------------- Task -----------------
    newTask: function(data){
        return () => {
            axios.post(`${process.env.REACT_APP_API_URL}/task/`, data, header)
        }
    },

    modifyTask: function(data){
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/task/`, data, header)
        }
    },

    deleteTask: function({ uuid }) {
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/task/${uuid}`, header)
        }
    },

    reorderTask: function(data) {
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/task/reorder/`, data, header)
        }
    },
    addMemberInTask: function(data){
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/task/addMember/`, data, header)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },

    addCoverImage: function(formData, data) {
        return dispatch => {
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/imageTask/addCoverTask/${data.uuid}/${data.dashboardUuid}`, formData, header)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },
    removeCoverImage: function(uuid) {
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/imageTask/${uuid}`, header)
        }
    },

    // -------------- Commentary -----------------
    createComment: function(data){
        return () => {
            axios.post(`${process.env.REACT_APP_API_URL}/comment/`, data, header)
        }
    },

    modifyComment: function(data){
        return () => {
            axios.put(`${process.env.REACT_APP_API_URL}/comment/`, data, header)
        }
    },

    deleteComment: function({ uuid }){
        return () => {
            axios.delete(`${process.env.REACT_APP_API_URL}/comment/${uuid}`, header)
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
    },

    _dispatchPromiseToken: function(promise, type, dispatch){
        return promise 
        .then(({data}) => {
            dispatch({ type: this.USER, payload: data.user })
            localStorage.setItem('token', data.token)
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