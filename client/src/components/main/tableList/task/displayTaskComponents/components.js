import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { TextArea } from '../../../../../utils/components/Input';
import api from '../../../../../redux/action-creator';

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import NotesIcon from '@material-ui/icons/Notes';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Avatar } from '@material-ui/core';

import sContainer from '../../../../../styles/container.module.css';

export function DivTitleColumn( { task , column }) {
    const [ activeInput, setActiveInput ] = useState(false);
    const [ dispatchInput, setDispatchInput ] = useState(false);
    const dispatch = useDispatch();
    const [ state, setState ] = useState({
        idDashboard: column.dashboardId,
        title: task.title,
        id: task.id
    });
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    };

    let inputRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if(inputRef.current.contains(e.target)){
                setActiveInput(true)
                setDispatchInput(true)
            }
            if(!inputRef.current.contains(e.target)) {
                setActiveInput(false)
                if(dispatchInput) {
                    if(state.title !== task.title){
                        dispatch(api.modifyTask(state))
                        setDispatchInput(false)
                    }
                }
            }
        } 
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });
    
    return (
        <div className={sContainer.containerTitleTask}>
            <div className={sContainer.containerIconH4} >
                <AssignmentOutlinedIcon />
                <div ref={inputRef} className={sContainer.containerInput}>
                    <TextArea
                        s={"textAreaDisplayTask"}
                        placeholder={"Enter a title for this card..."}
                        number={500}
                        value={state.title}
                        onChangeText={onChangeText}
                        type={"text"}
                        name={"title"}
                        autoFocus={true}
                        status={activeInput ? false : true}
                    />
                </div>
            </div>
            <p>In list <strong>{column.title}</strong></p>
        </div>
    )
}

export function DivMembers(){
    return (
        <div className={sContainer.containerMembers}>
            <h3>MEMBERS</h3>
            {/* un Map de los members */}
            <Avatar style={{width: 32, height: 32}}/>
        </div>
    )
}

export function DivDescription({ description }) {
    return (
        <div className={sContainer.containerDescripcion}>
            <div className={sContainer.containerDescripcionIconH3}>
                <NotesIcon/>
                <h3>Description</h3>
            </div>
            <div className={sContainer.containerP}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export function DivActivity(){
    return (
        <div className={sContainer.containerFlex}>
            <div className={sContainer.containerDescripcionIconH3}>
                <FormatListBulletedIcon/>
                <h3>Activity</h3>
            </div>
            <div className={sContainer.containerAddActivity}>
                <Avatar style={{width: 32, height: 32}}/>
                <p>Write a comment...</p>
                {/* <Input
                    s={"inputModifyTask"}
                    placeholder={"Title"}
                    onChangeText={onHandleChangeText}
                    number={30}
                    name={"title"}
                    type={"text"}
                /> */}
            </div>
        </div>
    )
}