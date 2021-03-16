import React, { useState } from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';

import sContainer from '../../../styles/container.module.css';
import SideBarBoards from './SideBarBoards';

export default function ChangeBoards() {

  const [sideBar, setSideBar] = useState(false)

  return (
    <>
      { !sideBar ?
        <div className={sContainer.contaienerMembersChangeBoards} onClick={() => setSideBar(!sideBar)}>
          <DashboardIcon />
          <span>Boards</span>
        </div>
        :
        <SideBarBoards
          setSideBar={setSideBar}
          sideBar={sideBar}
        />}
    </>
  )
}