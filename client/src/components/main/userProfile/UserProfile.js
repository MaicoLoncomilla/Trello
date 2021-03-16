import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dataURLtoFile from '../../../utils/functions/dataURLtoFile';
import UserAvatar from '../../../utils/components/UserAvatar';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import api from '../../../redux/action-creator';
import Header from '../header/Header';

import sContainer from '../../../styles/container.module.css';
import sText from '../../../styles/text.module.css';


export default function UserProfile(){

    const user = useSelector(state => state.user)
    const image = user.image && `${user.image?.url}`
    const [ img, setImg ] = useState(false)
    const [ imgUpload, setImgUpload ] = useState(true)
    const dispatch = useDispatch()
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
            dispatch(api.addImgUser(formData, user.id))
            setImgUpload(false)
        }
    }
    img && imgUpload && onSubmit()

    return (
        <>
        <Header/>
        <div className={sContainer.containerUserProfile}>
            <div className={sContainer.containerAvatar}>
                <UserAvatar size={150} image={image} />
                <input
                    onChange={selectImg}
                    accept="image/*"
                    id="file"
                    type="file"
                />
                <label htmlFor="file"><PhotoCameraIcon fontSize="large" /></label>
            </div>
            <div className={sContainer.containerUserProfileUserName}>
                <h2 className={sText.textUserName}>{user.firstName} {user.lastName}</h2>
                <p className={sText.textEmail}>{user.email}</p>
            </div>
        </div>
        </>
    )
}