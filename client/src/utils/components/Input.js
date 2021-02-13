import React from 'react';

import sInput from '../../styles/input.module.css';

export function Input({ placeholder, type, onChangeText, name, s, number, value, autoFocus, status }) {
    
    
    return (
        <input
        className={
            (s === 'inputsLogin' && sInput.inputsLogin ) ||
            (s === 'inputModifyTask' && sInput.inputModifyTask) ||
            (s === 'inputDisplayTask' && sInput.inputDisplayTask)
        }
            onChange={(e) => onChangeText(name, e.target.value)}
            placeholder={placeholder}
            type={type}
            maxLength={number}
            value={value}
            autoFocus={autoFocus}
            disabled={status}
        />
    )
}


export function TextArea({ placeholder, onChangeText, name, number}){
    return (
        <textarea
            placeholder={placeholder}
            onChange={(e) => onChangeText(name, e.target.value)}
            maxLength={number}
            className={sInput.textAreaModifyTask}
        />
    )
}