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
    import {
        latestPosts,
        langPosts,
        postTitles,
        postDetail,
    } from "./stores/poststore.js";
    import Router, { push, wrap } from "svelte-spa-router";
    import active from "svelte-spa-router/active";

    import Navbar from "./components/ui/Navbar.svelte";
    import Footer from "./components/ui/Footer.svelte";
    import Home from "./components/post/Home.svelte";
    import Landing from "./components/post/Landing.svelte";
    import Signup from "./components/auth/Signup.svelte";
    import Login from "./components/auth/Login.svelte";
    import ChangePassword from "./components/auth/ChangePassword.svelte";
    import RequestPasswordReset from "./components/auth/RequestPasswordReset.svelte";
    import Lang from "./components/post/Lang.svelte";
    import AddPost from "./components/post/AddPost.svelte";
    import PostDetail from "./components/post/PostDetail.svelte";

    const langs = [
        {
            name: "French",
            flag: "🇫🇷",
        },
        {
            name: "Mandarin",
            flag: "🇨🇳",
        },
        {
            name: "Spanish",
            flag: "🇪🇸 ",
        },
    ];

    const routes = {
        "/": Home,
        // "/posts": Landing,
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
        "/language/:lang": Lang,
        "/:id/:slug": PostDetail,
    };
    const baseUrl = "https://french.merohouse.com";
    const apiUrl = "/api/posts/latest";
    const fetchUrl = `${baseUrl}${apiUrl}`;
    onMount(async () => {
        await fetch(fetchUrl)
            .then((response) => response.json())
            .then((data) => {
                // if ($latestPosts) {
                //   $latestPosts = [data, ...$latestPosts];
                $latestPosts = data;
                // push("/");
                // } else {
                //   $latestPosts = data;
                //   push("/");
                // }
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

    function getLangPosts(lang) {
        $langPosts = $latestPosts.filter((post) => post.lang == lang);
        console.log($langPosts);
    }

    function getPostDetail(id, slug) {
        $postDetail = $latestPosts.find(
            (post) => post.id == id && post.slug == slug
        );
        console.log($postDetail);
    }
</script>

<style>
    main {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr;
    }
    .success {
        text-align: center;
        color: darkgreen;
    }
    header {
        box-shadow: 1px 2px 3px lightgray;
        width: 100%;
        margin: auto;
        position: sticky;
        top: 0;
        background: white;
        z-index: 20;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        margin: auto;
        padding: 8px;
    }
    :global(a.active) {
        color: rgb(13, 48, 95);
        text-decoration: underline;
    }
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        margin: auto;
        padding: 8px;
    }
    a {
        color: green;
        margin: 0 8px;
    }
    :global(a.active) {
        color: rgb(13, 48, 95);
        text-decoration: underline;
    }
    .post-titles {
        box-shadow: 1px 2px 3px gray;
        margin: 16px 0;
        cursor: pointer;
        border: 1px solid transparent;
        transition: 250ms all ease-in-out;
    }
    .post-titles:hover {
        border-color: darkblue;
    }
    .title-lang > a {
        font-style: italic;
        color: darkblue;
    }
    .title-date {
        color: rgb(172, 164, 164);
        font-size: 0.9em;
    }
    li {
        list-style-type: none;
    }
    .main-link {
        text-transform: capitalize;
    }
    h1 {
        transition: 300ms all ease-in-out;
    }
    @media (max-width: 600px) {
        header {
            flex-direction: column;
            justify-content: center;
        }
        main {
            grid-template-columns: 1fr;
        }
    }
</style>

{#if $successMessage}
    <p class="success">{$successMessage}</p>
{/if}
<header>
    <h1><a href="#/">🏠Fre-Ma-S</a></h1>
    <nav>
        {#each langs as lang}
            <a
                href="#/language/{lang.name}"
                class="main-link"
                use:active={{ path: '/language/{lang}', className: 'active' }}
                on:click={() => getLangPosts(lang.name)}>{lang.flag}
                {lang.name}</a>
        {/each}
    </nav>
</header>
<main>
    <div class="router-container">
        <Router {routes} on:conditionsFailed={conditionsFailed} />
    </div>
    <div class="post-title-container">
        <h2>Latest Posts</h2>
        {#if $postTitles.length > 0}
            {#each $postTitles as item}
                <div class="post-titles">
                    <p class="title-lang">
                        <a
                            href="#/language/{item.lang}"
                            on:click={() => getLangPosts(item.lang)}>{item.lang}</a>
                    </p>
                    <li>
                        <a
                            href="#/{item.id}/{item.slug}"
                            class="title-link"
                            on:click={() => getPostDetail(item.id, item.slug)}>{item.title}</a>
                    </li>
                    <p class="title-date">
                        {new Date(item.posted_date).toDateString()}
                    </p>
                </div>
            {/each}
        {/if}
    </div>
</main>
<Footer />
