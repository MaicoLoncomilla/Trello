import React from 'react';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Avatar } from '@material-ui/core';

import sContainer from '../../../../../styles/container.module.css';

export function DivMembers(){
    return (
        <div className={sContainer.containerMembers}>
            <h3>MEMBERS</h3>
            {/* un Map de los members */}
            <Avatar style={{width: 32, height: 32}}/>
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