import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../../redux/action-creator';
import { Input } from '../../../../../utils/components/Input';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import sContainer from '../../../../../styles/container.module.css'
import sButton from '../../../../../styles/button.module.css'

export default function TitleColumn({ title, id, idDashboard, index }) {
    const [ activeInput, setActiveInput ] = useState(false);
    const [ dispatchInput, setDispatchInput ] = useState(false)
    const [ activeVertIcon, setActiveVertIcon ] = useState(false)
    const column = useSelector(state => state.column)
    const dispatch = useDispatch()
    const [ titleColumn, setTitleColumn ] = useState({
        title: title,
        id: id,
        idDashboard: idDashboard
    })
    const onChangeTextColumn = (name, value) => {
        setTitleColumn({ ...titleColumn, [name]: value })
    }
    const onHandleDeleteColumn = () => {
        const data = {
            id: column[index].id,
            idDashboard: column[index].dashboardId
        }
        setActiveVertIcon(!activeVertIcon)
        dispatch(api.deleteColumn(data))
    }

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
                    dispatch(api.modifyColumn(titleColumn))
                    setDispatchInput(false)
                }
            }
        } 
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });

    return (
        < >
            <div className={sContainer.containerButtonP}ref={inputRef} >
                <Input
                    s={"inputDisplayTask"}
                    placeholder={"Enter list title..."}
                    number={25}
                    value={titleColumn.title}
                    onChangeText={onChangeTextColumn}
                    type={"text"}
                    name={"title"}
                    autoFocus={true}
                    status={activeInput ? false : true}
                />
            </div>
            <div
                style={{ cursor: "pointer" }}
                onClick={() => setActiveVertIcon(!activeVertIcon)}>
                <MoreVertIcon />
            </div>
            {activeVertIcon &&
                <div className={sContainer.containerActiveVertIcon}>
                    <button
                        className={sButton.buttonVerticalIcons}
                        onClick={() => onHandleDeleteColumn()}>Delete Column
                </button>
                </div>}
        </>
    )
}