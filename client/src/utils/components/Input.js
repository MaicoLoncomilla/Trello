import React, { useEffect, useRef } from 'react';

import sInput from '../../styles/input.module.css';
import setInputHeight from '../../utils/functions/serInputHeight';

export function Input({ placeholder, type, onChangeText, name, s, number, value, autoFocus, status }) {

    return (
        <input
            className={sInput[s]}
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

export function TextArea({ placeholder, onChangeText, name, number, s, value, autoFocus, status, statusRead }) {

    let ref = useRef()
    useEffect(() => {
        setInputHeight(ref.current, '33px')
    }, [value])

    return (
        <textarea
            className={sInput[s]}
            placeholder={placeholder}
            onChange={(e) => onChangeText(name, e.target.value)}
            maxLength={number}
            value={value}
            autoFocus={autoFocus}
            disabled={status}
            ref={ref}
            readOnly={statusRead}
        />
    )
}
