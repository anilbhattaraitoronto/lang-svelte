<script>
  import { push } from "svelte-spa-router";
  import {
    user,
    successMessage,
    failureMessage,
  } from "../../stores/authstore.js";
  import { postData } from "../../App.svelte";

  let email = "";
  let requestUrl = "http://localhost:4005/api/auth/requestpasswordresetlink";
  function requestResetForm() {
    postData(requestUrl, "request token", { email })
      .then((data) => {
        if (data.status === 200) {
          $successMessage = "Please check your email and reset your password.";
          push("/");
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

<main>
  <form on:submit|preventDefault={requestResetForm}>
    <h2>Request Password Reset</h2>
    <label for="email">Email</label>
    <input type="email" id="email" bind:value={email} required />
    <input type="submit" value="Request Password Reset Form" />
  </form>
</main>
