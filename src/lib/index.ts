import { writable } from 'svelte/store';
import jwt from 'jsonwebtoken';

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

export function checkAuth(headers: Headers): { email: string } | null {
  try {
    // Extract the Authorization header
    const authHeader = headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid Authorization header');
      return null;
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error('Token is missing in Authorization header');
      return null;
    }

    // Verify the token using your secret
    const decoded = jwt.verify(token, import.meta.env.JWT_SECRET);
    return decoded as { email: string };
  } catch (error) {
    console.error('Authentication failed:', error.message);
    return null;
  }
}
