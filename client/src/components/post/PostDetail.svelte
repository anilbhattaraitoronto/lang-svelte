<script>
    import { postData } from "../../App.svelte";
    import { latestPosts, postDetail } from "../../stores/poststore.js";
    import {
        user,
        successMessage,
        failureMessage,
    } from "../../stores/authstore";
    import { push, location } from "svelte-spa-router";
    import AuthTransition from "../auth/AuthTransition.svelte";

    let langs = ["French", "Mandarin", "Spanish"];
    export let params = {};

    latestPosts.subscribe((data) => {
        $postDetail = data.find((item) => item.id == params.id);
    });

    let token;
    if ($user) {
        token = JSON.parse($user).accessToken;
    }

    async function deletePost(id) {
        await fetch(`https://french.merohouse.com/api/posts/deletepost/${id}`, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    $successMessage = "Post is deleted.";
                    $latestPosts = $latestPosts.filter(
                        (post) => post.id !== id
                    );
                    push("/");
                } else {
                    $failureMessage = data.message;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //update

    const slugify = (val) => {
        return val
            .toString()
            .toLowerCase()
            .trim()
            .replace(/&/g, "-and-")
            .replace(/[\s\W-]+/g, "-");
    };
    // post values

    let lang = "";
    let title = "";
    let summary = "";
    let thumbnail = "";
    let content = "";
    let id;
    let slug = "";

    if ($postDetail) {
        lang = $postDetail.lang;
        title = $postDetail.title;
        summary = $postDetail.summary;
        thumbnail = $postDetail.thumbnail;
        content = $postDetail.content;
        id = $postDetail.id;
        slug = $postDetail.slug;
    }

    let updateUrl = `https://french.merohouse.com/api/posts/updatepost/${id}`;

    async function updatePost() {
        await postData(updateUrl, token, {
            lang,
            title,
            slug,
            summary,
            thumbnail,
            content,
        })
            .then((data) => {
                if (data.status === 200) {
                    $successMessage = "Post Updated.";
                    $latestPosts = data.updatedPosts;
                    push("/");
                } else {
                    $failureMessage = data.message;
                }
            })
            .catch((err) => {
                console.log("Error is: ", err);
            });
    }
</script>

<style>
    main {
        padding: 20px;
    }
    article {
        width: 100%;
        max-width: 800px;
        padding: 8px;
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
        display: block;
        width: 100%;
        /* max-width: 750px; */
        height: 450px;
        margin: 16px auto;
        object-fit: cover;
        border-radius: 0;
        /* padding: 20px; */
    }

    /* form styles */

    form {
        width: 100%;
        max-width: 650px;
        margin: auto;
        text-align: left;
        padding: 20px;
    }
    h2 {
        text-align: center;
    }
    label,
    input {
        all: unset;
        display: block;
        width: 80%;
        margin: 4px auto;
        transition: 300ms all ease-in-out;
    }
    input,
    select,
    textarea {
        border: 1px solid lightgray;
        padding: 6px 2px;
    }
    textarea {
        display: block;
        width: 80%;
        margin: 4px auto;
        transition: 300ms all ease-in-out;
    }
    select {
        display: block;
        background: lightgray;
        cursor: pointer;
        width: 80%;
        margin: auto;
    }
    input:focus,
    textarea:focus {
        width: 100%;
        border: 1px solid rgb(107, 107, 238);
    }
    input[type="submit"] {
        text-align: center;
        cursor: pointer;
        background: rgb(15, 49, 161);
        color: white;
    }
    input[type="submit"]:hover {
        background: rgb(40, 80, 212);
        color: yellow;
        width: 100%;
    }
    @media (max-width: 600px) {
        .post img {
            height: auto;
        }
    }
</style>

<svelte:head>
    {#if $postDetail}
        <title>{$postDetail.title}</title>
    {/if}
</svelte:head>
<main>
    {#if $postDetail}
        <article class="post">
            <p class="posted-date">
                <em>{new Date($postDetail.posted_date).toDateString()}</em>
            </p>
            <p>
                <a href="#/language/{$postDetail.lang}">{$postDetail.lang}</a>
            </p>
            <h3>{$postDetail.title}</h3>
            <img src={$postDetail.thumbnail} alt="" />
            <p><em>Summary:</em> {$postDetail.summary}</p>
            <div class="content">
                <p>
                    {@html $postDetail.content}
                </p>
            </div>
            <p class="updated-date">
                <em>Updated on:</em>
                {new Date($postDetail.updated_date).toLocaleString()}
            </p>
            {#if $user && parseInt(JSON.parse($user).status) === 1}
                <details>
                    <summary>Delete Post?</summary>

                    <button on:click={() => deletePost($postDetail.id)}>Delete
                        Post?</button>
                </details>
                <details>
                    <summary>Update?</summary>
                    <form on:submit|preventDefault={updatePost}>
                        <h2>Update Post</h2>
                        <label for="lang">Choose A Language</label>
                        <select id="lang" bind:value={lang} required>
                            <option>Choose</option>
                            {#each langs as language}
                                <option value={language}>{language}</option>
                            {/each}
                        </select>
                        <label for="title">Title</label>
                        <input type="text" id="title" bind:value={title} />
                        <label for="summary">Summary</label>
                        <input type="text" id="summary" bind:value={summary} />
                        <label for="thumbnail">Thumbnail</label>
                        <input
                            type="text"
                            id="thumbnail"
                            bind:value={thumbnail} />
                        <label for="content">Content</label>
                        <textarea
                            id="content"
                            cols="30"
                            rows="10"
                            bind:value={content} />
                        <input type="submit" value="Add Post" />
                    </form>
                    <p>{slug}</p>
                </details>
            {/if}
        </article>
    {:else}
        <p>No post detail.</p>
    {/if}
</main>
