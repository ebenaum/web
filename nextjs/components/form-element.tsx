import classnames from 'classnames';
import * as React from 'react';

interface FormElementProps {
  element: JSX.Element
  onOk() :void;
  isFocus?: boolean;
  onFocus() :void;
  showButton: boolean;
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

    return (
      <React.Fragment>
      <div ref={this.state.ref} className={classnames('block', { active: this.props.isFocus })} onClick={this.props.onFocus}>
        <div className='element'>
          {this.props.element}
          {button}
        </div>
      </div>
      </React.Fragment>
    );
  }
}
