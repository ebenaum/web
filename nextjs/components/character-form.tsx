import * as React from 'react';

import { Traits } from './input-traits';
import { FormBuilder } from './form-builder';
import { BuildInputSelectValue, InputSelectValue, InputSelectConfig, WorldObjectsToChoices } from './input-select';
import { FormBuilderElement } from './form-builder-base-config';
import { InputTraitsValue } from './input-traits';

interface CharacterFormProps {
  traitsPoints: number;
  // TODO: types
  races: any;
  factions: any;
  characterClasses: any;
};

interface CharacterFormState {
  index: number;
  traits: InputTraitsValue;
  race: InputSelectValue;
  faction: InputSelectValue;
  classe: InputSelectValue;
};

function emptyTraits() :Traits {
  return {
    gear: 0,
    dexterity: 0,
    endurance: 0,
    force: 0,
    discipline: 0,
    knowledge: 0,
    charisma: 0,
    will: 0,
  }
}

/*
function addTraits(t1: Traits, t2: Traits) :Traits {
  return {
    gear: t1.gear + t2.gear,
    dexterity: t1.dexterity + t2.dexterity,
    endurance: t1.endurance + t2.endurance,
    force: t1.force + t2.force,
    discipline: t1.discipline + t2.discipline,
    knowledge: t1.knowledge + t2.knowledge,
    charisma: t1.charisma + t2.charisma,
    will: t1.will + t2.will,
  }
}
*/

export class CharacterForm extends React.Component<CharacterFormProps, CharacterFormState> {
  constructor(props: CharacterFormProps) {
    super(props);

    this.state = {
      index: 0,
      traits: new InputTraitsValue(emptyTraits(), this.props.traitsPoints),
      race: BuildInputSelectValue([], WorldObjectsToChoices(props.races)),
      faction: BuildInputSelectValue([], WorldObjectsToChoices(props.factions)),
      classe: BuildInputSelectValue([], WorldObjectsToChoices(props.characterClasses)),
    };
  }

  onDone = () => {
    console.log(this.form());
  }


  onChange = (ref: string, value: any) :void => {
    const nextState = this.state;

    nextState[ref] = value;

    this.setState(nextState);
  }

  computeTraitsBonus = () :Traits => {
    const traits = emptyTraits();

    return traits;
  }

  onFormSelect = (index: number)  :void => {
    this.setState({ index: index });
  }

  form = () :any => {
    return {
      race: this.state.race.getValue(),
      faction: this.state.faction.getValue(),
      classe: this.state.classe.getValue(),
    };
  }

  buildForm = () :FormBuilderElement[] => {
    return [
      new InputSelectConfig('faction', 'TA FACTION ?', this.state.faction, WorldObjectsToChoices(this.props.factions), {alignment: 'horizontal', multi: false}),
      new InputSelectConfig('race', 'TA RACE ?', this.state.race, WorldObjectsToChoices(this.props.races), {alignment: 'vertical', multi: false}),
      new InputSelectConfig('classe', 'TA CLASSE ?', this.state.classe, WorldObjectsToChoices(this.props.characterClasses), {alignment: 'vertical', multi: false}),
    ]; 
  }

  render() {
    return (
      <React.Fragment>
        <FormBuilder
          index={this.state.index}
          onDone={this.onDone}
          onFormSelect={this.onFormSelect}
          formElements={this.buildForm()}
          isStarted={false}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}