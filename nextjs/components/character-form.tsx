import * as React from 'react';

import { FormBuilder } from './form-builder';
import { BuildInputSelectValue, InputSelectValue, InputSelectConfig, WorldObjectsToChoices } from './input-select';
import { emptyTraits, InputTraitsValue, InputTraits, InputTraitsConfig, Traits } from './input-traits';
import { InputTextValue, InputTextConfig } from './input-text';
import { InputTextAreaConfig } from './input-textarea';
import { FormBuilderElement } from './form-builder-base-config';

interface CharacterFormProps {
  traitsPoints: number;
  // TODO: types
  races: any;
  factions: any;
  characterClasses: any;
  characteristics: any;
};

interface CharacterFormState {
  index: number;
  name: InputTextValue;
  comment: InputTextValue;
  traits: InputTraitsValue;
  race: InputSelectValue;
  faction: InputSelectValue;
  classe: InputSelectValue;
};

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
      traits: new InputTraitsValue(emptyTraits(this.props.characteristics), this.props.traitsPoints),
      name: new InputTextValue(""), 
      comment: new InputTextValue(""), 
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
    const traits = emptyTraits(this.props.characteristics);

    return traits;
  }

  onFormSelect = (index: number)  :void => {
    this.setState({ index: index });
  }

  form = () :any => {
    return {
      race: this.state.race.getValue(),
      comment: this.state.comment.text,
      faction: this.state.faction.getValue(),
      classe: this.state.classe.getValue(),
      traits: this.state.traits.traits,
      name: this.state.name.text,
    };
  }

  buildForm = () :FormBuilderElement[] => {
    return [
      new InputTextConfig('name', 'TON NOM ?', this.state.name),
      new InputTextAreaConfig('comment', "Qu'est ce que la raie bouclée ?", this.state.comment),
      new InputSelectConfig('faction', 'TA FACTION ?', this.state.faction, WorldObjectsToChoices(this.props.factions), { alignment: 'horizontal', multi: false }),
      new InputSelectConfig('race', 'TA RACE ?', this.state.race, WorldObjectsToChoices(this.props.races), { alignment: 'vertical', multi: false }),
      new InputSelectConfig('classe', 'TA CLASSE ?', this.state.classe, WorldObjectsToChoices(this.props.characterClasses), { alignment: 'vertical', multi: true }),
      new InputTraitsConfig('traits', 'CARAC ?', this.props.characteristics, this.state.traits.points, this.state.traits.traits, emptyTraits(this.props.characteristics)),
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
