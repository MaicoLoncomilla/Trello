import React from 'react';
import { useSelector } from 'react-redux';

import DivActivity from './containerLeft/DivActivity';
import DivDescription from './containerLeft/DivDescription';

import sSection from '../../../../../styles/section.module.css'
import DivMembers from './containerLeft/DivMembers';

export default function ContainerLeft({ task, index, indexTask }) {
  
  const column = useSelector(state => state.column)

  return (

    <div className={sSection.containerLeft}>
      {column[index]?.tasks[indexTask]?.users?.length ? 
        <DivMembers task={task} index={index} indexTask={indexTask}/> : false
      }
      <DivDescription task={task} index={index} indexTask={indexTask}/>
      <DivActivity task={task} index={index} indexTask={indexTask}/>
    </div>
  )
}