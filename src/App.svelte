<script>
  import { onMount } from "svelte";
  import fishIcon from "./assets/fish-icon.svg";
  import { gameStore } from "./stores/gameStore/store";

  let pond;
  let pondX;
  let pondY;

  // Add the observer when component mounts and cleanup after
  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // We're only watching one element
      const entry = entries.at(0);
      console.log(entry.borderBoxSize);
      //Get the block size
      pondX = entry.borderBoxSize[0].inlineSize;
      pondY = entry.borderBoxSize[0].blockSize;
      gameStore.functions.triggerFishRelocate({
        pondWidth: pondX,
        pondHeight: pondY,
      });
    });
    resizeObserver.observe(pond);

    // This callback cleans up the observer
    return () => resizeObserver.unobserve(pond);
  });
</script>

<main>
  <div
    on:mousemove={(event) =>
      gameStore.events.handleMouseMove({
        event,
        pondWidth: pondX,
        pondHeight: pondY,
      })}
    class="playingField"
    role="document"
    id="pond"
    bind:this={pond}
  >
    <img
      class="fish"
      style="height:{$gameStore.fishSize}px; width: {$gameStore.fishSize}px; top: {$gameStore
        .fishLocation.y}px; left: {$gameStore.fishLocation.x}px"
      src={fishIcon}
      alt="fishie"
    />
  </div>
  <div class="sidebar"></div>
</main>

<style>
  main {
    display: flex;
    gap: 2%;
    height: 100vh;
    background-color: #f0f0f0;
    width: 100vw;
  }
  .fish {
    position: relative;
  }
  .playingField {
    background: red;
    height: 100%;
    width: 75%;
  }
  .sidebar {
    background: blue;
    height: 100%;
    width: 23%;
  }
</style>
