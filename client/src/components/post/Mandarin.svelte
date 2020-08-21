<script>
  import { push } from "svelte-spa-router";
  import { latestPosts } from "../../stores/poststore.js";
  import { posts } from "../../../../../agdaily.com/client/src/stores/poststore.js";
  let mandarinPosts;
  if ($latestPosts) {
    mandarinPosts = $latestPosts.filter((post) => post.lang === "Mandarin");
  } else {
    mandarinPosts = [];
    push("/");
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
  <title>Posts in Mandarin</title>
</svelte:head>
<main>
  <h2>Mandarin</h2>
  {#if $latestPosts}
    {#each mandarinPosts as post (post.id)}
      <article class="post">
        <h3>
          <a href="#/{post.id}/{post.slug}">{post.title}</a>
        </h3>
      </article>
    {/each}
  {:else}
    <p>No Mandarin posts yet</p>
  {/if}

</main>
