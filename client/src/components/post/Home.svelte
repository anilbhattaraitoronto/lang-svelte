<script>
    import HomeTransition from "./HomeTransition.svelte";
</script>

<style>
    main {
        position: relative;
        padding: 20px;
        width: 100%;
    }
    img {
        display: block;
        position: relative;
        width: 100%;
        margin: auto;
        max-height: 100vh;
        object-fit: cover;
        border-radius: 0;
    }
    .welcome {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 0;
        background: rgba(49, 73, 55, 0.799);
        width: 80%;
        margin: auto;
        text-align: center;
        color: white;
    }
    h2 {
        text-transform: uppercase;
        letter-spacing: 3px;
        padding: 8px 0;
    }
    p {
        color: yellow;
        letter-spacing: 3px;
    }
</style>

<svelte:head>
    <title>Welcome</title>
</svelte:head>
<HomeTransition>
    <main>
        <img
            src="https://images.unsplash.com/photo-1515859033836-a0a913c0f94a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt="" />
        <div class="welcome">
            <h2>Welcome</h2>
            <p>A new language, a whole new world!</p>
        </div>
    </main>
</HomeTransition>
