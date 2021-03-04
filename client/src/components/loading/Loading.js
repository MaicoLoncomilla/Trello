import React from 'react';

import sLoading from './loading.module.css';

export default function Loading(){
  return (
    <div className={sLoading.containerLoader} >
      <div className={sLoading.container}>
        <h2>Loading...</h2>
      </div>
    </div>
  )
}