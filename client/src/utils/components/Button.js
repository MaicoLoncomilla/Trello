import React from 'react';

import sButton from '../../styles/button.module.css'

export function Button({ label, onClick, type, s, style, icon, id, el }){
    return (
        <button
            id={id}
            className={sButton[s]}
            style={style}
            onClick={() => onClick(id)}
            type={type}>
            {icon} {label}
        </button>
    )
}

export function ButtonSubmit({ label, s, style, icon }) {
    return (
        <button
            className={sButton[s]}
            style={style}
            type="submit"
        >
            {icon} {label}
        </button>
    )
}

export function ButtonComment({ label, onClick, s, style, el, icon }) {
    return (
        <button
            className={sButton[s]}
            onClick={() => onClick(el)}
            style={style}
        >
           {icon} {label}
        </button>
    )
}