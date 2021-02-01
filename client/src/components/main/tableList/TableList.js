import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creator';
import Columns from './columns/Columns';

import sContainer from '../../../styles/container.module.css';
import sForm from '../../../styles/form.module.css';
import sButton from '../../../styles/button.module.css';
import sInput from '../../../styles/input.module.css';

import DescriptionIcon from '@material-ui/icons/Description';
import CloseIcon from '@material-ui/icons/Close';

export default function TableList(){
    const user = useSelector(state => state.user)
    const column = useSelector(state => state.column)
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
        let id = user.dashboards[0].id
        dispatch(api.newColumn(state, id))
        onHandleInputAddTask()
    }
    useEffect(() => {
        if(user.id){
            dispatch(api.getColumn(user.dashboards[0].id))
        }
    },[])
    return(
        <>
            {!user.firstName && <Redirect to="/login"/>}
            <div className={sContainer.containerFlexTableList}>
                <div className={sContainer.containerTitleDashboard}>
                    <p>{user && user.dashboards[0]?.title}</p>
                </div>
                <DescriptionIcon />
                <span>|</span>
                <p>Avatares del equipo</p>
            </div>
            <div className={sContainer.containerTableListBody}>
                { column?.map((el, index) =>
                    <Columns
                        key={index}
                        id={el.id}
                        index={index}
                        title={el.title}
                        task={el.tasks.sort((a,b) => a.id - b.id)}
                        dashboardId={el.dashboardId}
                    />)}

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
                                className={sButton.buttonSubmitAddTask}
                                type="submit">Add List</button>
                            <CloseIcon
                                className={sButton.buttonIconClose}
                                onClick={() => onHandleInputAddTask()}
                            />
                        </div>
                    </form>
                    :
                    <button 
                    className={sButton.buttonAddColumn}
                    onClick={() => onHandleInputAddTask()}>+ Add another List</button>
                }
            </div>
        </>
    )
}