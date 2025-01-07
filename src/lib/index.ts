import { writable } from 'svelte/store';

// place files you want to import through the `$lib` alias in this folder.
export let selectedWork = writable({
  image: '/cilitos.png',
  scopes: [
    {
      title: 'First',
      problem: 'Why',
      desc: 'Explain what happened',
      img: ['']
    }
  ],
  projectDescription: 'Lorem',
  companyName: '',
  projectTitle: 'Revolutionizing the health space',
  link: null,
  color: [100, 0, 0, 0.9]
});
export let browserLoaded = writable(false);
export let lang = 'en';
export let calDialog = writable(false);
