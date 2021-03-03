import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../../redux/action-creator';
import useClickOutside from '../../../utils/functions/useClickOutside'; 
import UserAvatar from '../../../utils/components/UserAvatar';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import sHeader from '../../../styles/header.module.css';
import sButton from '../../../styles/button.module.css';

export default function Header(){

    const user = useSelector(state => state.user)
    const dashboard = useSelector(state => state.dashboard)
    const [ menuActive, setMenuActive ] = useState(false)
    const image = user.image && `${user.image.url}`
    const { USER } = api

    const dispatch = useDispatch()

    const onHandleLogOut = () => {
        localStorage.removeItem('token')
        dispatch({ type: USER, payload: false })
    }
    const arrayMenu = [{
        icon: <HomeIcon/>,
        title: "Home",
        to: "/Trello/"
    },{
        icon: <DescriptionIcon/>,
        title: 'Project List',
        to: "/Trello/listProjects"
    },{
        icon: <PersonIcon/>,
        title: "Profile",
        to: "/Trello/userProfile"
    }]
   
    let domnNode = useClickOutside(() => {
        setMenuActive(false)
    })
    return (
        <div className={sHeader.containerFlex}  ref={domnNode}>
            <Link className={sButton.link} to="/">
                <div className={sHeader.containerTitleDashboard}>
                    <p>{dashboard ? dashboard.title : user.id ? user.dashboards[0].title : false}
                    </p>
                </div>
            </Link>
            <div className={sHeader.containerAvatarName}>
                <Link
                    to="Trello/userProfile"
                    className={sButton.link}
                    onClick={() => setMenuActive(false)}>
                    <div className={sHeader.containerAvatar}>
                        <UserAvatar size={40} image={image} title={`${user.firstName} ${user.lastName}`}/>
                        <h3>{user && user.firstName} {user && user.lastName}</h3>
                    </div>
                </Link>
                <div
                    className={sHeader.containerIcon}
                    onClick={() => setMenuActive(!menuActive)}>
                    {menuActive ?
                        <KeyboardArrowUpIcon />
                        :
                        <KeyboardArrowDownIcon />}
                </div>
            </div>
            {menuActive &&
                <div className={sHeader.containerMenuActive}>
                    <div className={sHeader.containerMenuActiveFlex}>
                        <UserAvatar size={40} image={image} />
                        <div className={sHeader.containerFullNameEmail}>
                            <h3>{user && user.firstName} {user && user.lastName}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className={sHeader.containerLinks}>
                        {arrayMenu?.map((el, index) =>
                            <Link
                                to={el.to}
                                className={sButton.link}
                                key={index}
                                onClick={() => setMenuActive(!menuActive)}>
                                <div className={sHeader.containerLinkMap}>
                                    <div className={sHeader.containerIconAndP}>
                                        {el.icon}
                                        <p>{el.title}</p>
                                    </div>
                                    <ArrowRightIcon />
                                </div>
                            </Link>
                        )}
                    </div>
                    <div
                        className={sHeader.containerLogOut}
                        onClick={() => onHandleLogOut()}>
                        <ExitToAppIcon />
                        <p>Log Out</p>
                    </div>
                </div>}
        </div>
    )
}