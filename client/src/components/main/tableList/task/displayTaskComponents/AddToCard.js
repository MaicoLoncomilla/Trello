import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../../../../utils/components/Button';
import { H3 } from '../../../../../utils/components/Titles';
import actions from '../../../../../redux/actions';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
// import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
// import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import sButton from '../../../../../styles/button.module.css';

export default function AddToCard(){
  const { LISTADDTOCARD } = actions

  const dispatch = useDispatch()
  const onHandleActiveDiv = (id) => {
    let elemento = document.getElementById(id)
    let posicion = elemento.getBoundingClientRect()
    dispatch({ 
      type: LISTADDTOCARD, 
      payload: { active: id, position: posicion}
    })
  }

  const arrayButtons = [
    {
      icon: <PersonOutlineIcon className={sButton.icon}/>,
      label: "Members"
    },{
      icon: <PaymentOutlinedIcon className={sButton.icon}/>,
      label: "Cover",
    }
  ]
  // ,{
  //   icon: <LocalOfferOutlinedIcon className={sButton.icon}/>,
  //   label: "Label"
  // }
  // ,{
  //   icon: <ImageOutlinedIcon className={sButton.icon}/>,
  //   label: "Image"
  // }

  return (
    <div style={{ marginBottom: 24 }}>
      <H3
        title={"ADD TO CARD"}
        s={"titleAddToCard"}
      />
      <div>
        {arrayButtons?.map(el =>
          <Button
            key={el.label}
            id={el.label}
            s={"buttonDisplayTaskAddToCard"}
            onClick={onHandleActiveDiv}
            icon={el.icon}
            label={el.label}
          />)}
      </div>
    </div>
  )
}