import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function UserProfile(){

    const [ redirect, setRedirect ] = useState(true)

    return (
        <>
            {redirect && <Redirect to="/login"/>}
        <div>
            <h1>Profile</h1>
        </div>
        </>
    )
}