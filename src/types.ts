export type Character = {
  age: number;
  birthday: number;
  tribe: string;
  name: string;
};

export type State = {
  day: number;
  playRate: 1 | 2 | 3;
  paused: boolean;
  character: Character;
};

export type Game = {
  stop: number;
  lastTick: number;
  tickLength: number;
  lastRender: number;
  gameStart: number;
  dayClock: number;
};
