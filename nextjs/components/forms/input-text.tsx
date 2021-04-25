import * as React from 'react';

import { FormBuilderBaseConfig, InputConfig, NextConfigCallback } from './builder-base-config'; 
import { InputLabelProps, InputLabel } from './input-label'; 

export class InputTextConfig extends FormBuilderBaseConfig {
  _placeholder: string;
  _value: InputTextValue;

  constructor(name: string, text: string, placeholder: string, value: InputTextValue) {
    super(name, text);
    this._value = value;
    this._placeholder = placeholder;
  }

  onChangeHandler = (onNextConfig: NextConfigCallback): ((change: InputTextValue) => void) => {
    return (change: InputTextValue) :void => {
      onNextConfig(new InputTextConfig(this.name, this.text, this._placeholder, change));
    }
  }

  build = (c: InputConfig) :JSX.Element => {
    return <InputText
      name={this.name}
      text={this.text}
      placeholder={this._placeholder}
      value={this._value}
      onEnter={c.onEnter}
      onFocus={c.onFocus}
      isFocus={c.isFocus}
      onChange={this.onChangeHandler(c.onNextConfig)}
    />;
  }

  value = () :InputTextValue => {
    return this._value;
  }

  validValue = () :boolean => {
    return this._value.text !== "";
  }
}

export class InputTextValue {
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}

interface InputTextProps extends InputLabelProps {
  onChange(change: InputTextValue) :void;
  onEnter() :void;
  onFocus() :void;
  value: InputTextValue;
  placeholder: string;
  isFocus?: boolean
};

interface InputTextState {
  ref: React.RefObject<HTMLInputElement>
};

export class InputText extends React.Component<InputTextProps, InputTextState> {
  constructor(props: InputTextProps) {
    super(props);

    this.state = {
      ref: React.createRef<HTMLInputElement>(),
    };
   
  }

  _handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onEnter();
      e.currentTarget.blur();
    }
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange(new InputTextValue(e.currentTarget.value));
  }

  componentDidUpdate(prevProps: InputTextProps, prevState: InputTextState) {
    if (!prevProps.isFocus && this.props.isFocus && this.state.ref.current !== null) {
      this.state.ref.current.focus();
    } 
  }
 
  componentDidMount() {
    if (this.props.isFocus && this.state.ref.current !== null) {
      this.state.ref.current.focus();
    } 
  }

  render() {
    let label = null;
    if (this.props.text !== '') {
     label = <InputLabel {...this.props} />;
    }

    return (
      <React.Fragment>
        <div className='input-text character-form-horizontal'>
        {label}
        <input
          id={this.props.name}
          ref={this.state.ref}
          onChange={this.onChange}
          onKeyPress={this._handleKeyPress}
          className='q-response-text'
          type='text'
          placeholder={this.props.placeholder}
          onFocus={this.props.onFocus}
          value={this.props.value.text}
        />
        </div>
      </React.Fragment>
    );
  }
}
