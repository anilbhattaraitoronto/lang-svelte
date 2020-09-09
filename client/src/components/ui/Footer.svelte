<script>
  import { user, successMessage } from "../../stores/authstore.js";
  import { push } from "svelte-spa-router";
</script>

<style>
  footer {
    text-align: center;
    color: rgba(0, 0, 0, 0.507);
    font-size: 0.9em;
    padding: 8px;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .main-link {
    color: darkblue;
    padding: 8px 16px;
    cursor: pointer;
  }
  .main-link:hover {
    text-decoration: underline;
    color: blue;
  }
  button {
    all: unset;
  }
</style>

<footer>
  <nav>
    <a href="#/" class="main-link">Home</a>
    <!-- <a href="#/about" class="main-link">About</a> -->
    {#if !$user}
      <a href="#/login" class="main-link">Login</a>
      <a href="#/signup" class="main-link">Register</a>
    {:else}
      <a href="#/changepassword" class="main-link">Change Password</a>
      <button
        on:click={() => {
          localStorage.removeItem('user');
          $user = null;
          $successMessage = 'You have logged out.';
          push('/');
        }}
        class="main-link">
        Logout
      </button>
    {/if}
    {#if $user && parseInt(JSON.parse($user).status) === 1}
      <a href="#/addpost" class="main-link">Add Post</a>
    {/if}
  </nav>
  <p>&copy; Anil Bhattarai 2020 - Present. All Rights Reserved.</p>
</footer>
