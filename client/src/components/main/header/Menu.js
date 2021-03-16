import React from 'react';
import { useSelector } from 'react-redux';

import UserAvatar from '../../../utils/components/UserAvatar';
import { Link } from 'react-router-dom';

import DescriptionIcon from '@material-ui/icons/Description';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';

import sHeader from '../../../styles/header.module.css';
import sButton from '../../../styles/button.module.css';

export default function Menu({ image, onHandleLogOut, menuActive, setMenuActive }) {
  const arrayMenu = [{
    icon: <HomeIcon />,
    title: "Home",
    to: "/"
  }, {
    icon: <DescriptionIcon />,
    title: 'Project List',
    to: "/listProjects"
  }, {
    icon: <PersonIcon />,
    title: "Profile",
    to: "/userProfile"
  }]
  const user = useSelector(state => state.user)
  return (
    <div className={sHeader.containerMenuActive}>
      <div className={sHeader.containerMenuActiveFlex}>
        <UserAvatar size={40} image={image} />
        <div className={sHeader.containerFullNameEmail}>
          <h3>{user && user.firstName} {user && user.lastName}</h3>
          <p>{user.email}</p>
        </div>
      </div>
      <div className={sHeader.containerLinks}>
        {arrayMenu?.map((el, index) =>
          <Link
            to={el.to}
            className={sButton.link}
            key={index}
            onClick={() => setMenuActive(!menuActive)}>
            <div className={sHeader.containerLinkMap}>
              <div className={sHeader.containerIconAndP}>
                {el.icon}
                <p>{el.title}</p>
              </div>
              <ArrowRightIcon />
            </div>
          </Link>
        )}
      </div>
      <div
        className={sHeader.containerLogOut}
        onClick={() => onHandleLogOut()}>
        <ExitToAppIcon />
        <p>Log Out</p>
      </div>
    </div>
  )
}