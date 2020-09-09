<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
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
  <main in:fly={{ x: 300, duration: 1000 }}>
    <slot>
      <!-- optional fallback -->
    </slot>
  </main>
{/if}
