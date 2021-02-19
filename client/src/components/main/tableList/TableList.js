import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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
    const { COLUMN, DASHBOARD } = api
    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`
    const column = useSelector(state => state.column)
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
            uuid: uuidv4(),
            dashboardUuid: dashboard ? dashboard.uuid : user.dashboards[0].uuid,
            tasks: [],
            columnPriority: column.length
        }
        dispatch({
            type: COLUMN,
            payload: Object.values({
                ...column,
                [newColumn.id]: newColumn
            })
        })

        dispatch(api.newColumn(newColumn))
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

            const sourceTasks = [...sourceColumn.tasks]
            const destinationTasks = [...destinationColumn.tasks]

            const [removed] = sourceTasks.splice(source.index, 1);
            removed.columnUuid = column[destination.droppableId.split(" ")[0]].uuid

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
                dashboardUuid: column[0].dashboardUuid
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
            let id = dashboard ? dashboard.uuid : user.dashboards[0].uuid
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
                            uuid={el.uuid}
                            index={index}
                            title={el.title}
                            task={el.tasks?.sort((a, b) => a.taskPriority - b.taskPriority)}
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