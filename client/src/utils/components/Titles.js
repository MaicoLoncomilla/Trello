import React from 'react';

import sH from '../../styles/h.module.css'

export function H3({ title, s, style }){
  return (
    <h3 style={style} className={sH[s]}>
      {title}
    </h3>
  )
}