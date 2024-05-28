import * as React from "react";

import { InputTraitBranch } from "./input-trait-branch";
import { InputLabelProps, InputLabel } from "./input-label";
import {
  FormBuilderBaseConfig,
  InputConfig,
  NextConfigCallback,
} from "./builder-base-config";

interface Characteristic {
  ref: string;
  branch: string;
  name: string;
  description: string;
  levels: { title: string; description: string }[];
}

interface GroupedCharacteristics {
  [key: string]: Characteristic[];
}

interface Characteristics {
  [key: string]: Characteristic;
}

export interface Traits {
  [key: string]: number;
}

export function emptyTraits(characteristics: Characteristics): Traits {
  const traits: Traits = {};
  for (let characteristicKey in characteristics) {
    traits[characteristicKey] = 0;
  }

  return traits;
}

function groupCharacteristicsByBranch(
  characteristics: Characteristics,
): GroupedCharacteristics {
  const grouped: GroupedCharacteristics = {};
  for (let characteristicKey in characteristics) {
    const branch = characteristics[characteristicKey].branch;
    if (grouped[branch] === undefined) {
      grouped[branch] = [];
    }

    grouped[branch].push(characteristics[characteristicKey]);
  }

  return grouped;
}

export class InputTraitsValue {
  traits: Traits;
  points: number;

  constructor(traits: Traits, points: number) {
    this.traits = traits;
    this.points = points;
  }
}

export class InputTraitsConfig extends FormBuilderBaseConfig {
  _characteristics: Characteristics;
  _value: Traits;
  _points: number;
  _bonus: Traits;

  constructor(
    name: string,
    text: string,
    characteristics: Characteristics,
    points: number,
    traits: Traits,
    bonus: Traits,
  ) {
    super(name, text);
    this._value = traits;
    this._points = points;
    this._bonus = bonus;
    this._characteristics = characteristics;
  }

  onChangeHandler = (
    onNextConfig: NextConfigCallback,
  ): ((change: InputTraitsValue) => void) => {
    return (change: InputTraitsValue): void => {
      onNextConfig(
        new InputTraitsConfig(
          this.name,
          this.text,
          this._characteristics,
          change.points,
          change.traits,
          this._bonus,
        ),
      );
    };
  };

  build = (c: InputConfig): JSX.Element => {
    return (
      <InputTraits
        name={this.name}
        text={this.text}
        characteristics={this._characteristics}
        points={this._points}
        traitsBonus={this._bonus}
        traits={this._value}
        onAbilityChoice={this.onChangeHandler(c.onNextConfig)}
      />
    );
  };

  value = (): InputTraitsValue => {
    return new InputTraitsValue(this._value, this._points);
  };

  validValue = (): boolean => {
    return this._points === 0;
  };
}

interface InputTraitsProps extends InputLabelProps {
  characteristics: Characteristics;
  points: number;
  traits: Traits;
  traitsBonus: Traits;
  onAbilityChoice(change: InputTraitsValue): void;
}

export class InputTraits extends React.Component<InputTraitsProps, any> {
  constructor(props: InputTraitsProps) {
    super(props);
  }

  onAbilityChoice = (branch: string, level: number) => {
    level = level - 2;

    let points = this.props.points;
    const traits = this.props.traits;
    const current = traits[branch];

    traits[branch] = level;

    points = points + current - level;

    this.props.onAbilityChoice(new InputTraitsValue(traits, points));
  };

  render() {
    const grouped = groupCharacteristicsByBranch(this.props.characteristics);
    return (
      <React.Fragment>
        <InputLabel {...this.props} />
        {Object.keys(grouped).map((branch) => {
          return (
            <InputTraitBranch
              key={branch}
              name={branch}
              onChoice={this.onAbilityChoice}
              branches={grouped[branch].map((ability) => {
                return {
                  ref: ability.ref,
                  name: ability.name,
                  levels: ability.levels,
                  selected: this.props.traits[ability.ref] + 2,
                  bonus: this.props.traitsBonus[ability.ref],
                };
              })}
              points={this.props.points}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
