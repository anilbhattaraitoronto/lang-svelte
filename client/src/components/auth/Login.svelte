<script>
  import {
    user,
    successMessage,
    failureMessage
  } from "../../stores/authstore.js";
  import { push } from "svelte-spa-router";
  import { postData } from "../../App.svelte";
  import AuthTransition from "./AuthTransition.svelte";

  let email = "";
  let password = "";
  let loginUrl = "https://french.merohouse.com/api/auth/login";
  async function login() {
    await postData(loginUrl, "token", { email, password })
      .then(data => {
        if (data.accessToken) {
          $successMessage = "You are logged in.";
          localStorage.setItem("user", JSON.stringify(data));
          $user = localStorage.getItem("user");
          push("/");
        } else {
          $failureMessage = data.message;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
</script>

<style>
  form {
    width: 100%;
    max-width: 650px;
    margin: 40px auto;
    text-align: left;
    padding: 20px;
    background: rgb(241, 239, 239);
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
  input {
    border: 1px solid lightgray;
    padding: 6px 2px;
  }
  input:focus {
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

<svelte:head>
  <title>Login</title>
</svelte:head>
{#if $failureMessage}
  <p>{$failureMessage}</p>
{/if}
<AuthTransition>

  <main>
    <form on:submit|preventDefault={login}>

      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} required />
      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password} required />
      <input type="submit" value="Login" />

    </form>
    <p>
      No account, yet?
      <a href="#/signup">Register</a>
    </p>
    <p>
      Forgot password?
      <a href="#/requestpasswordreset">Reset Password.</a>
    </p>
  </main>
</AuthTransition>
