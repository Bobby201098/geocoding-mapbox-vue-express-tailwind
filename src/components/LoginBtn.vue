<template>
     <button type="button"  @click="login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
  </template>
  
  <script setup>
  
  import { useAuth0 } from "@auth0/auth0-vue";

  const {loginWithRedirect} = useAuth0();

  async function login() {
    loginWithRedirect({
    prompt: "login",
    appState: {
      target: "/",
    },
  });
  }
  
  </script>