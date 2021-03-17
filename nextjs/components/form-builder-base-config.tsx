export class FormBuilderBaseConfig {
  name: string;
  text: string;

  constructor(name: string, text: string) {
    this.name = name;
    this.text = text;
  }
}

export interface FormBuilderElement extends FormBuilderBaseConfig {
  build(c: InputConfig) :JSX.Element;
  value() :any;
}

export type NextConfigCallback = (nextConfig: FormBuilderElement) => void;

export interface InputConfig {
  onEnter() :void;
  onFocus() :void;
  isFocus: boolean;
  onNextConfig: NextConfigCallback;
}
