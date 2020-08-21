<script>
  import { push } from "svelte-spa-router";
  import { latestPosts } from "../../stores/poststore.js";
  let spanishPosts;
  if ($latestPosts) {
    spanishPosts = $latestPosts.filter((post) => post.lang === "Spanish");
  } else {
    spanishPosts = [];
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
  <title>Posts in Spanish</title>
</svelte:head>
<main>
  <h2>Spanish</h2>
  {#if $latestPosts}
    {#each spanishPosts as post (post.id)}
      <article class="post">
        <h3>
          <a href="#/{post.id}/{post.slug}">{post.title}</a>
        </h3>
      </article>
    {/each}
  {:else}
    <p>No Spanish posts yet</p>
  {/if}

</main>
