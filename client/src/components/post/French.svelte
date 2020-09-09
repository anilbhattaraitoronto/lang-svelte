<script>
  import { push } from "svelte-spa-router";
  import LandTransition from "./LandTransition.svelte";
  import PostTransition from "./PostTransition.svelte";
  import { latestPosts } from "../../stores/poststore.js";
  let frenchPosts;
  if ($latestPosts) {
    frenchPosts = $latestPosts.filter(post => post.lang === "French");
  } else {
    frenchPosts = [];
    push("/");
  }
</script>

<style>
  main {
    padding: 20px;
  }
  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4px;
    transition: 300ms all ease-in-out;
  }
  article {
    width: 100%;
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
    width: 200px;
    height: 100px;
    object-fit: cover;
    padding-right: 20px;
    float: left;
    border-radius: 0;
  }
  @media (max-width: 600px) {
    .posts {
      grid-template-columns: 1fr;
    }
    .post img {
      display: block;
      width: 100%;
      margin: auto;
      height: auto;
      float: none;
      padding-right: 0;
    }
  }
</style>

<svelte:head>
  <title>Posts in French</title>
</svelte:head>
<main>
  <LandTransition>
    <h2>French</h2>
  </LandTransition>

  {#if $latestPosts}
    <PostTransition>

      <div class="posts">

        {#each frenchPosts as post (post.id)}
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
      </div>
    </PostTransition>
  {:else}
    <p>No french posts yet</p>
  {/if}
</main>
