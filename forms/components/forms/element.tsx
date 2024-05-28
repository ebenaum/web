import * as React from "react";

interface FormElementProps {
  element: JSX.Element;
  onOk(): void;
  onBack(): void;
  isFocus?: boolean;
  onFocus(): void;
  buttonText: string;
  backButtonText: string;
}

interface FormElementState {
  ref: React.RefObject<HTMLDivElement>;
}

export class FormElement extends React.Component<
  FormElementProps,
  FormElementState
> {
  constructor(props: FormElementProps) {
    super(props);

    this.state = {
      ref: React.createRef<HTMLDivElement>(),
    };
  }

  onOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onOk();

    e.stopPropagation();
  };

  onBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onBack();

    e.stopPropagation();
  };

  componentDidUpdate(prevProps: FormElementProps, prevState: FormElementState) {
    if (!prevProps.isFocus && this.props.isFocus) {
      if (this.state.ref.current !== null) {
        const h = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        );
        window.scrollBy({
          left: 0,
          top: this.state.ref.current.getBoundingClientRect().top - h / 6,
          behavior: "smooth",
        });
      }
    }
  }

  render() {
    let button = null;
    if (this.props.isFocus && this.props.buttonText !== "") {
      button = (
        <button type="button" className="form-button" onClick={this.onOk}>
          {this.props.buttonText}
        </button>
      );
    }

    let backButton = null;
    if (this.props.isFocus && this.props.backButtonText !== "") {
      backButton = (
        <button type="button" className="form-button" onClick={this.onBack}>
          {this.props.backButtonText}
        </button>
      );
    }

    return (
      <React.Fragment>
        <div
          ref={this.state.ref}
          className={`form-element text-center ${this.props.isFocus ? "active" : ""}`}
          onClick={this.props.onFocus}
        >
          {this.props.element}
          <div className="mb-5"></div>
          <div>
            {backButton}
            {button}
          </div>
          <div className="mb-5"></div>
        </div>
      </React.Fragment>
    );
  }
}
