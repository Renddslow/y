import { setup } from 'goober';
import { h } from 'preact';
import parseDay from './parseDay';

setup(h);

type State = {
  name: string;
  day: number;
  playRate: 1 | 2 | 3;
  paused: boolean;
};

type Game = {
  stop: number;
  lastTick: number;
  tickLength: number;
  lastRender: number;
  gameStart: number;
  dayClock: number;
};

;(function () {
  const game: Game = {
    tickLength: 50,
    dayClock: 0,
  } as Game;

  const state: State = {
    name: '',
    day: 1,
    playRate: 1,
    paused: false,
  };

  const main = (ts: number) => {
    game.stop = window.requestAnimationFrame(main);
    const nextTick = game.lastTick + game.tickLength;
    let numTicks = 0;

    if (ts > nextTick) {
      const timeSinceTick = ts - game.lastTick;
      numTicks = Math.floor(timeSinceTick / game.tickLength);
    }

    queueUpdates(numTicks);
    // render(ts);
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
      game.dayClock = 0;
      console.log(parseDay(state.day));
    }
    // if (timeSinceStart > state.day) {
    //   state.day = timeSinceStart;
    //   console.log(parseDay(state.day))
    // }
  };

  game.lastTick = performance.now();
  game.lastRender = game.lastTick;
  game.gameStart = game.lastTick;

  console.log(parseDay(state.day));
  // @ts-ignore
  window.setPlaybackRate = (speed: 1 | 2 | 3) => {
    state.playRate = speed;
  };
  // @ts-ignore
  window.setPaused = (paused: boolean) => {
    state.paused = paused;
  }
  main(performance.now());
}());

