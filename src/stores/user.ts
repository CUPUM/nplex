import { writable } from 'svelte/store';

// Store here everything related to the user (auth, permissions, etc)

// Pour persistent stores, voir:
// https://stackoverflow.com/questions/56488202/how-to-persist-svelte-store/56489832#56489832
//
// <script>
//   import { writable } from "svelte/store";
//   const store = writable(localStorage.getItem("store") || "");

//   store.subscribe(val => localStorage.setItem("store", val));
// </script>

// <input bind:value={$store} />

export const user = writable(null);
