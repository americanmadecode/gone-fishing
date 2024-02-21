import { get } from "svelte/store";
import { gameStore } from "./store";
import type { GameEventsProps, HandleMouseMoveProps } from "./types";

export const events = ({ triggerWonRound }: GameEventsProps) => {
  let mousePosition = { x: 0, y: 0 };
  const handleMouseMove = ({
    event,
    pondWidth,
    pondHeight,
  }: HandleMouseMoveProps) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    mousePosition = mousePosition;
    const currentStore = get(gameStore);

    if (
      mousePosition.x > currentStore.fishLocation.x &&
      mousePosition.x < currentStore.fishLocation.x + currentStore.fishSize &&
      mousePosition.y > currentStore.fishLocation.y &&
      mousePosition.y < currentStore.fishLocation.y + currentStore.fishSize
    ) {
      triggerWonRound({ pondWidth, pondHeight });
    }
  };
  return {
    handleMouseMove,
  };
};
