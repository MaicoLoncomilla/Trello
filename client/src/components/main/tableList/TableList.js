import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import api from '../../../redux/action-creator';
import Columns from './columns/Columns';
import useClickOutside from '../../../utils/functions/useClickOutside';

import sContainer from '../../../styles/container.module.css';
import sForm from '../../../styles/form.module.css';
import sButton from '../../../styles/button.module.css';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from '@material-ui/core';
import { TextArea } from '../../../utils/components/Input';

export default function TableList(){
    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`
    const column = useSelector(state => state.column)
    const columnCopy = useSelector(state => state.columnCopy)
    const { COLUMN, DASHBOARD, COLUMNCOPY } = api
    const dashboard = useSelector(state => state.dashboard)
    const [ activeInput, setActiveInput ] = useState(false)
    const [ state, setState ] = useState({})
    
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
        const newColumn = {
            title: state.title,
            id: column.length + 1,
            dashboardId: dashboard ? dashboard.id : user.dashboards[0].id,
            tasks: [],
        }
        dispatch({
            type: COLUMN,
            payload: Object.values({
                ...column,
                [newColumn.id]: newColumn
            })
        })
        // const id = dashboard ? dashboard.id : user.dashboards[0].id
        // const dataColumn = { id: id, title: data.title, description: data.description}
        const dataColumn ={
            id: dashboard ? dashboard.id : user.dashboards[0].id,
            title: state.title,
            description: state.description,
        }
        axios.post(`${process.env.REACT_APP_API_URL}/column/`, dataColumn)
        .then(({data}) => {
            dispatch({ type: COLUMNCOPY, payload: data })
            console.log(data)
            dispatch({
                type: COLUMN,
                payload: Object.values({
                    ...column,
                    [newColumn.id]: {
                        ...newColumn,
                        id: data[data.length - 1].id
                    }
                })
            })
            // console.log(data[data.length - 1])
        })


        // dispatch(api.newColumn(state, id))
        setState({})
        onHandleInputAddTask()
    }
    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!result.destination) return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return
        }
        if (source.droppableId !== destination.droppableId) {

            const sourceColumn = column[source.droppableId.split(" ")[0]]
            const destinationColumn = column[destination.droppableId.split(" ")[0]]
            // console.log(sourceColumn)
            // console.log(destinationColumn)
            const sourceTasks = [...sourceColumn.tasks]
            const destinationTasks = [...destinationColumn.tasks]

            // sourceTasks[source.index].columnId = columnCopy[destination.droppableId.split(" ")[0]].id
            console.log(sourceTasks)
            
            const [removed] = sourceTasks.splice(source.index, 1);
            console.log(removed)
            // removed.columnId = columnCopy[destination.droppableId.split(" ")[0]].id
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
            console.log(removed)
            dispatch(api.reorderTaskInColumn(removed))

            // const sourceColumn = column[source.droppableId.split(" ")[0]]
            // const destinationColumn = column[destination.droppableId.split(" ")[0]]
            // console.log(sourceColumn)
            // console.log(destinationColumn)
            // const sourceTasks = [...sourceColumn.tasks]
            // const destinationTasks = [...destinationColumn.tasks]

            // const [removed] = sourceTasks.splice(source.index, 1);
            // removed.columnId = destinationColumn.id
            // destinationTasks.splice(destination.index, 0, removed)

            // if (column[source.droppableId.split(" ")[0]].taskPriority !== destinationTasks[0].taskPriority) {
            //     destinationTasks.map((el, index) =>
            //         el.taskPriority = index + 1
            //     )
            // }

            // dispatch({
            //     type: COLUMN, payload: Object.values({
            //         ...column,
            //         [source.droppableId.split(" ")[0]]: {
            //             ...sourceColumn,
            //             tasks: sourceTasks
            //         },
            //         [destination.droppableId.split(" ")[0]]: {
            //             ...destinationColumn,
            //             tasks: destinationTasks
            //         }
            //     })
            // })
            // dispatch(api.reorderTaskInColumn(removed))

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

    let domnNode = useClickOutside(() => {
        setActiveInput(false)
    })
    
    return (
        <>
            {!user.firstName && <Redirect to="/login" />}

            <div className={sContainer.containerFlexTableList}>
                <p>Members:</p>
                <Avatar style={{ width: 32, height: 32 }} src={image} />
            </div>
            <div className={sContainer.containerTableListBody} >
                <DragDropContext onDragEnd={result => onDragEnd(result)}>
                    {column?.map((el, index) => 
                        <Columns
                            key={index}
                            id={el.id}
                            index={index}
                            title={el.title}
                            task={el.tasks ? el.tasks?.sort((a, b) => a.taskPriority - b.taskPriority) : el.tasks?.sort((a, b) => a.id - b.id) }
                            dashboardId={el.dashboardId}
                        />
                    
                    )}
                </DragDropContext>
                <div ref={domnNode}>
                    {activeInput ?
                        <form
                            className={sForm.formAddColumn}
                            onSubmit={(e) => onHandleSubmit(e)}>
                            <TextArea
                                s={"textAreaAddColumn"}
                                autoFocus={true}
                                placeholder={"Enter list title..."}
                                number={255}
                                onChangeText={onChangeText}
                                value={state.title}
                                name={'title'}
                            />
                            <div>
                                <button
                                    className={sButton.buttonGreen}
                                    type="submit">Add List
                                </button>
                                <CloseIcon
                                    className={sButton.buttonIcon}
                                    onClick={() => onHandleInputAddTask()}
                                />
                            </div>
                        </form>
                        :
                        <button
                            style={{marginRight: 20}}
                            className={sButton.buttonBlueColumn}
                            onClick={() => onHandleInputAddTask()}>
                            <AddIcon fontSize="small" />
                            Add another List
                        </button>
                    }
                </div>
            </div>
        </>
    )
}