export type State = {
  name: string;
  day: number;
  playRate: 1 | 2 | 3;
  paused: boolean;
};

export type Game = {
  stop: number;
  lastTick: number;
  tickLength: number;
  lastRender: number;
  gameStart: number;
  dayClock: number;
};
