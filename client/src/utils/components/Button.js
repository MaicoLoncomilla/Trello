import React from 'react';

import sButton from '../../styles/button.module.css'

export function Button({ label, onClick, type, s, style }){
    return (
        <button
            className={
                (s === 'buttonGreen' && sButton.buttonGreen ) ||
                (s === 'buttonBlueColumn' && sButton.buttonBlueColumn)
            }
            style={style}
            onClick={onClick}
            type={type}>
            {label}
        </button>
    )
}