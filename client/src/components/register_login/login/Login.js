import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { ButtonSubmit } from '../../../utils/components/Button';
import { ToastTimer } from '../../../utils/alerts/Alert';
import { Input } from '../../../utils/components/Input';
import { H2 } from '../../../utils/components/Titles';
import api from '../../../redux/action-creator';

import sContainer from '../../../styles/container.module.css';
import sForm from '../../../styles/form.module.css';
import sButton from '../../../styles/button.module.css';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default function Login() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [state, setState] = useState({})

    const onChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const onHandleLogin = (e) => {
        e.preventDefault();
        if (!state.email || !state.password) {
            return ToastTimer.fire('Deny!',
                "Complete the form",
                "info")
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(state.email)) {
            return ToastTimer.fire('Deny!',
                "Invalid email address",
                "error")
        }
        dispatch(api.login(state))
    }
    const containerInput = (el, index) => {
        return (
            <div className={sContainer.containerIconInput} key={index}>
                { el.type === "email" && <MailOutlineIcon style={{ color: "#54adec" }} />}
                { el.type === "password" && <LockOutlinedIcon style={{ color: "#54adec" }} />}
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
                    <form onSubmit={(e) => onHandleLogin(e)} className={sForm.formLogin}>
                        <H2 title={"Login to your Account"} s={"titleh2Login"} />
                        {arrayInput?.map((el, index) => containerInput(el, index))}
                        <ButtonSubmit label={"Login"} s={"buttonBlueLogin"} />
                    </form>
                    <div className={sContainer.containerSpanLink}>
                        <span>Don't have an account?</span>
                        <Link
                            className={sButton.linkLogin}
                            to="/register">Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

const arrayInput = [{
    placeholder: "Email",
    type: "email",
    name: "email"
}, {
    placeholder: "Password",
    type: "password",
    name: "password"
}]