import { writable } from 'svelte/store';

// place files you want to import through the `$lib` alias in this folder.
export let selectedWork = writable();
export let browserLoaded = writable(false);
export let lang = 'en';
export let calDialog = writable(false);
