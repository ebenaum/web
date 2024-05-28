import * as React from "react";

import {
  FormBuilderBaseConfig,
  InputConfig,
  NextConfigCallback,
} from "./forms/builder-base-config";

export class CharacterFormIntroConfig extends FormBuilderBaseConfig {
  constructor() {
    super("", "");
  }

  onChangeHandler = (onNextConfig: NextConfigCallback): (() => void) => {
    return (): void => {
      onNextConfig(new CharacterFormIntroConfig());
    };
  };

  build = (c: InputConfig): JSX.Element => {
    return <CharacterFormIntro />;
  };

  value = (): void => {};

  validValue = (): boolean => {
    return true;
  };
}

interface CharacterFormIntroProps {}

export class CharacterFormIntro extends React.Component<
  CharacterFormIntroProps,
  any
> {
  constructor(props: CharacterFormIntroProps) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Erenthyrm 2021</h2>
          <h3>-</h3>
          <h4 className="mb-5">Création personnage</h4>
        </div>
      </React.Fragment>
    );
  }
}
