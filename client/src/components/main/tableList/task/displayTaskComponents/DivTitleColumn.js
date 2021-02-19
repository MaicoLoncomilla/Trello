import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextArea } from '../../../../../utils/components/Input';
import api from '../../../../../redux/action-creator';

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

import sContainer from '../../../../../styles/container.module.css';

export default function DivTitleColumn({ task , columnSelected, index, indexTask }){
    const [ activeInput, setActiveInput ] = useState(false);
    const [ dispatchInput, setDispatchInput ] = useState(false);
    const column = useSelector(state => state.column)
    const { COLUMN } = api
    const dispatch = useDispatch();
    const [ state, setState ] = useState({
        title: task.title,
        uuid: task.uuid
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
                        column[index].tasks[indexTask].title = state.title
                        dispatch({ type: COLUMN, payload: column })
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
            <p>In list <strong>{columnSelected?.title}</strong></p>
        </div>
    )
}