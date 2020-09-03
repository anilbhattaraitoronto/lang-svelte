<script>
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  let show = false;
  onMount(() => {
    show = true;
  });
</script>

<style>
  main {
    position: relative;
  }
</style>

{#if show}
  <main
    transition:scale={{ duration: 700, delay: 400, opacity: 0.4, start: 0.5, easing: quintOut }}>
    <slot>
      <!-- optional fallback -->
    </slot>
  </main>
{/if}
