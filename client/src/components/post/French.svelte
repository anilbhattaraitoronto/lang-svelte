<script>
  import { push } from "svelte-spa-router";
  import { latestPosts } from "../../stores/poststore.js";
  let frenchPosts;
  if ($latestPosts) {
    frenchPosts = $latestPosts.filter((post) => post.lang === "French");
  } else {
    frenchPosts = [];
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
  <title>Posts in French</title>
</svelte:head>
<main>
  <h2>French</h2>
  {#if $latestPosts}
    {#each frenchPosts as post (post.id)}
      <article class="post">
        <h3>
          <a href="#/{post.id}/{post.slug}">{post.title}</a>
        </h3>
      </article>
    {/each}
  {:else}
    <p>No french posts yet</p>
  {/if}

</main>
