import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../../redux/action-creator';
import { DragDropContext } from 'react-beautiful-dnd';
import Columns from './columns/Columns';

import sContainer from '../../../styles/container.module.css';
import sForm from '../../../styles/form.module.css';
import sButton from '../../../styles/button.module.css';
import sInput from '../../../styles/input.module.css';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from '@material-ui/core';

export default function TableList(){
    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`
    const column = useSelector(state => state.column)
    const [ columnState, setColumnState ] = useState(column)
    const { COLUMN, DASHBOARD } = api
    const dashboard = useSelector(state => state.dashboard)
    const [ activeInput, setActiveInput ] = useState(false)
    const [ state, setState ] = useState({
        title: "",
        description: "",
    })
    
    
    const dispatch = useDispatch()
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    const onHandleInputAddTask = () => {
        setActiveInput(!activeInput)
    }

    const onHandleSubmit = (e) => {
        e.preventDefault()
        if (!state.title) {
            return alert('The list should have a title')
        }
        const id = dashboard ? dashboard.id : user.dashboards[0].id
        dispatch(api.newColumn(state, id))
        onHandleInputAddTask()
    }
    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!result.destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return
        }
        console.log(destination.index)
        if (source.droppableId !== destination.droppableId) {

            const sourceColumn = column[source.droppableId.split(" ")[0]]
            const destinationColumn = column[destination.droppableId.split(" ")[0]]
            const sourceTasks = [...sourceColumn.tasks]
            const destinationTasks = [...destinationColumn.tasks]

            const [removed] = sourceTasks.splice(source.index, 1);
            removed.columnId = destinationColumn.id
            destinationTasks.splice(destination.index, 0, removed)

            if (column[source.droppableId.split(" ")[0]].taskPriority !== destinationTasks[0].taskPriority) {
                destinationTasks.map((el, index) =>
                    el.taskPriority = index + 1
                )
            }

            dispatch({
                type: COLUMN, payload: Object.values({
                    ...column,
                    [source.droppableId.split(" ")[0]]: {
                        ...sourceColumn,
                        tasks: sourceTasks
                    },
                    [destination.droppableId.split(" ")[0]]: {
                        ...destinationColumn,
                        tasks: destinationTasks
                    }
                })
            })
            dispatch(api.reorderTaskInColumn(removed))

        } else {
            const newColumn = column[source.droppableId.split(" ")[0]];
            const copiedTasks = [...newColumn.tasks]
            const [removed] = copiedTasks.splice(source.index, 1)
            copiedTasks.splice(destination.index, 0, removed)

            if (column[source.droppableId.split(" ")[0]].taskPriority !== copiedTasks[0].taskPriority) {
                copiedTasks.map((el, index) =>
                    el.taskPriority = index + 1
                )
            }
            const data = {
                tasks: copiedTasks,
                idDashboard: column[0].dashboardId
            }
            dispatch({
                type: COLUMN, payload: Object.values({
                    ...column,
                    [source.droppableId.split(" ")[0]]: {
                        ...newColumn,
                        tasks: copiedTasks
                    }
                })
            })
            dispatch(api.reorderTask(data))
        }
    }

    useEffect(() => {
        if (user.id) {
            let id = dashboard ? dashboard.id : user.dashboards[0].id
            dispatch(api.getColumn(id))
            if (!dashboard) {
                dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
            }
        }
    }, [user])

    useEffect(() => {
        setColumnState(column)
    }, [column])

    
    return (
        <>
            {!user.firstName && <Redirect to="/login" />}

            <div className={sContainer.containerFlexTableList}>
                <p>Members:</p>
                <Avatar src={image} />
            </div>
            <div className={sContainer.containerTableListBody}>
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {column.map((el, index) =>
                        <Columns
                            key={index}
                            id={el.id}
                            index={index}
                            title={el.title}
                            task={el.tasks && el.tasks.sort((a,b) => a.taskPriority - b.taskPriority)}
                            dashboardId={el.dashboardId}
                        />
                    )}
                </DragDropContext>
                {activeInput ?
                    <form
                        className={sForm.formAddColumn}
                        onSubmit={(e) => onHandleSubmit(e)}>
                        <input
                            className={sInput.inputFormAddColumn}
                            autoFocus={true}
                            placeholder="Enter list title..."
                            maxLength={50}
                            onChange={(e) => onChangeText("title", e.target.value)}
                            value={state.title}
                        />
                        <div>
                            <button
                                className={sButton.buttonGreen}
                                type="submit">Add List</button>
                            <CloseIcon
                                className={sButton.buttonIcon}
                                onClick={() => onHandleInputAddTask()}
                            />
                        </div>
                    </form>
                    :
                    <button
                        className={sButton.buttonBlueColumn}
                        onClick={() => onHandleInputAddTask()}>
                        <AddIcon fontSize="small" />
                        Add another List
                    </button>
                }
            </div>
        </>
    )
}