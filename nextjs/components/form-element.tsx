import classnames from 'classnames';
import * as React from 'react';

interface FormElementProps {
  element: JSX.Element
  onOk() :void;
  onBack() :void;
  isFocus?: boolean;
  onFocus() :void;
  showButton: boolean;
  showBackButton: boolean;
}

interface FormElementState {
  ref: React.RefObject<HTMLDivElement>;
}

export class FormElement extends React.Component<FormElementProps, FormElementState> {
  constructor(props: FormElementProps) {
    super(props);

    this.state = {
      ref: React.createRef<HTMLDivElement>(),
    };
  }

  onOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onOk();

    e.stopPropagation();
  }

  onBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onBack();

    e.stopPropagation();
  }

  componentDidUpdate(prevProps: FormElementProps, prevState: FormElementState) {
    if (!prevProps.isFocus && this.props.isFocus) {
      if (this.state.ref.current !== null) {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        window.scrollBy({ left: 0, top: this.state.ref.current.getBoundingClientRect().top - h/6, behavior: 'smooth' })
      }
    }
  }

  render() {
    let button = null;
    if (this.props.isFocus && this.props.showButton) {
      button = <button type='button' className='form-button' onClick={this.onOk}>Ok</button>;
    }
    
    let backButton = null;
    if (this.props.isFocus && this.props.showBackButton) {
      backButton = <button type='button' className='form-button' onClick={this.onBack}>Retour</button>;
    }

    return (
      <React.Fragment>
      <div ref={this.state.ref} className={classnames('row', 'form-element', 'text-center', { active: this.props.isFocus })} onClick={this.props.onFocus}>
        <div className='col-12'>
          {this.props.element}
          <div>
            {button}
            {backButton}
          </div>
        </div>
        <div className='mb-5'></div>
      </div>
      </React.Fragment>
    );
  }
}
