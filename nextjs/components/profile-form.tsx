import * as React from 'react';

import { FormBuilder } from './forms/builder';
import { BuildInputSelectValue, InputSelectValue, InputSelectConfig, WorldObjectsToChoices } from './forms/input-select';
import { InputTextValue, InputTextConfig } from './forms/input-text';
import { InputTextAreaConfig } from './forms/input-textarea';
import { FormBuilderElement } from './forms/builder-base-config';

interface ProfileFormProps {};

interface ProfileFormState {
  index: number;
  email: InputTextValue;
};

export class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  constructor(props: ProfileFormProps) {
    super(props);

    this.state = {
      index: 0,
      email: new InputTextValue(""), 
    };
  }

  onDone = () => {
    console.log(this.form());
  }


  onChange = (ref: string, value: any) :void => {
    const nextState = this.state;

    nextState[ref] = value;

    this.setState(nextState);
  }

  onFormSelect = (index: number)  :void => {
    this.setState({ index: index });
    window.scrollTo(0,0);
  }

  form = () :any => {
    return {
      email: this.state.email.text,
    };
  }

  buildForm = () :FormBuilderElement[] => {
    return [
      new InputTextConfig('email', 'Adresse email', "Email", this.state.email),
    ]; 
  }

  render() {
    return (
      <React.Fragment>
        <div id='character-form'>
        <FormBuilder
          index={this.state.index}
          onDone={this.onDone}
          onFormSelect={this.onFormSelect}
          formElements={this.buildForm()}
          isStarted={false}
          onChange={this.onChange}
        />
        </div>
      </React.Fragment>
    );
  }
}
