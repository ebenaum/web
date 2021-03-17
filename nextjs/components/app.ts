import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface WorldObject {
  ref: string;
  type: string;
  name: string;
  description: string;
}

let content: { [Identifier: string]: string };
let world: { [Identifier: string]:  WorldObject};

export function c(name: string) :string {
  return content[name];
}

export function w(name: string) :WorldObject {
  return world[name];
}

export function wtype(t: string) :WorldObject[] {
  const out: WorldObject[] = [];

  for (const key in world) {
    if (world[key].type === t) {
      out.push(world[key]);
    } 
  }

  return out;
}
