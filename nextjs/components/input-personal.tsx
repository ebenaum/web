import * as React from 'react';

import { FormBuilderBaseConfig, InputConfig, NextConfigCallback } from './forms/builder-base-config'; 
import { InputLabelProps, InputLabel } from './forms/input-label'; 
import { InputText, InputTextValue } from './forms/input-text'; 

export class InputPersonalConfig extends FormBuilderBaseConfig {
  _value: InputPersonalValue;

  constructor(name: string, text: string, value: InputPersonalValue) {
    super(name, text);
    this._value = value;
  }

  onFocusHandler = (callback: () => void, newIndex: number): (() => void) => {
    return () :void => {
      this._value.index = newIndex;
      callback();
    }
  }

  onEnter = (onNextConfig: NextConfigCallback, newIndex: number): (() => void) => {
    return () :void => {
      this._value.index = newIndex;
      onNextConfig(new InputPersonalConfig(this.name, this.text, this._value));
    }
  }

  onChangeHandler = (onNextConfig: NextConfigCallback, key: string): ((change: InputTextValue) => void) => {
    return (change: InputTextValue) :void => {
      this._value[key] = change;
      onNextConfig(new InputPersonalConfig(this.name, this.text, this._value));
    }
   }

  build = (c: InputConfig) :JSX.Element => {
    return <React.Fragment>
      <div className='offset-md-4 col-md-4'>
      <InputLabel name={this.name} text="Adresse E-mail" required={true} />
      <InputText
        name={this.name + "-email"}
        text=""
        placeholder="Email"
        value={this._value.email}
        onEnter={this.onEnter(c.onNextConfig, 1)}
        onFocus={this.onFocusHandler(c.onFocus, 0)}
        isFocus={c.isFocus && this._value.index === 0}
        onChange={this.onChangeHandler(c.onNextConfig, "email")}
      />
      </div>
      <div className='mb-3'></div>
      <div className='input-name'>
        <InputLabel name={this.name} text="Quels sont votre prénom et votre nom ?" required={true} />
        <InputText
          name={this.name + "-firstname"}
          text=""
          placeholder="Prénom"
          value={this._value.firstName}
          onEnter={this.onEnter(c.onNextConfig, 2)}
          onFocus={this.onFocusHandler(c.onFocus, 1)}
          isFocus={c.isFocus && this._value.index === 1}
          onChange={this.onChangeHandler(c.onNextConfig, "firstName")}
        />
        <InputText
          name={this.name + "-lastname"}
          text=""
          placeholder="Nom"
          value={this._value.lastName}
          onEnter={c.onEnter}
          onFocus={this.onFocusHandler(c.onFocus, 2)}
          isFocus={c.isFocus && this._value.index === 2}
          onChange={this.onChangeHandler(c.onNextConfig, "lastName")}
        />
      </div>
    </React.Fragment>
    ;
  }

  value = () :InputPersonalValue => {
    return this._value;
  }

  validValue = () :boolean => {
    return this._value.firstName.text !== "" && this._value.lastName.text !== "" && this._value.email.text !== "";
  }
}

export class InputPersonalValue {
  email: InputTextValue;
  firstName: InputTextValue;
  lastName: InputTextValue;
  index: number;

  constructor(email: string, firstName: string, lastName: string) {
    this.email = new InputTextValue(email);
    this.firstName = new InputTextValue(firstName);
    this.lastName = new InputTextValue(lastName);
    this.index = 0;
  }
}
