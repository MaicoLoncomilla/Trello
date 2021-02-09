import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creator';
import actions from '../../../redux/actions';
import Columns from './columns/Columns';
import { DragDropContext } from 'react-beautiful-dnd';

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
    // const columnState = column
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
        if(!state.title){
            return alert('The list should have a title')
        }
        const id = dashboard ? dashboard.id : user.dashboards[0].id
        dispatch(api.newColumn(state, id))
        onHandleInputAddTask()
    }
        // Drag an drop functions
        const onDragEnd = (result) => {
            const { destination, source } = result;
            if(!result.destination) return;
            if(destination.droppableId === source.droppableId && 
                destination.index === source.index){
                return
            }
            if(source.droppableId !== destination.droppableId){
    
                const sourceColumn = column[source.droppableId]
                const destinationColumn = column[destination.droppableId]
                const sourceTasks = [...sourceColumn.tasks]
                const destinationTasks = [...destinationColumn.tasks]
    
                const [removed] = sourceTasks.splice(source.index, 1);
                removed.columnId = destinationColumn.id
                dispatch(api.reorderTaskInColumn(removed))
                destinationTasks.splice(destination.index, 0, removed)
    
                if (column[source.droppableId].taskPriority !== destinationTasks[0].taskPriority) {
                    destinationTasks.map((el, index) =>
                        el.taskPriority = index + 1
                    )
                }
                setColumnState(Object.values({
                    ...columnState,
                    [source.droppableId]: {
                        ...sourceColumn,
                        tasks: sourceTasks
                    },
                    [destination.droppableId]: {
                        ...destinationColumn,
                        tasks: destinationTasks
                    }
                }))
                dispatch({ type: COLUMN, payload: columnState })
                
            }else {
                const newColumn = columnState[source.droppableId];
                const copiedTasks = [...newColumn.tasks]
                const [removed] = copiedTasks.splice(source.index, 1)
                copiedTasks.splice(destination.index, 0, removed)
    
                if (columnState[source.droppableId].taskPriority !== copiedTasks[0].taskPriority) {
                    copiedTasks.map((el, index) =>
                        el.taskPriority = index + 1
                    )
                }
                setColumnState(Object.values({
                    ...columnState,
                    [source.droppableId]: {
                        ...newColumn,
                        tasks: copiedTasks
                    }
                }))   
                const data = {
                    tasks : copiedTasks,
                    idDashboard: column[0].dashboardId
                }
                dispatch({ type: COLUMN, payload: columnState })
                dispatch(api.reorderTask(data))
            }
        }

    useEffect(() => {
        if (user.id) {
            let id = dashboard ? dashboard.id : user.dashboards[0].id
            dispatch(api.getColumn(id))
        }
        if(!dashboard) {
            dispatch({ type: DASHBOARD, payload: user.dashboards[0] })
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
                            task={el.tasks[index]?.taskPriority ? el.tasks.sort((a, b) => 
                                a.taskPriority - b.taskPriority) : el.tasks}
                            // task={el.tasks.sort((a, b) => a.id - b.id)}
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