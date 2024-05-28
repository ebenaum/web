import * as React from "react";

import { InputTrait, Level } from "./input-trait";

export interface InputTraitBranchValue {
  name: string;
  ref: string;
  levels: Level[];
  selected: number;
  bonus: number;
}

interface InputTraitBranchProps {
  name: string;
  branches: InputTraitBranchValue[];
  onChoice(key: string, selected: number): void;
  points: number;
}

export class InputTraitBranch extends React.Component<
  InputTraitBranchProps,
  any
> {
  constructor(props: InputTraitBranchProps) {
    super(props);
  }

  onChoice = (key: string, index: number) => {
    this.props.onChoice(key, index);
  };

  render() {
    return (
      <React.Fragment>
        <div className="title">{this.props.name}</div>
        <div className={`grid grid-cols-2 gap-2`}>
          {this.props.branches.map((branch, index) => {
            return (
              <div key={branch.ref} className={`${index === 0 ? "first" : ""}`}>
                <div className="title">{branch.name}</div>
                <InputTrait
                  levels={branch.levels}
                  selected={branch.selected}
                  bonus={branch.bonus}
                  onChoice={this.onChoice.bind(this, branch.ref)}
                  points={this.props.points}
                />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
