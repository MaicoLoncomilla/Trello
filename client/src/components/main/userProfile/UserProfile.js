import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../../redux/action-creator';
import dataURLtoFile from '../../../utils/dataURLtoFile'

export default function UserProfile(){

    const user = useSelector(state => state.user)
    const image = user.image && `${process.env.REACT_APP_API_URL}${user.image.url}`
    const [ img, setImg ] = useState(false)
    const dispatch = useDispatch()
    const selectImg = e => {
        let input = document.getElementById("file")
        let fReader = new FileReader();
        fReader.onloadend = event => setImg({ src: event.target.result, name: input.files[0].name })
        fReader.readAsDataURL(input.files[0]);
    }
    const onSubmit = e => {
        if (img) {
            var formData = new FormData();
            formData.append("image", dataURLtoFile(img.src), img.name)
            dispatch(api.addImgUser(formData, user.id))
        }
    }

    return (
        <>
            {!user.firstName && <Redirect to="/login" />}
            <div>
                <Avatar src={image}/>
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
            </div>
            <input
                onChange={selectImg}
                accept="image/*"
                id="file"
                type="file"
            />
            <div >
                <label htmlFor="file">
                    <label >
                        hola
                    </label>
                </label>
            </div>
            <button onClick={() => onSubmit()}> asd</button>
        </>
    )
}