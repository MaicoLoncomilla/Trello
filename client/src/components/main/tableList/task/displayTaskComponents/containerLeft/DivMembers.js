import React from 'react';
import { useSelector } from 'react-redux';

import UserAvatar from '../../../../../../utils/components/UserAvatar';

import sContainer from '../../../../../../styles/container.module.css';

export default function DivMembers({ index, indexTask }){

  const column = useSelector(state => state.column)

  return (
    <div className={sContainer.containerMembers}>
      <h3>MEMBERS</h3>
      <div style={{ display: "flex", marginTop: 5 }}>
        {column[index].tasks[indexTask].users.map(el =>
          <UserAvatar s={{marginRight: 5}} size={32} image={el.image?.url} key={el.email} title={`${el.firstName} ${el.lastName}`}/>
        )}
      </div>
      
    </div>
  )
}