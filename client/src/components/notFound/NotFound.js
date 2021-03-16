import React from 'react';
import { Link } from 'react-router-dom';

import sContainer from './notFound.module.css';
import Homero from '../../assets/Homero.png';
import Header from '../main/header/Header';

export default function NotFound(){

  return (
    <>
    <Header/>
    <div className={sContainer.container}>
      <div className={sContainer.containerNotFound}>
        <img src={Homero} alt={"HomeroNotFound"}/>
        <div className={sContainer.containerText}>
          <h2>404</h2>
          <h3>Page not found!</h3>
          <p>I'm very sorry for incovenience. It looks you are trying to access a page that either has been deleted or never been existed</p>
          <Link className={sContainer.Link} to="/Trello/">BACK TO HOME</Link>
        </div>
      </div>
    </div>
    </>
  )
}