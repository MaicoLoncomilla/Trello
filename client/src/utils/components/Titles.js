import React from 'react';

import sH from '../../styles/h.module.css'

export function H3({ title, s }){
  return (
    <h3 className={sH[s]}>
      {title}
    </h3>
  )
}