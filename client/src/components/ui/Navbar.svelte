<script>
  import active from "svelte-spa-router/active";
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :global(a.active) {
    color: rgb(13, 48, 95);
    text-decoration: underline;
  }
</style>

<header>
  <h1>
    <a href="#/">🏠F-M-S</a>
  </h1>
  <nav>
    <a
      href="#/french"
      class="main-link"
      use:active={{ path: '/french', className: 'active' }}>
      🇫🇷French
    </a>
    <a
      href="#/mandarin"
      class="main-link"
      use:active={{ path: '/mandarin', className: 'active' }}>
      🇨🇳Mandarin
    </a>
    <a
      href="#/spanish"
      class="main-link"
      use:active={{ path: '/spanish', className: 'active' }}>
      🇪🇸Spanish
    </a>
  </nav>
</header>
