import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../../../redux/action-creator';
import actions from '../../../../../redux/actions';
import dataURLtoFile from '../../../../../utils/functions/dataURLtoFile';
import useClickOutside from '../../../../../utils/functions/useClickOutside';
import { Button, ButtonComment } from '../../../../../utils/components/Button';
import { H3 } from '../../../../../utils/components/Titles';
import UserAvatar from '../../../../../utils/components/UserAvatar';
import { TextArea } from '../../../../../utils/components/Input';
import FormColumn from '../../columns/components/FormColumn';

import CloseIcon from '@material-ui/icons/Close';

import sContainer from '../../../../../styles/container.module.css';
import sButton from '../../../../../styles/button.module.css';

export function Comments({ el, index, indexTask }){

    const column = useSelector(state => state.column)
    const { COLUMN } = api;
    const [state, setState ] = useState({
        title: el.comment
    })
    const onChangeText = (name, value) => {
        setState({...state, [name]: value })
    }
    const dispatch = useDispatch()
    const [ activeFormColumn, setActiveFormColumn ] = useState(false)
    const onHandleDeleteComment = (comment) => {

        let indexComment = column[index].tasks[indexTask].comments.findIndex(elComments => elComments.id === comment.id)

        column[index].tasks[indexTask].comments.splice(indexComment, 1)
        dispatch({ type: COLUMN, payload: Object.values(column) })
        
        const data = { uuid: comment.uuid }
        dispatch(api.deleteComment(data))
    }
    const onHandleEditComment = (e) => { 
        e.preventDefault()   
        if(state.title === el.comment) return
        let newState = {
            comment: state.title,
            uuid: el.uuid
        }
        let indexComment = column[index].tasks[indexTask].comments.findIndex(elComments => elComments.uuid === el.uuid)
        column[index].tasks[indexTask].comments[indexComment].comment = newState.comment
        dispatch({ type: COLUMN, payload: column})
        
        setActiveFormColumn(!activeFormColumn)
        dispatch(api.modifyComment(newState))
    }
    let domnNode = useClickOutside(() => {
        setActiveFormColumn(false)
    })

    return (
        <div className={sContainer.containerComments} key={el.uuid}>
            <UserAvatar size={32} image={el.user?.image?.url} />
            <div className={sContainer.containerUserComment} ref={domnNode}>
                <h5>{el.user?.firstName} {el.user?.lastName}</h5>
                {activeFormColumn ?
                    <FormColumn
                        s={"formEditComment"}
                        state={state}
                        setActiveFormColumn={setActiveFormColumn}
                        activeFormColumn={activeFormColumn}
                        onChangeText={onChangeText}
                        onSubmit={onHandleEditComment}
                        placeholder={"You haven't typed anything!"}
                        label={"Save"}
                    />
                    :
                    <>
                        <div className={sContainer.commentary}>
                            <p>{el.comment}</p>
                        </div>
                        <ButtonComment
                            s={"buttonCommentary"}
                            label={"Edit"}
                            onClick={setActiveFormColumn}
                            el={!activeFormColumn}
                        />
                        <ButtonComment
                            s={"buttonCommentary"}
                            label={"Delete"}
                            onClick={onHandleDeleteComment}
                            el={el}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export function FormEditAddComment({ state, image, onChangeText, activeTextArea, setActiveTextArea, onHandleNewComment, domnNode }) {
    return (
        <div className={sContainer.containerAddActivity}>
            <UserAvatar size={32} image={image} />
            <div
                className={activeTextArea ? sContainer.containerNewCommentActive : sContainer.containerTextAreaNewComment}
                onClick={() => setActiveTextArea(true)}
                ref={domnNode}>
                <TextArea
                    placeholder={"Write a comment..."}
                    s={"textAreaNewComment"}
                    name={'comment'}
                    onChangeText={onChangeText}
                    type={"text"}
                    autoFocus={true}
                    number={500}
                    value={state.comment}
                />
                {activeTextArea &&
                    <div className={sContainer.containerNewComment}>
                        <Button
                            onClick={onHandleNewComment}
                            s={state.comment ? "buttonGreen" : "buttonCommentEmpty"}
                            label={"Save"}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export function ListDivTop({ onClick, title }) {
    return (
        <div className={sContainer.containerClose}>
            <H3 title={title} s={"titleMembers"} />
            <div className={sContainer.containerIconMembers} onClick={() => onClick()}>
                <CloseIcon className={sContainer.icon} />
            </div>
        </div>
    )
}


export function ListMembers({ position, task }) {

    const user = useSelector(state => state.user)
    const dashboard = useSelector(state => state.dashboard)
    const indexDashboard = user?.dashboards?.findIndex(el => el.uuid === dashboard.uuid)
    const dispatch = useDispatch()
    const { LISTADDTOCARD } = actions
    const onHandleCloseList = () => {
        dispatch({ type: LISTADDTOCARD, payload: false })
    }

    const onHandleAddMembers = ({ email }) => {
        let data = {
            email: email,
            dashboardUuid: dashboard.uuid, 
            uuid: task.uuid,
        }
        dispatch(api.addMemberInTask(data))
        dispatch({ type: LISTADDTOCARD, payload: false })
    }

    let domnNode = useClickOutside(() => {
        dispatch({ type: LISTADDTOCARD, payload: false })
    })
    const style = {
        position: 'absolute',
        zIndex: 80,
        top: position.top + 35,
        left: `calc(100% - ${position.left - (position.width + 30)}px)`,
    }
    return (
        <div style={style} className={sContainer.containerListMembers} ref={domnNode}>
            <ListDivTop onClick={onHandleCloseList} title={"Members"}/>
            <hr/>
            <H3 title={"BOARD MEMBERS"} s={"titleBoard"}/>
            { user?.dashboards[indexDashboard].users.map(el => 
                <div className={sContainer.containerAvatarName} key={el.id} onClick={() => onHandleAddMembers(el)}>
                    <UserAvatar size={32} image={el.image?.url}/>
                    <H3 title={`${el.firstName} ${el.lastName}`} s={"titleNameLastName"} />
                </div>)}
        </div>
    )
}


export function ListCover({ position, task, index, indexTask }) {

    const { LISTADDTOCARD } = actions
    const user = useSelector(state => state.user)
    const dashboard = useSelector(state => state.dashboard)
    const dispatch = useDispatch()
    const column = useSelector(state => state.column)
    let image = column[index]?.tasks[indexTask]?.imageTask?.url && `${process.env.REACT_APP_API_URL}${column[index]?.tasks[indexTask]?.imageTask?.url}`
    let fileName = column[index]?.tasks[indexTask]?.imageTask?.fileName
    const [ img, setImg ] = useState(false)
    const [ imgUpload, setImgUpload ] = useState(true)
    const onHandleCloseList = () => {
        dispatch({ type: LISTADDTOCARD, payload: false })
    }

    const selectImg = () => {
        let input = document.getElementById("file")
        let fReader = new FileReader();
        fReader.onloadend = event => setImg({ src: event.target.result, name: input.files[0].name })
        if(input.files[0]){
            fReader.readAsDataURL(input.files[0]);
            setImgUpload(true)
        }
    }

    const onSubmit = () => {
        if (img) {
            var formData = new FormData();
            formData.append("image", dataURLtoFile(img.src), img.name)
            let data = {
                dashboardUuid: dashboard ? dashboard.uuid : user.dashboards[0].uuid,
                uuid: task.uuid
            }
            dispatch({ type: LISTADDTOCARD, payload: false })
            dispatch(api.addCoverImage(formData, data))
            setImgUpload(false)
        }
    }
    img && imgUpload && onSubmit()

    const style = {
        position: 'absolute',
        zIndex: 80,
        top: position.top + 35,
        left: `calc(100% - ${position.left - (position.width + 30)}px)`,
    }

    const styleImg = {
        objetFit: "cover",
        height: 48,
        width: 88,
        borderRadius: 3
    }
    let domnNode = useClickOutside(() => {
        dispatch({ type: LISTADDTOCARD, payload: false })
    })
    return (
        <div style={style} className={sContainer.containerListMembers} ref={domnNode}>
            <ListDivTop onClick={onHandleCloseList} title={"Cover"} />
            <hr />
            <H3 title={"ATTACHMENTS"} s={"titleBoard"} />
            { image &&
                <img style={styleImg} src={image} alt={fileName} />
            }
            <input
                onChange={selectImg}
                accept="image/*"
                id="file"
                type="file"
            />
            <label
                htmlFor="file"
                style={{ justifyContent: "center" }}
                className={sButton.buttonDisplayTaskAddToCard}>
                Upload a Cover Image
            </label>
        </div>
    )
}