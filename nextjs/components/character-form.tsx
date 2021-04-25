import * as React from 'react';

import { WorldObject } from './app';
import { FormBuilder } from './forms/builder';
import { BuildInputSelectValue, InputSelectValue, InputSelectConfig, WorldObjectsToChoices } from './forms/input-select';
import { emptyTraits, InputTraitsValue, InputTraits, InputTraitsConfig, Traits } from './forms/input-traits';
import { InputTextValue, InputTextConfig } from './forms/input-text';
import { InputPersonalValue, InputPersonalConfig } from './input-personal';
import { InputTextAreaConfig } from './forms/input-textarea';
import { FormBuilderElement } from './forms/builder-base-config';
import { CharacterFormIntroConfig } from './character-form-intro';

interface CharacterFormProps {
  world: any;
  traitsPoints: number;
  // TODO: types
  races: any;
  factions: any;
  characterClasses: any;
  characteristics: any;
};

interface CharacterFormState {
  index: number;
  name: InputPersonalValue;
  comment: InputTextValue;
  traits: InputTraitsValue;
  race: InputSelectValue;
  age: InputSelectValue;
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
      name: new InputPersonalValue("", "", ""), 
      comment: new InputTextValue(""), 
      race: BuildInputSelectValue([], WorldObjectsToChoices(props.races)),
      age: BuildInputSelectValue([], [
        {ref: "-12", value: "- de 12", description: ""},
        {ref: "12-17", value: "12-17", description: ""},
        {ref: "18-60", value: "18-60", description: ""},
        {ref: "+60", value: "+ de 60", description: ""},
      ]),
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
    window.scrollTo(0,0);
  }

  form = () :any => {
    return {
      race: this.state.race.getValue(),
      comment: this.state.comment.text,
      faction: this.state.faction.getValue(),
      age: this.state.age.getValue(),
      classe: this.state.classe.getValue(),
      traits: this.state.traits.traits,
      name: this.state.name.firstName.text + ' ' + this.state.name.lastName.text,
      email: this.state.name.email.text,
    };
  }

  races = () :WorldObject[] => {
    const faction = this.state.faction.getValue();
    if (faction === '') {
      return this.props.races;
    }

    const races: WorldObject[] = [];
    this.props.races.forEach((race) => {
      if (race.include === null || race.include.length === 0 || race.include.indexOf(faction) !== -1) {
        races.push(race);
      }
    });

    return races;
  }  

  buildForm = () :FormBuilderElement[] => {
    return [
      new CharacterFormIntroConfig(),
      new InputPersonalConfig('name', 'TON NOM ?', this.state.name),
      new InputSelectConfig('age', 'TON AGE', this.state.age, [
        {ref: "-12", value: "- de 12", description: ""},
        {ref: "12-17", value: "12-17", description: ""},
        {ref: "18-60", value: "18-60", description: ""},
        {ref: "+60", value: "+ de 60", description: ""},
      ], { alignment: 'horizontal', multi: false }),
      new InputSelectConfig('faction', 'TA FACTION ?', this.state.faction, WorldObjectsToChoices(this.props.factions), { alignment: 'horizontal', multi: false, displayListNumber: true }),
      new InputSelectConfig('race', 'TA RACE ?', this.state.race, WorldObjectsToChoices(this.races()), { alignment: 'vertical', multi: false }),
      new InputSelectConfig('classe', 'TA CLASSE ?', this.state.classe, WorldObjectsToChoices(this.props.characterClasses), { alignment: 'vertical', multi: false }),
      new InputTraitsConfig('traits', 'CARAC ?', this.props.characteristics, this.state.traits.points, this.state.traits.traits, emptyTraits(this.props.characteristics)),
    ]; 
  }

  render() {
    return (
      <React.Fragment>
        <div id='character-form'>
        <FormBuilder
          index={this.state.index}
          onDone={this.onDone}
          onFormSelect={this.onFormSelect}
          formElements={this.buildForm()}
          isStarted={false}
          onChange={this.onChange}
        />
        </div>
      </React.Fragment>
    );
  }
}
