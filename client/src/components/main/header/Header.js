import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useClickOutside from '../../../utils/functions/useClickOutside';
import UserAvatar from '../../../utils/components/UserAvatar';
import Trello_Logo from '../../../assets/Trello_logo.png';
import api from '../../../redux/action-creator';
import Menu from './Menu';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import sHeader from '../../../styles/header.module.css';
import sButton from '../../../styles/button.module.css';

export default function Header() {

    const user = useSelector(state => state.user)
    const [menuActive, setMenuActive] = useState(false)
    const image = user.image && `${user.image.url}`
    const { USER } = api

    const dispatch = useDispatch()

    const onHandleLogOut = () => {
        localStorage.removeItem('token')
        dispatch({ type: USER, payload: false })
        window.location.reload()
    }

    let domnNode = useClickOutside(() => {
        setMenuActive(false)
    })
    return (
        <div className={sHeader.containerFlex} ref={domnNode}>
            <Link className={sButton.link} to="/">
                <div className={sHeader.containerTitleDashboard}>
                    <img src={Trello_Logo} alt="Trello_Logo"/>
                    <span>Trello</span>
                </div>
            </Link>
            <div className={sHeader.containerAvatarName}>
                <Link
                    to="/userProfile"
                    className={sButton.link}
                    onClick={() => setMenuActive(false)}>
                    <div className={sHeader.containerAvatar}>
                        <UserAvatar size={40} image={image} title={`${user.firstName} ${user.lastName}`} />
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
                <Menu
                    image={image}
                    onHandleLogOut={onHandleLogOut}
                    menuActive={menuActive}
                    setMenuActive={setMenuActive}
                />}
        </div>
    )
}