import React from 'react';

import { TextArea } from '../../../../utils/components/Input';
import UserAvatar from '../../../../utils/components/UserAvatar';

import sContainer from '../../../../styles/container.module.css'

export default function Task({ el }) {
    let image = el.imageTask?.url && `${process.env.REACT_APP_API_URL}${el.imageTask?.url}`
    let fileName = el.imageTask?.fileName

    let styleImg = {
        height: 140,
        width: '100%',
        objectFit: "cover"
    }
    return (
        <div>
            {el.imageTask?.url && 
            <img style={styleImg} src={image} alt={fileName}/>}
            <TextArea
                s={'textAreaTask'}
                value={el.title}
                status={true}
                number={500}
                statusRead={true}
            />
            {el.users?.length ?
                <div className={sContainer.containerTaskAvatar}>
                    {el.users?.map(user =>
                        <UserAvatar size={32} image={user.image?.url} key={user.email} />)}
                </div>
                :
                false
            }
        </div>
    )
}