<script>
  import { user } from "../../stores/authstore.js";
  import { onMount } from "svelte";
  import { latestPosts } from "../../stores/poststore.js";
  import { link } from "svelte-spa-router";
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

<main>
  <h2>Welcome</h2>
  {#if $latestPosts}
    {#each $latestPosts as post (post.id)}
      <article class="post" id={post.id}>
        <h3>
          <a href="/{post.id}/{post.slug}" use:link>{post.title}</a>
        </h3>
      </article>
    {/each}
  {:else}
    <p>No Spanish posts yet</p>
  {/if}
</main>
