import { klona } from 'klona';
import diff from 'deep-diff';
import { has, get } from 'dot-prop';

import { State } from './types';
import GameSpeed from './views/GameSpeed/GameSpeed';

type Renderer = (state: State, ts: number) => void;
type Subscriptions = {
  [key: string]: Subscriptions | Renderer[];
};

const visitAndRender = (subs: Subscriptions, state: State) => {
  return Object.keys(subs).forEach((k) => {
    if (!Array.isArray(subs[k])) {
      return visitAndRender(subs[k] as Subscriptions, state);
    }

    (subs[k] as Renderer[]).forEach((fn) => fn(state, 0));
  });
};

const renderer = (startingState: State) => {
  const subscriptions: Subscriptions = {
    day: [GameSpeed],
    playSpeed: [GameSpeed],
    paused: [GameSpeed],
  };
  let state = klona(startingState);

  visitAndRender(subscriptions, state);

  return (ts: number, nextState: State) => {
    const diffs = diff(state, nextState);
    state = klona(nextState);

    if (!diffs) return;

    diffs
      .filter(({ kind }) => kind === 'E' || kind === 'A')
      .forEach(({ path }) => {
        const p = path.join('.');
        if (has(subscriptions, p)) {
          (get(subscriptions, p) as Renderer[]).forEach((fn) => fn(nextState, ts));
        }
      });
  };
};

export default renderer;
