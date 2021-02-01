import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import sContainer from '../../../styles/container.module.css'
import { Avatar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import sHeader from '../../../styles/header.module.css';
import api from '../../../redux/action-creator';
import actions from '../../../redux/actions';

export default function Header(){

    const user = useSelector(state => state.user)
    const [ menuActive, setMenuActive ] = useState(false)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`
    const { USER } = api
    const { BUTTONNEWPROJECT } = actions
    const dispatch = useDispatch()

    const onHandleNewProject = () => {
        dispatch({
            type: BUTTONNEWPROJECT,
            payload: true
        })
    }
    const onHandleLogOut = () => {
        dispatch({
            type: USER,
            payload: false
        })
    }
    const arrayMenu = [{
        title: "Home",
        to: "/"
    },{
        title: 'Change Project',
        to: "/"
    },{
        title: "Profile",
        to: "/userProfile"
    }]
    return (
        <div className={sContainer.containerFlex}>
            <div className={sContainer.containerIcon} onClick={() => onHandleNewProject()}>
                <AddIcon/>
            </div>
            <Link to="userProfile">
                <div className={sContainer.containerAvatar}>
                    <Avatar src={image}/>
                    <h3>{user && user.firstName} {user && user.lastName}</h3>
                </div>
            </Link>
            <div className={sContainer.containerIcon} onClick={() => setMenuActive(!menuActive)}>
                { menuActive ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </div>
            {menuActive &&
            <div className={sHeader.containerMenuActive}>
                <Avatar src={image}/>
                <div>
                    <h3>{user && user.firstName} {user && user.lastName}</h3>
                    <p>{user.email}</p>
                </div>
                <hr/>
                <div>
                    { arrayMenu?.map((el, index) => 
                    <Link key={index} to={el.to}>
                        {el.title}
                    </Link>)}
                    <hr/>
                    <button onClick={() => onHandleLogOut()}>Log Out</button>
                </div>
            </div>}
        </div>
    )
}