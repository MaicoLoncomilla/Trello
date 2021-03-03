import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creator';
import { Link, Redirect } from 'react-router-dom';

import { Input } from '../../../utils/components/Input';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import sContainer from '../../../styles/container.module.css';
import sButton from '../../../styles/button.module.css';

export default function Register() {

    const [state, setState] = useState({})
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const onChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const onHandleCreateUser = (e) => {
        e.preventDefault();
        if (!state.firstName || !state.lastName || !state.email || !state.password || !state.repeatPassword) {
            return alert('error')
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)) {
            return alert('Error lo ingresado no es un Email')
        }
        dispatch(api.register(state))
    }

    const containerInput = (placeholder, type, name) => {
        return (
            <div className={sContainer.containerIconInput}>
                { type === "email" && <MailOutlineIcon />}
                { type === "password" && <LockOutlinedIcon />}
                <Input
                    s={"inputsLogin"}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    onChangeText={onChangeText}
                />
            </div>
        )
    }
    return (
        <>
            {user.id && <Redirect to="/Trello/" />}
            <form onSubmit={(e) => onHandleCreateUser(e)}
                className={sContainer.containerLogin}>
                <div className={sContainer.containerIconInput}>
                    <PersonOutlineOutlinedIcon />
                    <Input
                        s={"inputsLogin"}
                        placeholder={"First Name"}
                        type={"text"}
                        name={"firstName"}
                        onChangeText={onChangeText}
                    />
                    <Input
                        s={"inputsLogin"}
                        placeholder={"Last Name"}
                        type={"text"}
                        name={"lastName"}
                        onChangeText={onChangeText}
                    />
                </div>
                {containerInput("Email", "email", "email")}
                {containerInput("Password", "password", "password")}
                {containerInput("Repeat Password", "password", "repeatPassword")}

                <button
                    style={{ margin: '15px 0' }}
                    className={sButton.buttonBlue}
                    type="submit">Sign Up
                </button>
                <Link
                    style={{ textAlign: 'center' }}
                    to="/Trello/login"
                    className={sButton.link}>
                    Do you have an account?
                </Link>
            </form>
        </>
    )
}