<script>
  import HomeTransition from "./HomeTransition.svelte";
</script>

<style>
  main {
    position: relative;
  }
  img {
    display: block;
    position: relative;
    width: 100%;
    margin: auto;
    max-height: 100vh;
    object-fit: cover;
  }
  .welcome {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 0;
    background: rgba(255, 255, 255, 0.399);
    width: 80%;
    margin: auto;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: darkblue;
  }
</style>

<HomeTransition>
  <main>
    <img
      src="https://images.unsplash.com/photo-1531926249475-325d7895646b?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
      alt="" />
    <div class="welcome">
      <h2>Welcome</h2>
      <p>A new language, a whole new world!</p>
    </div>

  </main>
</HomeTransition>
