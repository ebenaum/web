import * as React from 'react';

import { FormBuilderBaseConfig, InputConfig, NextConfigCallback } from './form-builder-base-config'; 

export class CharacterFormIntroConfig extends FormBuilderBaseConfig {
  constructor() {
    super('', '');
  }

  onChangeHandler = (onNextConfig: NextConfigCallback): () => void => {
    return () :void => {
      onNextConfig(new CharacterFormIntroConfig());
    }
  }

  build = (c: InputConfig) :JSX.Element => {
    return <CharacterFormIntro/>;
  }

  value = () :void => {}

  validValue = () :boolean => {
    return true;
  }
}

interface CharacterFormIntroProps {};

export class CharacterFormIntro extends React.Component<CharacterFormIntroProps, null> {
  constructor(props: CharacterFormIntroProps) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className='character-form-horizontal'>
          <div className="row section-title"><h2>Erenthyrm 2021</h2></div>
          <div className="row section-subtitle"><h3>Création personnage</h3></div>
        </div>
      </React.Fragment>
    );
  }
}
