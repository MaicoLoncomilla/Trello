import React from 'react';
import { TextArea } from '../../../../utils/components/Input';

export default function Task({ el }) {

    return (
        <TextArea
            s={'textAreaTask'}
            value={el.title}
            status={true}
            number={500}
            statusRead={true}
        />
    )
}