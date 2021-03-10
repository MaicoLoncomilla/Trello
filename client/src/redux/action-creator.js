import axios from 'axios';
import actions from './actions';
import { url } from '../utils/url';
const { SPINNER } = actions

const header = {
    headers: { 'x-access-token': localStorage.getItem('token')}
}
const actionCreator = {
    
    USER: "USER",
    login: function (data) {
        return dispatch => {
            const promise = axios.post(`${url}/user/login`, data)
            this._dispatchPromiseToken(promise, false, dispatch)
        }
    },
    loginWithToken: function(token){
       return dispatch => {
           const promise = axios.get(`${url}/user/${token}`)
           this._dispatchPromise(promise, this.USER, dispatch)
       } 
    },

    getUser: function(data) {
        return dispatch => {
            const promise = axios.get(`${url}/user/${data}`)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    register: function (data) {
        return dispatch => {
            const promise = axios.post(`${url}/user/register`, data)
            this._dispatchPromiseToken(promise, this.USER, dispatch)
        }
    },
    addImgUser: function(data, id) {
        return dispatch => {
            const promise = axios.post(`${url}/image/${id}`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    DASHBOARD: 'DASHBOARD',
    getDashboard: function(id){
        return dispatch => {
            const promise = axios.get(`${url}/dashboard/${id}`, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    newDashboard: function(data){
        return () => {
            axios.post(`${url}/dashboard/`, data, header)
        }
    },

    modifyDashboard: function(data){
        return dispatch =>{
            const promise = axios.put(`${url}/dashboard/`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch)
        }
    },

    deleteDashboard: function({uuid, idUser}){
        return dispatch => {
            const promise = axios.delete(`${url}/dashboard/${uuid}/${idUser}`, header)
            this._dispatchPromise(promise, false, dispatch)
        }
    },

    addMembers: function(data) {
        return dispatch => {
            const promise = axios.post(`${url}/dashboard/addMembers/`, data, header)
            this._dispatchPromise(promise, this.USER, dispatch, 'addMembers')
        }
    },
    
    COLUMN: 'COLUMN',
    newColumn: function(data) {
        return () => {
            axios.post(`${url}/column/`, data, header)
        }
    },
    getColumn: function(id){
        return dispatch => {
            const promise = axios.get(`${url}/column/${id}`)
            this._dispatchPromise(promise, this.COLUMN, dispatch, 'getColumn')
        }
    },

    modifyColumn: function(data) {
        return () => {
            axios.put(`${url}/column/`, data, header)
        }
    },
    deleteColumn: function({ uuid }){
        return () => {
            axios.delete(`${url}/column/${uuid}`, header)
        }
    },
    reorderTaskInColumn: function(data){
        return () => {
            axios.put(`${url}/column/reordertask/`, data, header)
        }
    },

    reorderColumnPriority: function(data) {
        return () => {
            axios.put(`${url}/column/reorderColumnPriority`, data, header)
        }
    },
    // -------------- Task -----------------
    newTask: function(data){
        return () => {
            axios.post(`${url}/task/`, data, header)
        }
    },

    modifyTask: function(data){
        return () => {
            axios.put(`${url}/task/`, data, header)
        }
    },

    deleteTask: function({ uuid }) {
        return () => {
            axios.delete(`${url}/task/${uuid}`, header)
        }
    },

    reorderTask: function(data) {
        return () => {
            axios.put(`${url}/task/reorder/`, data, header)
        }
    },

    addMemberInTask: function(data){
        return () => {
            axios.post(`${url}/task/addMember/`, data, header)
        }
    },

    removeMemberInTask: function(data){
        return () => {
            axios.put(`${url}/task/removeMemberInTask/`, data, header)
        }
    },

    addCoverImage: function(formData, data) {
        return dispatch => {
            const promise = axios.post(`${url}/imageTask/addCoverTask/${data.uuid}/${data.dashboardUuid}`, formData, header)
            this._dispatchPromise(promise, this.COLUMN, dispatch)
        }
    },
    removeCoverImage: function(uuid) {
        return () => {
            axios.delete(`${url}/imageTask/${uuid}`, header)
        }
    },

    // -------------- Commentary -----------------
    createComment: function(data){
        return () => {
            axios.post(`${url}/comment/`, data, header)
        }
    },

    modifyComment: function(data){
        return () => {
            axios.put(`${url}/comment/`, data, header)
        }
    },

    deleteComment: function({ uuid }){
        return () => {
            axios.delete(`${url}/comment/${uuid}`, header)
        }
    },
    
    _dispatchPromise: function(promise, type, dispatch, text){
        return promise
        .then(({data}) => {
            // console.log(data)
            if(text) {
                dispatch({ type: SPINNER, payload: false})
            }
            dispatch({type: type, payload: data})
        })
        .catch(err => {
            if(text){
                dispatch({ type: SPINNER, payload: false})
            }
            if(err.response){
                alert(`Error! \n ${err.response.data}`);
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