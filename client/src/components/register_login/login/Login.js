import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import api from '../../../redux/action-creator';

import { Input } from '../../../utils/components/Input';

import sContainer from '../../../styles/container.module.css';
import sForm from '../../../styles/form.module.css';
import sButton from '../../../styles/button.module.css';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export default function Login(){

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [ state, setState ] = useState({})
    
    const onChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    
    const onHandleLogin = (e) => {
        e.preventDefault();
        if(!state.email || !state.password){
            return alert('Complete the form')
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)){
            return alert('Email is not correct!')
        }
        dispatch(api.login(state))
    }
    
    return (
        <>
            {user.id && <Redirect to="/" />}
            <div className={sContainer.containerLogin}>
                <form onSubmit={(e) => onHandleLogin(e)} className={sForm.formLogin}>
                    <div className={sContainer.containerIconInput}>
                        <MailOutlineIcon style={{ color: "#54adec" }} />
                        <Input
                            s={"inputsLogin"}
                            placeholder={"Email"}
                            type={"email"}
                            onChangeText={onChangeText}
                            name={'email'}
                        />
                    </div>
                    <div className={sContainer.containerIconInput}>
                        <LockOutlinedIcon style={{ color: "#54adec" }} />
                        <Input
                            s={"inputsLogin"}
                            placeholder={"Password"}
                            type={"password"}
                            onChangeText={onChangeText}
                            name={'password'}
                        />
                    </div>
                    <button
                        className={sButton.buttonBlue}
                        type="submit">Ingresar</button>
                </form>
                <Link
                    style={{ textAlign: "center", margin: 10 }}
                    className={sButton.link}
                    to="/register">Create a new account
                </Link>
            </div>
        </>
    )
}