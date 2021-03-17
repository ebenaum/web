import * as React from 'react';

import { InputTraitBranch } from './input-trait-branch';
import { InputLabelProps, InputLabel } from './input-label'; 
import { FormBuilderBaseConfig, InputConfig, NextConfigCallback } from './form-builder-base-config'; 

export interface Traits {
  gear: number;
  dexterity: number;
  endurance: number;
  force: number;
  discipline: number;
  knowledge: number;
  charisma: number;
  will: number;
}

export function emptyTraits() :Traits {
  return {
    gear: 0,
    dexterity: 0,
    endurance: 0,
    force: 0,
    discipline: 0,
    knowledge: 0,
    charisma: 0,
    will: 0,
  };
}

const data = [
  {
    title: 'Physique',
    abilities: [
      {
        key: 'endurance',
        title: 'Endurance',
        levels: [
          {
            name: "Handicap lourd et vous ne pouvez pas courir.",
            description: "Un handicap vous sera attribué dans votre background."
          },
          {
            name: " - 1 PV et handicap léger.",
            description: "Un handicap vous sera attribué dans votre background."
          },
          {
            name: "3 PV",
            description: "Constitution normale."
          },
          {
            name: "4 PV",
            description: "Vous infligez “CHOC” lors du premier coup d'un combat.",
          },
          {
            name: "5 PV",
            description: "description."
          },
          {
            name: "Un skill gratuit en Endurance",
            description: "description."
          },
          {
            name: "Tous les dégâts ne vous infligent que 1 PV",
            description: "description."
          },
        ],
      },
      {
        key: 'force',
        title: 'Force',
        levels: [
          {
            name: "Vous ne savez pas vous battre.",
            description: "Un handicap vous sera attribué dans votre background."
          },
          {
            name: "Vous pouvez n'utiliser que des dagues.",
            description: "Un handicap vous sera attribué dans votre background."
          },
          {
            name: "Vous pouvez utiliser toutes les armes.",
            description: "description."
          },
          {
            name: "“CHOC”",
            description: "Vous infligez “CHOC” lors du premier coup d'un combat.",
          },
          {
            name: "“DEUX” dégâts avec votre arme à deux mains.",
            description: "description."
          },
          {
            name: "Un skill gratuit de “Force”.",
            description: "description."
          },
          {
            name: "Vous infligez “DEUX” dégâts à chaque coup.",
            description: "description."
          },
        ],
      },
    ]
  },
  {
    title: 'Habileté',
    abilities: [
      {
        key: 'gear',
        title: 'Equipement',
        levels: [
          {
            name: "Equipement1",
            description: '',
          },
          {
            name: "Equipement2",
            description: '',
          },
          {
            name: "Equipement3",
            description: '',
          },
          {
            name: "Equipement4",
            description: '',
          },
          {
            name: "Equipement5",
            description: '',
          },
          {
            name: "Equipement6",
            description: '',
          },
          {
            name: "Equipement7",
            description: '',
          },   
        ],
      },
    ]
  }
];

export class InputTraitsValue {
  traits: Traits;
  points: number;

  constructor(traits: Traits, points: number) {
    this.traits = traits;
    this.points = points;
  }
}

export class InputTraitsConfig extends FormBuilderBaseConfig {
  _value: Traits;
  _points: number;
  _bonus: Traits;

  constructor(name: string, text: string, points: number, traits: Traits, bonus: Traits) {
    super(name, text);
    this._value = traits;
    this._points = points;
    this._bonus = bonus;
  }

  onChangeHandler = (onNextConfig: NextConfigCallback): ((change: InputTraitsValue) => void) => {
    return (change: InputTraitsValue) :void => {
      onNextConfig(new InputTraitsConfig(this.name, this.text, change.points, change.traits, this._bonus));
    }
  }

  build = (c: InputConfig) :JSX.Element => {
    return <InputTraits
      name={this.name}
      text={this.text}
      points={this._points}
      traitsBonus={this._bonus}
      traits={this._value}
      onAbilityChoice={this.onChangeHandler(c.onNextConfig)}
    />;
  }

  value = () :InputTraitsValue => {
    return new InputTraitsValue(this._value, this._points);
  }
}

interface InputTraitsProps extends InputLabelProps {
  points: number;
  traits: Traits;
  traitsBonus: Traits;
  onAbilityChoice(change: InputTraitsValue) :void;
};

export class InputTraits extends React.Component<InputTraitsProps, any> {
  constructor(props: InputTraitsProps) {
    super(props);
  }

  onAbilityChoice = (branch: string, level: number) => {
    level = level - 2;

    let points = this.props.points;
    const traits = this.props.traits;
    const current = traits[branch];

    traits[branch] = level

    points = points + current - level;
    
    this.props.onAbilityChoice(new InputTraitsValue(traits, points));
  }

  render() {
    return (
      <React.Fragment>
      <InputLabel {...this.props} />
      {
        data.map((mainAbility) => {
          return (
            <InputTraitBranch
              key={mainAbility.title}
              name={mainAbility.title}
              onChoice={this.onAbilityChoice}
              branches={mainAbility.abilities.map((ability) => {
                return {
                  key: ability.key,  
                  title: ability.title,  
                  levels: ability.levels,  
                  selected: this.props.traits[ability.key] + 2,
                  bonus: this.props.traitsBonus[ability.key],
                };
              })}
              points={this.props.points}
            />
          );
        })  
      }
      </React.Fragment>
    );
  }
}
