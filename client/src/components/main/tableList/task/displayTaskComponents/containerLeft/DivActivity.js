import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import useClickOutside from '../../../../../../utils/functions/useClickOutside';
import api from '../../../../../../redux/action-creator';
import { Comments, FormEditAddComment } from '../components';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import sContainer from '../../../../../../styles/container.module.css';


export default function DivActivity({ task, index, indexTask }){

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const image = user.image && `${user.image.url}`

    const { COLUMN } = api;
    const column = useSelector(state => state.column);

    const [ activeTextArea, setActiveTextArea ] = useState(false);
    const [ state, setState ] = useState({});

    const onChangeText = (name, value) => {
        setState({...state, [name]: value })
    } 
    let domnNode = useClickOutside(() => {
        setState({...state, comment: ""})
        setActiveTextArea(false)
    })

    const onHandleNewComment = () => {
        if(!state.comment) return;
        let newComment = {
            userId: user.id,
            comment: state.comment,
            taskUuid: task.uuid,
            uuid: uuidv4(),
            user: {
                image: { url: user?.image?.url, }, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        }

        column[index].tasks[indexTask].comments.push(newComment)
        dispatch({ type: COLUMN, payload: column })
        
        dispatch(api.createComment(newComment))
        setState({...state, comment: ""})
        setActiveTextArea(!activeTextArea)
    }

    return (
        <div className={sContainer.containerFlex}>
            <div className={sContainer.containerDescripcionIconH3}>
                <FormatListBulletedIcon />
                <h3>Activity</h3>
            </div>
            <FormEditAddComment
                image={image}
                state={state}
                onChangeText={onChangeText}
                setActiveTextArea={setActiveTextArea}
                activeTextArea={activeTextArea}
                onHandleNewComment={onHandleNewComment}
                domnNode={domnNode}
            />
            {column[index]?.tasks[indexTask]?.comments.map(el =>
                <Comments el={el} key={el.uuid} index={index} indexTask={indexTask} />
            )}
        </div>
    )
}