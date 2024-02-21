import { writable } from "svelte/store";
import { functions } from "./functions";
import { events } from "./events";
import type { GameStore } from "./types";

const defaultStore: GameStore = {
  score: 0,
  fishSize: 100,
  fishLocation: { x: 0, y: 0 },
};

function initializeGameStore() {
  // initialize the store
  const store = writable(defaultStore);
  const { subscribe } = store;
  // Initialize the game functions and events
  const gameFunctions = functions({ store });
  const gameEvents = events({
    triggerWonRound: gameFunctions.triggerWonRound,
  });

  // Return the store and the functions and events
  return {
    subscribe,
    functions: {
      ...gameFunctions,
    },
    events: {
      ...gameEvents,
    },
  };
}

export const gameStore = initializeGameStore();
