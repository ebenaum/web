import classnames from 'classnames';
import * as React from 'react';

import { WorldObject } from '../app'; 
import { InputLabelProps, InputLabel } from './input-label'; 
import { FormBuilderBaseConfig, InputConfig, NextConfigCallback } from './builder-base-config'; 
import { Checkmark } from './checkmark';

export interface Choice {
  ref: string;
  value: string;
  description?: string;
};

export function WorldObjectsToChoices(input: WorldObject[]) :Choice[] {
  return input.map((obj) => {
    return {
      ref: obj.ref,
      value: obj.name,
      description: obj.description,
    };
  });
} 

export class InputSelectValue {
  indexes: number[];
  refs: string[];

  constructor(indexes: number[], refs: string[]) {
    this.indexes = indexes;
    this.refs = refs;
  }

  getValue = () :string => {
    if (this.indexes.length == 0) {
      return 'none';
    } else {
      return this.refs.join(',');
    }
  }
}

export function BuildInputSelectValue(selected: number[], choices: Choice[]) :InputSelectValue {
  return new InputSelectValue(selected,choices.filter((choice, index) => {
    return selected.indexOf(index) !== -1;
  }).map((choice) => {
    return choice.value;
  }));
}

interface InputSelectConfigOptions {
  alignment: 'horizontal'|'vertical';
  displayListNumber?: boolean;
  multi: boolean;
}

export class InputSelectConfig extends FormBuilderBaseConfig {
  _value: InputSelectValue;
  _choices: Choice[];
  _options: InputSelectConfigOptions;

  constructor(name: string, text: string, value: InputSelectValue, choices: Choice[], options: InputSelectConfigOptions) {
    super(name, text);
    this._value = value;
    this._choices = choices;
    this._options = options;
  }

  onChangeHandler = (onNextConfig: NextConfigCallback): ((change: InputSelectValue) => void) => {
    return (change: InputSelectValue) :void => {
      onNextConfig(new InputSelectConfig(this.name, this.text, change, this._choices, this._options));
    }
  }

  build = (c: InputConfig) :JSX.Element => {
    return <InputSelect
      choices={this._choices}
      selected={this._value.indexes}
      name={this.name}
      text={this.text}
      multi={this._options.multi}
      alignment={this._options.alignment}
      displayListNumber={this._options.displayListNumber}
      onChoice={this.onChangeHandler(c.onNextConfig)}
    />;
  }

  value = () :InputSelectValue => {
    return this._value;
  }

  validValue = () :boolean => {
    return (!this._options.multi && (this._value.indexes.length === 1)) || (this._options.multi && (this._value.indexes.length > 0));
  }
}

interface InputSelectProps extends InputLabelProps {
  choices: Choice[];
  multi?: boolean;
  selected: number[];
  alignment: 'horizontal'|'vertical';
  displayListNumber?: boolean;
  onChoice(change: InputSelectValue) :void;
};

export class InputSelect extends React.Component<InputSelectProps, any> {
  constructor(props: InputSelectProps) {
    super(props);
  }

  onClick = (index: number) :void => {
    let selected = this.props.selected;
    const multi  =  this.props.multi || false;
    const indexOf = selected.indexOf(index);

    if (indexOf !== -1) {
      selected.splice(indexOf, 1);
    } else {
      selected.push(index);
    }

    if (!multi && selected.length > 1) {
      selected = [selected[1]];
    }

    this.props.onChoice(new InputSelectValue(selected, this.props.choices.filter((choice, index) => {
      return selected.indexOf(index) !== -1;
    }).map((choice) => {
      return choice.ref;
    })));
  }

  formatDescription = (d: string) :any => {
    const paragraphs = d.split('\n\n').map((block, index) => {
      return <p key={'p-' + index} className='description'>{block}</p>;
    });

    return (
      <React.Fragment>
        { paragraphs }
      </React.Fragment>
    ); 
  }

  render() {
    const choices = this.props.choices.map((choice, index) => {
      const checkmark = this.props.selected.indexOf(index) !== -1 ? <Checkmark/> : null ;
      let description = null;
      if (choice.description !== undefined) {
        description = this.formatDescription(choice.description);
      }

      let head;
      if (this.props.displayListNumber) {
        head = <div>{index + 1}. {choice.value} {checkmark}</div>;
      } else {
        head = <div>{choice.value} {checkmark}</div>;
      }

      let colClass: string = 'offset-1 col-10';

      let nbOfColumns = 10;
      if (this.props.alignment === 'horizontal') {
        nbOfColumns = 12 / this.props.choices.length;
        if (nbOfColumns < 3) {
          nbOfColumns = 3;
        }

        colClass = `offset-1 col-10 offset-md-0 col-md-${nbOfColumns}`;
      }

      return (
        <div className={colClass}>
        <div className='ml-1'></div>
        <li 
          key={index}
          className={classnames('input-select-choice', { selected: this.props.selected.indexOf(index) !== -1, active: true })}
          onClick={this.onClick.bind(this, index)}
        >
          { head }
          { description }
        </li>
        <div className='mr-1'></div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className='character-form-vertical'>
        <InputLabel {...this.props} />
        <div className='q-select'>
          <ul className='q-response-select row'>
            {choices}
          </ul>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
