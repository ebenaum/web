import * as React from 'react';

export interface TextNarratorComponent {
  content: string;
  done: boolean;
};

interface TextNarratorProps {
  content: string;
  stepMs: number;
  component: React.ComponentClass<TextNarratorComponent>;
};

interface TextNarratorState {
  content: string;
  index: number;
  done: boolean;
};

export class TextNarrator extends React.Component<TextNarratorProps, TextNarratorState> {
  constructor(props: TextNarratorProps) {
    super(props);

    this.state = {
      content: '',
      index: -1,
      done: false,
    };
  }

  stepMs = (c: string) :number => {
    switch(c) {
      case '.':
      case '!':
        return 10 * this.props.stepMs;
      case ',':
        return 4 * this.props.stepMs;
      default:
        return this.props.stepMs;
    } 
  }

  tick = (ms: number) => {
    const nextIndex = this.state.index + 1;
    if (nextIndex == this.props.content.length) {
      this.setState({ done: true });
      return;
    }

    const nextChar = this.props.content[nextIndex];
    setTimeout(() => {
      this.setState({ content: this.state.content + nextChar, index: nextIndex});
      this.tick(this.stepMs(nextChar));
    }, ms); 
  }

  componentDidMount() {
    this.tick(0);
  }

  render() {
    return React.createElement(this.props.component, { content: this.state.content, done: this.state.done });
  }
}
