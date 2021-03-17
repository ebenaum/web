import classnames from 'classnames';
import * as React from 'react';

import { Checkmark } from './checkmark';

export interface Level {
  name: string;
  description?: string
};

function levelString(index: number) :string {
  switch(index) {
    case 0:
      return '-2';
    case 1:
      return '-1';
    case 2:
      return '00';
    case 3:
      return '+1';
    case 4:
      return '+2';
    case 5:
      return '+3';
    case 6:
      return '+4';
    default:
      return '+0';
  }
}

interface InputTraitProps {
  levels: Level[];
  selected: number;
  onChoice(selected: number) :void;
  points: number;
  bonus: number;
};

export class InputTrait extends React.Component<InputTraitProps, any> {
  constructor(props: InputTraitProps) {
    super(props);
  }

  maxLevel = () :number => {
    let modifier = 0;
    if (this.props.selected !== -1) {
      modifier = this.props.selected - 2;
    }

    if (this.props.bonus) {
      modifier += this.props.bonus;
    }

    return this.props.points + modifier;
  }

  minLevel = () :number => {
    if (!this.props.bonus) {
      return -2;
    }
    return this.props.bonus - 2;
  }

  onClick = (index: number) :void => {
    if ((index - 2) > this.maxLevel() || (index - 2) < this.minLevel()) {
      return;
    }
    this.props.onChoice(index - (this.props.bonus || 0));
  }

  render() {
    const selected = this.props.selected + (this.props.bonus || 0);
    const levels = this.props.levels.map((level, index) => {
      const levelInt = index - 2;
      const checkmark = selected === index ? <Checkmark/> : null ;
      const isActive = (levelInt >= this.minLevel()) && (levelInt <= this.maxLevel());
      return (
        <li key={index}>
          <div className='level'>{levelString(index)}</div>
          <div
            className={classnames('input-select-choice', { selected: selected === index, active: isActive, disabled: !isActive })}
            onClick={this.onClick.bind(this, index)}
          >
            <div>{level.name} {checkmark}</div>
            <p className={classnames('description', { hidden: level.description === undefined } )}>
              {level.description}
            </p>
          </div>
        </li>
      );
    });

    return (
      <React.Fragment>
        <div className='q-select'>
          <ul className='q-response-select'>
            {levels}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
