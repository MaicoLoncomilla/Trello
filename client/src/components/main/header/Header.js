import React from 'react';
import sContainer from '../../../styles/container.module.css'
import { Avatar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useSelector } from 'react-redux';

export default function Header(){

    const user = useSelector(state => state.user)
    return (
        <div className={sContainer.containerFlex}>
            <div className={sContainer.containerIcon}>
                <AddIcon/>
            </div>
            <div className={sContainer.containerAvatar}>
                <Avatar/>
                <h3>{user && user.firstName} {user && user.lastName}</h3>
            </div>
            <div className={sContainer.containerIcon}>
                <KeyboardArrowDownIcon/>
            </div>
        </div>
    )
}