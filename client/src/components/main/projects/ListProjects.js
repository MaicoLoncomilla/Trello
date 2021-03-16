import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

import { Button } from '../../../utils/components/Button';
import api from '../../../redux/action-creator';
import List from './list/List';

import sContainer from '../../../styles/container.module.css';

export default function ListProjects() {

    const dispatch = useDispatch()
    const { USER, DASHBOARD } = api;
    const dashboard = useSelector(state => state.dashboard)
    const user = useSelector(state => state.user)
    const [state, setState] = useState(user.dashboards)

    const onHandleNewProject = async () => {
        const { value: title } = await Swal.fire({
            title: 'New Project',
            input: 'text',
            inputPlaceholder: "Board Title...",
            inputAttributes: {
                maxlength: 30
            },
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Board need a title'
                }
            }
        })
        if (title) {
            const newProject = {
                idUser: user.id,
                uuid: uuidv4(),
                title: title,
                userRol: { state: "owner" },
                dashboardPriority: user?.dashboards.length + 1,
                users: [{
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user.id,
                    image: user.image,
                    userRol: user.userRol
                }]
            }
            user.dashboards.push(newProject)
            dispatch({ type: USER, payload: user })
            setState(state.concat(newProject))
            dispatch(api.newDashboard(newProject))
        }
    }

    const ModifyBoard = (title, index) => {
        user.dashboards[index].title = title
        dispatch({ type: USER, payload: user })

        let newArr = [...state]
        newArr[index].title = title
        setState(newArr)
    }

    const DeleteBoard = (position) => {
        user.dashboards.splice(position, 1)
        dispatch({ type: USER, payload: user })

        let newArr = [...state]
        newArr.splice(position, 1)
        setState(newArr)
    }

    useEffect(() => {
        if (user.id && !dashboard) {
            let id = dashboard ? dashboard.uuid : user.dashboards[0].uuid
            dispatch(api.getColumn(id))
            dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
        }
    }, [dispatch, user, DASHBOARD, dashboard, USER])

    return (
        <div className={sContainer.containerListProject}>
            <div className={sContainer.container}>
                <div className={sContainer.containerListAndNewProject}>
                    <p>Projects List</p>
                    <Button
                        s={"buttonBlueColumn"}
                        style={{ minWidth: 150 }}
                        onClick={onHandleNewProject}
                        label={"New Project"}
                    />
                </div>
                <div className={sContainer.containerListProjectMap}>
                    {user.dashboards.map((el, index) =>
                        <List
                            el={el}
                            key={index}
                            ModifyBoard={ModifyBoard}
                            DeleteBoard={DeleteBoard}
                        />)}
                </div>
            </div>
        </div>
    )
}