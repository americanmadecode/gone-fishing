import { type Writable } from "svelte/store";

// #region STORE

export type GameStore = {
  score: number;
  fishSize: number;
  fishLocation: {
    x: number;
    y: number;
  };
};

export type GameFunctionsProps = {
  store: Writable<{
    score: number;
    fishSize: number;
    fishLocation: {
      x: number;
      y: number;
    };
  }>;
};

export type GameEventsProps = {
  triggerWonRound: ({ pondWidth, pondHeight }) => void;
};

//#endregion

//#region EVENTS

export type HandleMouseMoveProps = {
  event;
  pondWidth: number;
  pondHeight: number;
};

//#endregion

//#region FUNCTIONS

export type TriggerWonRoundProps = {
  pondWidth: number;
  pondHeight: number;
};

export type TriggerFishRelocateProps = {
  pondWidth: number;
  pondHeight: number;
};

export type ResetProps = {
  pondWidth: number;
  pondHeight: number;
};

//#endregion
