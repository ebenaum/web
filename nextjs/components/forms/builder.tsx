import * as React from 'react';

import { FormElement } from './element';

import { FormBuilderElement } from './builder-base-config'; 

interface FormBuilderProps {
  formElements: FormBuilderElement[];

  onChange(ref: string, value: any) :void;
  onFormSelect(index: number) :void;

  index: number;
  isStarted: boolean;
  onDone() :void;
}

export class FormBuilder extends React.Component<FormBuilderProps, any> {
  constructor(props: FormBuilderProps) {
    super(props);
  }

  focusInput = (index: number) => {
    if (index !== this.props.index) {
      this.props.onFormSelect(index);
    }
  }

  onNextConfig = (index: number): ((onNextConfig: FormBuilderElement) => void ) => {
    return (nextConfig: FormBuilderElement) => {
      const formElements = this.props.formElements
      formElements[index] = nextConfig;

      this.props.onChange(nextConfig.name, nextConfig.value());
    }
  }

  buttonText = (index: number, valid: boolean) :string => {
    if (index !== this.props.index || !valid ) {
      return '';
    }

    if (index === 0) {
      return 'Commencer';
    }

    return 'Ok';
  }

  onOk = () => {
    const index = this.props.index + 1;
    this.props.onFormSelect(index);

    if (index === this.props.formElements.length) {
      this.props.onDone();
    }
  }

  onBack = () => {
    const index = this.props.index - 1;
    this.props.onFormSelect(index);

    if (index === this.props.formElements.length) {
      this.props.onDone();
    }
  }

  buildInput = (config: FormBuilderElement, index: number) :JSX.Element => {
    return (
      <React.Fragment>{config.build({
          onEnter: this.onOk,
          onNextConfig: this.onNextConfig(index),
          isFocus: index === this.props.index,
          onFocus: this.focusInput.bind(this, index),
        })}
      </React.Fragment>);
  }

  backButtonText = (index: number) :string => {
    if (index === 0) {
      return '';
    }

    return 'Retour';
  }

  onStart = () => {
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.formElements.map((formElement, index) => {
            return (
              <React.Fragment>
              <FormElement
                key={index}
                onOk={this.onOk}
                onBack={this.onBack}
                onFocus={this.focusInput.bind(this, index)}
                isFocus={index === this.props.index}
                element={this.buildInput(formElement, index)}
                buttonText={this.buttonText(index, formElement.validValue())}
                backButtonText={this.backButtonText(index)}
              />
              </React.Fragment>
            );
          })
        }
      </React.Fragment>
    );
  }
}
