/** global h */
import { setup } from 'goober';

import { Game, State } from './types';
import renderer from './render';
import {birthday, startingAge, tribe} from './utils/random';

// @ts-ignore
setup(h);

;(function () {
  const game: Game = {
    tickLength: 50,
    dayClock: 0,
  } as Game;

  const state: State = {
    day: 1,
    playRate: 1,
    paused: false,
    character: {
      name: '',
      age: startingAge(),
      birthday: birthday(),
      tribe: tribe(),
    },
  };

  const render = renderer(state);

  // TODO: move these to another file
  window.addEventListener('pausechange', (e: CustomEvent) => {
    state.paused = e.detail.paused;
  });

  window.addEventListener('playspeedchange', (e: CustomEvent) => {
    state.playRate = e.detail.speed;
  });

  const main = (ts: number) => {
    game.stop = window.requestAnimationFrame(main);
    const nextTick = game.lastTick + game.tickLength;
    let numTicks = 0;

    if (ts > nextTick) {
      const timeSinceTick = ts - game.lastTick;
      numTicks = Math.floor(timeSinceTick / game.tickLength);
    }

    queueUpdates(numTicks);
    render(ts, state);
    game.lastRender = ts;
  };

  const queueUpdates = (numTicks: number) => {
    for(let i=0; i < numTicks; i++) {
      const prevTick = game.lastTick;
      game.lastTick = game.lastTick + game.tickLength; // Now lastTick is this tick.
      update(game.lastTick, game.lastTick - prevTick);
    }
  };

  const update = (ts: number, delta: number) => {
    if (state.paused) return;

    const d = delta * state.playRate;
    game.dayClock += d;

    if (game.dayClock >= 1000) {
      state.day += 1;
      if (state.day % 365 === state.character.birthday) {
        state.character.age++;
      }
      game.dayClock = 0;
    }
  };

  game.lastTick = performance.now();
  game.lastRender = game.lastTick;
  game.gameStart = game.lastTick;

  const now = performance.now();
  main(now);
}());

