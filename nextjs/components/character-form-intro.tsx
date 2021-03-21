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
          <div className="row"><h2>Erenthyrm 2021</h2></div>
          <div className="row"><h3>-</h3></div>
          <div className="row mb-5"><h4>Création personnage</h4></div>
        </div>
      </React.Fragment>
    );
  }
}
