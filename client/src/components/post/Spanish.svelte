<script>
  import { push } from "svelte-spa-router";
  import { latestPosts } from "../../stores/poststore.js";
  import LandTransition from "./LandTransition.svelte";

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
    overflow: auto;
  }
  .posted-date {
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.493);
    padding-bottom: 8px;
  }
  .post img {
    width: 250px;
    height: 120px;
    object-fit: cover;
    padding-right: 20px;
    float: left;
  }
</style>

<svelte:head>
  <title>Posts in Spanish</title>
</svelte:head>
<main>
  <LandTransition>
    <h2>Spanish</h2>
  </LandTransition>

  {#if $latestPosts}
    {#each spanishPosts as post (post.id)}
      <article class="post">
        <img src={post.thumbnail} alt="" />

        <p class="posted-date">
          <em>{new Date(post.posted_date).toDateString()}</em>
        </p>
        <h3>
          <a href="#/{post.id}/{post.slug}">{post.title}</a>
        </h3>
        <p>
          <em>Summary:</em>
          {post.summary}
        </p>
      </article>
    {/each}
  {:else}
    <p>No Spanish posts yet</p>
  {/if}

</main>
