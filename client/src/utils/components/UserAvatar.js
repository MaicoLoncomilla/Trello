import React from 'react';

import emptyAvatar from '../../assets/emptyAvatar.png';
import { url } from '../../utils/url';

import sSection from '../../styles/section.module.css';

export default function UserAvatar({ size, image, s, title }) {

  let avatar = image ? `${url}${image}` : emptyAvatar

  return (
    <div style={s} className={sSection.containerUserAvatar}>
      <img src={avatar} style={{ height: size, width: size }} alt={title} title={title}/>
    </div>
  )
}