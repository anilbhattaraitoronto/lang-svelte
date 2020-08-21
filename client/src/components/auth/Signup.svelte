<script>
  import { push } from "svelte-spa-router";
  import {
    user,
    successMessage,
    failureMessage,
  } from "../../stores/authstore.js";
  import { postData } from "../../App.svelte";
  import AuthTransition from "./AuthTransition.svelte";

  let email = "";
  let password = "";
  let confirmPassword = "";

  let signupUrl = "http://localhost:4005/api/auth/signup";

  function signup() {
    postData(signupUrl, "Signup token", {
      email,
      password,
      confirmPassword,
    })
      .then((data) => {
        if (data.success) {
          $successMessage =
            "Please check your email and activate your account.";
          push("/");
        } else {
          $failureMessage = data.message;
          console.log(data);
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

{#if $failureMessage}
  <p>{$failureMessage}</p>
{/if}
<AuthTransition>

  <main>
    <form on:submit|preventDefault={signup}>
      <h2>Create Account</h2>
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} required />
      <label for="password">Password</label>
      <input type="password" id="password" bind:value={password} required />
      <label for="confirmPassword">Re-type Password</label>
      <input
        type="password"
        id="confirmPassword"
        bind:value={confirmPassword}
        required />
      <input type="submit" value="Create Account" />
    </form>
    <p>
      Do you already have an account?
      <a href="#/login">Login</a>
    </p>
  </main>
</AuthTransition>
