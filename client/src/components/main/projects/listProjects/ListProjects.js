import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../../../redux/action-creator'
import actions from '../../../../redux/actions'

export default function ListProjects(){

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const ListProyect = ( title, id ) => {
        const onHandleDeleteProject = (id) => {
            const data = { id: id, idUser: user.id }
            dispatch(api.deleteDashboard(data))
        }
        return (
            <div key={id}>
                <p>{title}</p>
                <div>
                    <button onClick={() => onHandleDeleteProject(id)}>Delete</button>
                </div>
            </div>
        )
    } 
    return (
        <>
            {!user.firstName && <Redirect to="/login" />}
            <div>
                <p>Your Proyects</p>
                <div>
                    {user.dashboards?.map(el =>
                        ListProyect(el.title, el.id))}
                </div>
            </div>
        </>
    )
}

