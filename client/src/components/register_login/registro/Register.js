import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../redux/action-creator';
import { Link, Redirect } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import sContainer from '../../../styles/container.module.css';
import sInput from '../../../styles/input.module.css';
import sButton from '../../../styles/button.module.css';

export default function Register() {

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
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

    const Input = (name, placeholder, pass) => {
        return (
            <input
                className={sInput.inputsLogin}
                onChange={(e) => onChangeText(name, e.target.value)}
                placeholder={placeholder}
                type={pass ? pass : null}
            />
        )
    }
    return (
        <>
            {user.firstName && <Redirect to="/" />}
            <form onSubmit={(e) => onHandleCreateUser(e)}
                className={sContainer.containerLogin}>
                <div className={sContainer.containerIconInput}>
                    <PersonOutlineOutlinedIcon />
                    {Input('firstName', "First Name")}
                    {Input('lastName', 'Last Name')}
                </div>
                <div className={sContainer.containerIconInput}>
                    <MailOutlineIcon />
                    {Input('email', 'Email')}
                </div>
                <div className={sContainer.containerIconInput}>
                    <LockOutlinedIcon />
                    {Input('password', 'Password', 'password')}
                </div>
                <div className={sContainer.containerIconInput}>
                    <LockOutlinedIcon />
                    {Input('repeatPassword', 'Repeat Password', "password")}
                </div>
                <button
                    style={{ margin: '15px 0' }}
                    className={sButton.buttonBlue}
                    type="submit">Sign Up
                </button>
                <Link
                    style={{ textAlign: 'center' }}
                    to="/login"
                    className={sButton.link}>
                    Do you have an account?
                </Link>
            </form>
        </>
    )
}