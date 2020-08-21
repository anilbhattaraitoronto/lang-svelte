<script>
  import { push } from "svelte-spa-router";
  import { postData } from "../../App.svelte";
  import AuthTransition from "./AuthTransition.svelte";
  import {
    user,
    successMessage,
    failureMessage,
  } from "../../stores/authstore.js";

  let password = "";
  let confirmPassword = "";
  let changePasswordUrl =
    "https://french.merohouse.com/api/auth/changepassword";
  let token = JSON.parse($user).accessToken;
  async function changePassword() {
    postData(changePasswordUrl, token, { password, confirmPassword })
      .then((data) => {
        if (data.status === 200) {
          $successMessage = data.message;
          localStorage.removeItem("user");
          $user = null;
          push("/login");
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
    <form on:submit|preventDefault={changePassword}>
      <h2>Change Password</h2>
      <label for="password">New Password</label>
      <input type="password" id="password" bind:value={password} required />
      <label for="confirmPassword">Re-type New Password</label>
      <input
        type="password"
        id="confirmPassword"
        bind:value={confirmPassword}
        required />
      <input type="submit" value="Change Password" />
    </form>
  </main>
</AuthTransition>
