import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import sSection from '../../styles/section.module.css';

export function DivCloseIcon({ onClick }) {
    return (
        <div
            className={sSection.containerButtonClose}
            onClick={() => onClick()}>
            <CloseIcon className={sSection.closeIcon}/>
        </div>
    )
}

export function DivCloseIconAbsolute ({ onClick }) {
    return (
        <div
            className={sSection.containerButtonCloseAbsolute}
            onClick={() => onClick()}>
            <CloseIcon className={sSection.closeIcon}/>
        </div>
    )
}