import React from 'react';

import { Avatar } from '@material-ui/core';

export default function UserAvatar({ size, image, s }) {

  let avatar = image && `${process.env.REACT_APP_API_URL}${image}`

  return (
    <div style={s}>
      <Avatar src={avatar} style={{ height: size, width: size }}/>
    </div>
  )
}