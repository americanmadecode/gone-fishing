import {
  type GameFunctionsProps,
  type ResetProps,
  type TriggerFishRelocateProps,
  type TriggerWonRoundProps,
} from "./types";

export const functions = ({ store }: GameFunctionsProps) => {
  const triggerFishShrink = () => {
    store.update(
      (gameStore) =>
        (gameStore = {
          ...gameStore,
          fishSize: Math.round(gameStore.fishSize * 0.75),
        })
    );
  };

  const incrementScore = () => {
    store.update(
      (gameStore) =>
        (gameStore = { ...gameStore, score: (gameStore.score += 1) })
    );
  };

  const triggerWonRound = ({ pondWidth, pondHeight }: TriggerWonRoundProps) => {
    incrementScore();
    triggerFishShrink();
    triggerFishRelocate({ pondHeight, pondWidth });
  };

  const triggerFishRelocate = ({
    pondWidth,
    pondHeight,
  }: TriggerFishRelocateProps) => {
    store.update((gameStore) => {
      const validX = { min: 0, max: pondWidth - gameStore.fishSize };
      const validY = { min: gameStore.fishSize, max: pondHeight };
      return (gameStore = {
        ...gameStore,
        fishLocation: {
          x: Math.floor(Math.random() * (validX.max - validX.min)) + validX.min,
          y: Math.floor(Math.random() * (validY.max - validY.min)),
        },
      });
    });
  };

  const reset = ({ pondWidth, pondHeight }: ResetProps) => {
    store.update(
      (gameStore) =>
        (gameStore = {
          ...gameStore,
          score: 0,
          fishSize: 100,
        })
    );
    triggerFishRelocate({ pondHeight, pondWidth });
  };
  return {
    triggerFishRelocate,
    triggerWonRound,
    reset,
  };
};
