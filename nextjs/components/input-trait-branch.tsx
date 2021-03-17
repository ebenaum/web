import classnames from 'classnames';
import * as React from 'react';

import { InputTrait, Level } from './input-trait';

export interface InputTraitBranchValue {
  title: string;
  key: string;
  levels: Level[];
  selected: number;
  bonus: number;
}; 

interface InputTraitBranchProps {
  name: string;
  branches: InputTraitBranchValue[];
  onChoice(key: string, selected: number) :void;
  points: number;
};

export class InputTraitBranch extends React.Component<InputTraitBranchProps, any> {
  constructor(props: InputTraitBranchProps) {
    super(props);
  }

  onChoice = (key: string, index: number) => {
    this.props.onChoice(key, index); 
  }

  render() {
    let width = '100%'
    if (document.documentElement.clientWidth >= 800) {
      width = 100 / this.props.branches.length + '%';
    }

    return (
      <React.Fragment>
      <div className='ability-branches'>
        <div className='title'>{this.props.name}</div>
        {
          this.props.branches.map((branch, index) => {
          return (
              <div
                key={branch.key}
                className={classnames('ability-branch full', { first: index === 0 })}
                style={{width: width}}
              >
                <div className='title'>{branch.title}</div>
                <InputTrait
                  levels={branch.levels}
                  selected={branch.selected}
                  bonus={branch.bonus}
                  onChoice={this.onChoice.bind(this, branch.key)}
                  points={this.props.points}
                />
              </div>
            );
          })
        }
      </div>
      </React.Fragment>
    );
  }
}
