<script>
  import { latestPosts } from "../../stores/poststore.js";
  import { location } from "svelte-spa-router";
  export let params = {};
  let post;
  if ($latestPosts) {
    post = $latestPosts.find((post) => post.id == params.id);
  } else {
    post = {};
  }
</script>

<style>
  main {
    padding: 20px;
  }
  article {
    padding: 20px;
    background: rgb(241, 239, 239);
    margin: 10px auto;
    border-bottom: 1px solid rgba(211, 211, 211, 0.555);
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>
<main>

  <h2>Post Detail</h2>
  {#if post}
    <article>
      <h3>{post.title}</h3>
    </article>
  {:else}
    <p>No post detail.</p>
  {/if}
</main>
