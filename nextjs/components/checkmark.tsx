import * as React from 'react';

export class Checkmark extends React.Component<any, any> {
  render() {
    return (
      <svg className='checkmark' width="16" height="13" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="nonzero" d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"></path>
      </svg>
    );
  }
}
