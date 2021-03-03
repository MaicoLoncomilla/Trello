import React from 'react';

import { TextArea } from '../../../../utils/components/Input';
import UserAvatar from '../../../../utils/components/UserAvatar';
import { url } from '../../../../utils/url';
import NotesIcon from '@material-ui/icons/Notes';

import sContainer from '../../../../styles/container.module.css';
import sButton from '../../../../styles/button.module.css';

export default function Task({ el }) {
    
    let image = el.imageTask?.url && `${url}${el.imageTask?.url}`
    let fileName = el.imageTask?.fileName

    let styleImg = {
        height: 140,
        width: '100%',
        objectFit: "cover"
    }
    return (
        <div className={sContainer.containerTask}>
            {el.imageTask?.url && 
            <img style={styleImg} src={image} alt={fileName}/>}
            <TextArea
                s={'textAreaTask'}
                value={el.title}
                status={true}
                number={500}
                statusRead={true}
            />
            <div>
                {el.description &&
                    <div className={sContainer.containerAbsoluteIconDescripcion}>
                        <NotesIcon className={sButton.icon} />
                    </div>
                }
                {el.users?.length ?
                    <div className={sContainer.containerTaskAvatar}>
                        {el.users?.map(user =>
                            <UserAvatar size={32} image={user.image?.url} key={user.email} title={`${user.firstName} ${user.lastName}`} />)}
                    </div>
                    :
                    false
                }
            </div>
        </div>
    )
}