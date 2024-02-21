<script>
  import { onMount, tick } from "svelte";
  import fishIcon from "./assets/fish-icon.svg";
  import { gameStore } from "./stores/gameStore/store";
  import typewriter from "./utils/animations/typewriter";
  import { fade } from "svelte/transition";

  let pond;
  let pondX;
  let pondY;

  tick;

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
    {#if $gameStore.loading.wonRound}
      <img
        class="fish"
        style="height:{$gameStore.fishSize}px; width: {$gameStore.fishSize}px; top: {$gameStore
          .fishLocation.y}px; left: {$gameStore.fishLocation.x}px"
        src={fishIcon}
        alt="fishie"
        transition:fade
      />
    {/if}
  </div>
  <div class="sidebar">
    <h1>Score: {$gameStore.score}</h1>
    {#if $gameStore.loading.wonRound}
      <p transition:typewriter={{ speed: 2 }}>Good work, you caught a fishy</p>
    {/if}
  </div>
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
    background: #4ac29a; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #bdfff3,
      #4ac29a
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #bdfff3,
      #4ac29a
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height: 100%;
    width: 75%;
  }
  .sidebar {
    background: blue;
    height: 100%;
    width: 23%;
  }
</style>
