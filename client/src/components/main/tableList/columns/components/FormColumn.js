import React from 'react';

import { TextArea } from '../../../../../utils/components/Input';

import CloseIcon from '@material-ui/icons/Close';

import sForm from '../../../../../styles/form.module.css';
import sButton from '../../../../../styles/button.module.css';
import { ButtonSubmit } from '../../../../../utils/components/Button';


export default function FormColumn({ onSubmit, onChangeText, state, setActiveFormColumn, activeFormColumn, label, placeholder, s }) {
  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className={sForm[s]}>
      <TextArea
        autoFocus={true}
        number={500}
        s={"textareaAddTask"}
        placeholder={placeholder}
        name={"title"}
        onChangeText={onChangeText}
        value={state.title}
      />
      <div>
        <ButtonSubmit
          s={"buttonGreen"}
          label={label}
          type={"submit"}
        />
        <CloseIcon
          className={sButton.buttonIcon}
          onClick={() => setActiveFormColumn(!activeFormColumn)}
        />
      </div>
    </form>
  )
}