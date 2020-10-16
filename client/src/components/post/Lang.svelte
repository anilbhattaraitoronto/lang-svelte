<script>
    import { push } from "svelte-spa-router";
    import LandTransition from "./LandTransition.svelte";
    import PostTransition from "./PostTransition.svelte";
    import { latestPosts, langPosts } from "../../stores/poststore.js";

    export let params = {};
    latestPosts.subscribe((data) => {
        console.log(params);
        $langPosts = data.filter((post) => post.lang == params.lang);
    });
    // if ($latestPosts) {
    //   frenchPosts = $latestPosts.filter(post => post.lang === "French");
    // } else {
    //   frenchPosts = [];
    //   push("/");
    // }
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
    <title>Posts in {params.lang}</title>
</svelte:head>
<main>
    <LandTransition>
        <h2>{params.lang.toUpperCase()}</h2>
    </LandTransition>

    {#if $langPosts.length > 0}
        <div class="posts">
            {#each $langPosts as post (post.id)}
                <article class="post">
                    <img src={post.thumbnail} alt="" />
                    <p class="posted-date">
                        <em>{new Date(post.posted_date).toDateString()}</em>
                    </p>
                    <h3><a href="#/{post.id}/{post.slug}">{post.title}</a></h3>
                    <p><em>Summary:</em> {post.summary}</p>
                </article>
            {/each}
        </div>
    {:else}
        <p>No posts yet in {params.lang} language</p>
    {/if}
</main>
