import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { ButtonSubmit } from '../../../utils/components/Button';
import { ToastTimer } from '../../../utils/alerts/Alert';
import { Input } from '../../../utils/components/Input';
import { H2 } from '../../../utils/components/Titles';
import api from '../../../redux/action-creator';

import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import sContainer from '../../../styles/container.module.css';
import sButton from '../../../styles/button.module.css';
import sForm from '../../../styles/form.module.css';

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
            return ToastTimer.fire('Deny!',
                "Complete the form",
                "info")
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)) {
            return ToastTimer.fire('Deny!',
            "Invalid email address",
            "error")
        }
        dispatch(api.register(state))
    }

    const containerInput = (el, index) => {
        return (
            <div className={sContainer.containerIconInput} key={index}>
                { el.type === "text" && <PersonOutlineOutlinedIcon style={{ color: "#54adec" }}/>}
                { el.type === "email" && <MailOutlineIcon style={{ color: "#54adec" }}/>}
                { el.type === "password" && <LockOutlinedIcon style={{ color: "#54adec" }}/>}
                <Input
                    s={"inputsLogin"}
                    placeholder={el.placeholder}
                    type={el.type}
                    name={el.name}
                    onChangeText={onChangeText}
                />
            </div>
        )
    }
    return (
        <>
            {user.id && <Redirect to="/Trello/" />}
            <div className={sContainer.containerLogin}>
                <div className={sContainer.containerMainLogin}>
                    <form onSubmit={(e) => onHandleCreateUser(e)} className={sForm.formLogin}>
                        <H2 title={"Create Your Account"} s={"titleh2Login"}/>
                        { arrayInput?.map((el, index) => containerInput(el, index))}

                        <ButtonSubmit label={"Register"} s={"buttonBlueLogin"} />
                    </form>
                    <div className={sContainer.containerSpanLink}>
                        <span>Already have an account?</span>
                        <Link
                            className={sButton.linkLogin}
                            to="/Trello/login">Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

const arrayInput = [{
    placeholder: "First Name",
    type: "text",
    name: "firstName"
},{
    placeholder: "Last Name",
    type: "text",
    name: "lastName"
}, {
    placeholder: "Email",
    type: "email",
    name: "email"
},{
    placeholder: "Password",
    type: "password",
    name: "password"
}, {
    placeholder: "Repeat Password",
    type: "password",
    name: "repeatPassword"
}]