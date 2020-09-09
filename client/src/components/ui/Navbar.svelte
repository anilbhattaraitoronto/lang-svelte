<script>
  import active from "svelte-spa-router/active";
</script>

<style>
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
  }
  :global(a.active) {
    color: rgb(13, 48, 95);
    text-decoration: underline;
  }
  h1 {
    transition: 300ms all ease-in-out;
  }
  @media (max-width: 600px) {
    header {
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<header>
  <h1>
    <a href="#/">🏠Fre-Ma-S</a>
  </h1>
  <nav>
    <a
      href="#/french"
      class="main-link"
      use:active={{ path: '/french', className: 'active' }}>
      🇫🇷 French
    </a>
    <a
      href="#/mandarin"
      class="main-link"
      use:active={{ path: '/mandarin', className: 'active' }}>
      🇨🇳 Mandarin
    </a>
    <a
      href="#/spanish"
      class="main-link"
      use:active={{ path: '/spanish', className: 'active' }}>
      🇪🇸 Spanish
    </a>
  </nav>
</header>
