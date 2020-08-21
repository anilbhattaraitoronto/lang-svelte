<script>
  import { user } from "../../stores/authstore.js";
  import { onMount } from "svelte";
  import { latestPosts } from "../../stores/poststore.js";
  import { link } from "svelte-spa-router";
  import LandTransition from "./LandTransition.svelte";
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
  <title>Welcome</title>
</svelte:head>
<main>
  <LandTransition>
    <h2>Welcome</h2>
  </LandTransition>

  {#if $latestPosts}
    {#each $latestPosts as post (post.id)}
      <article class="post" id={post.id}>
        <img src={post.thumbnail} alt="" />
        <p class="posted-date">
          <em>{new Date(post.posted_date).toDateString()}</em>
        </p>
        <p class="post-lang">
          <a href="#/{post.lang}">{post.lang}</a>
        </p>
        <h3>
          <a href="/{post.id}/{post.slug}" use:link>{post.title}</a>
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
