import React from 'react';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Avatar } from '@material-ui/core';

import sContainer from '../../../../../styles/container.module.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../../redux/action-creator';

export function DivMembers(){

    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`

    return (
        <div className={sContainer.containerMembers}>
            <h3>MEMBERS</h3>
            {/* un Map de los members */}
            <Avatar style={{width: 32, height: 32}} src={image}/>
        </div>
    )
}

export function Comments({ el, index, indexTask }){

    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`
    const dashboard = useSelector(state => state.dashboard);
    const column = useSelector(state => state.column)
    const { COLUMN } = api;
    const dispatch = useDispatch()
    const onHandleDeleteComment = (comment) => {


        let indexComment = column[index].tasks[indexTask].comments.findIndex(elComments => elComments.id === comment.id)

        column[index].tasks[indexTask].comments.splice(indexComment, 1)
        dispatch({ type: COLUMN, payload: Object.values(column) })
        
        const data = {
            id: comment.id,
            dashboardUuid: dashboard ? dashboard.uuid : user.dashboards[0].uuid,
        }
        dispatch(api.deleteComment(data))
    }
    return (
        <div className={sContainer.containerComments} key={index}>
            <Avatar style={{ width: 32, height: 32 }} src={image}/>
            <div className={sContainer.containerUserComment}>
                <h5>{user.firstName} {user.lastName}</h5>
                <div className={sContainer.commentary}>
                    <p>{el.comment}</p>
                </div>
                <button>Edit</button>
                <button onClick={() => onHandleDeleteComment(el)}>Delete</button>
            </div>
        </div>
    )
}