import React from 'react';

import { TextArea } from '../../../../utils/components/Input';

import CloseIcon from '@material-ui/icons/Close';

import sForm from '../../../../styles/form.module.css';
import sButton from '../../../../styles/button.module.css';
import { ButtonSubmit } from '../../../../utils/components/Button';

export default function FormAddColumn({ onSubmit, onChangeText, state, addTask }) {
  return (
    <form
      className={sForm.formAddColumn}
      onSubmit={(e) => onSubmit(e)}>
      <TextArea
        s={"textAreaAddColumn"}
        autoFocus={true}
        placeholder={"Enter list title..."}
        number={255}
        onChangeText={onChangeText}
        value={state.title}
        name={'title'}
      />
      <div>
        <ButtonSubmit
          s={'buttonGreen'}
          label={"Add List"}
        />
        <CloseIcon
          className={sButton.buttonIcon}
          onClick={() => addTask()}
        />
      </div>
    </form>
  )
}