import * as React from 'react';

import { FormElement } from './form-element';

import { FormBuilderElement } from './form-builder-base-config'; 

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

  mustShowButton = (index: number) :boolean => {
    if (index !== this.props.index) {
      return false;
    }

    return true;
  }

  onOk = () => {
    const index = this.props.index + 1;
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

  onStart = () => {
  }

  render() {
    return (
      <React.Fragment>
      <div className='test'>
        {
          this.props.formElements.map((formElement, index) => {
            return (
              <FormElement
                key={index}
                onOk={this.onOk}
                onFocus={this.focusInput.bind(this, index)}
                isFocus={index === this.props.index}
                element={this.buildInput(formElement, index)}
                showButton={this.mustShowButton(index)}
              />
            );
          })
        }
      </div>
      </React.Fragment>
    );
  }
}
