import React from 'react';

import Actions from './containerRight/Actions';
import AddToCard from './containerRight/AddToCard';

import sSection from '../../../../../styles/section.module.css'

export default function ContainerRight({ task, index, indexTask }) {

  return (
    <div className={sSection.containerRight}>
      <AddToCard />
      <Actions task={task} index={index} indexTask={indexTask} />
    </div>
  )
}