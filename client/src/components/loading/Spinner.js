import React from 'react';

import sSpinner from './spinner.module.css';

export default function Spinner(){

  return (
    <div className={sSpinner.loader}>
      <span></span>
    </div>
  )
}