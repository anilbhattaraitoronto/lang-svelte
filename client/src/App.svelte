<script context="module">
  export async function postData(url = " ", token = "", data = {}) {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    return response.json();
  }
</script>

<script>
  import { onMount } from "svelte";
  import { user, successMessage } from "./stores/authstore.js";
  import { latestPosts } from "./stores/poststore.js";
  import Router, { push, wrap } from "svelte-spa-router";
  import Navbar from "./components/ui/Navbar.svelte";
  import Footer from "./components/ui/Footer.svelte";
  import Landing from "./components/post/Landing.svelte";
  import Signup from "./components/auth/Signup.svelte";
  import Login from "./components/auth/Login.svelte";
  import ChangePassword from "./components/auth/ChangePassword.svelte";
  import RequestPasswordReset from "./components/auth/RequestPasswordReset.svelte";
  import Lang from "./components/post/Lang.svelte";
  import AddPost from "./components/post/AddPost.svelte";
  import PostDetail from "./components/post/PostDetail.svelte";
  import About from "./components/post/About.svelte";
  import French from "./components/post/French.svelte";
  import Mandarin from "./components/post/Mandarin.svelte";
  import Spanish from "./components/post/Spanish.svelte";

  const routes = {
    "/": Landing,
    "/french": French,
    "/mandarin": Mandarin,
    "/spanish": Spanish,
    "/about": About,
    "/signup": wrap(Signup, { reason: "authenticated" }, () => !$user),
    "/login": wrap(Login, { reason: "authenticated" }, () => !$user),
    "/changepassword": wrap(
      ChangePassword,
      { reason: "unauthenticated" },
      () => $user
    ),
    "/requestpasswordreset": wrap(
      RequestPasswordReset,
      { reason: "authenticated" },
      () => !$user
    ),
    "/addpost": wrap(
      AddPost,
      { reason: "notAdmin" },
      () => $user && parseInt(JSON.parse($user).status) === 1
    ),
    "/:id/:slug": PostDetail,
  };
  const baseUrl = "http://localhost:4005";
  const apiUrl = "/api/posts/latest";
  const fetchUrl = `${baseUrl}${apiUrl}`;
  onMount(async () => {
    await fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        if ($latestPosts) {
          $latestPosts = [data, ...$latestPosts];
          push("/");
        } else {
          $latestPosts = data;
          push("/");
        }
      });
  });

  function conditionsFailed(event) {
    const { reason } = event.detail.userData;
    switch (reason) {
      case "unauthenticated":
        return push("/");
      case "authenticated":
        return push("/");
      case "notAdmin":
        return push("/");
    }
  }
</script>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
  .success {
    text-align: right;
    color: darkgreen;
  }
</style>

{#if $successMessage}
  <p class="success">{$successMessage}</p>
{/if}
<main>
  <Navbar />

  <Router {routes} on:conditionsFailed={conditionsFailed} />

</main>
<Footer />
