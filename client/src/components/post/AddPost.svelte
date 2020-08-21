<script>
  import { postData } from "../../App.svelte";
  import { latestPosts } from "../../stores/poststore.js";
  import { push } from "svelte-spa-router";
  import {
    user,
    successMessage,
    failureMessage,
  } from "../../stores/authstore.js";
  let langs = ["French", "Mandarin", "Spanish"];

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
  $: slug = slugify(title);

  let addPostUrl = "http://localhost:4005/api/posts/addpost";
  let token = JSON.parse($user).accessToken;

  async function addPost() {
    await postData(addPostUrl, token, {
      lang,
      title,
      slug,
      summary,
      thumbnail,
      content,
    })
      .then((data) => {
        if (data.status === 200) {
          if ($latestPosts) {
            $latestPosts = [data.newPost, ...$latestPosts];
            $successMessage = "New post is added.";
            push("/");
          } else {
            $latestPosts = data.newPost;
          }
        } else {
          $failureMessage = data.message;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
</script>

<style>
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
  input,
  textarea {
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
</style>

{#if $user && parseInt(JSON.parse($user).status) === 1}
  <main>
    <form on:submit|preventDefault={addPost}>
      <h2>Add Post</h2>
      <label for="lang">Choose A Language</label>
      <select id="lang" bind:value={lang} required>
        <option>Choose</option>
        {#each langs as language}
          <option value={language}>{language}</option>
        {/each}
      </select>
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
      <!-- <label for="slug">Slug</label>
    <input type="text" id="slug" bind:value={slug} /> -->
      <label for="summary">Summary</label>
      <input type="text" id="summary" bind:value={summary} />
      <label for="thumbnail">Thumbnail</label>
      <input type="text" id="thumbnail" bind:value={thumbnail} />
      <label for="content">Content</label>
      <textarea id="content" cols="30" rows="10" bind:value={content} />
      <input type="submit" value="Add Post" />
    </form>
  </main>
{/if}
