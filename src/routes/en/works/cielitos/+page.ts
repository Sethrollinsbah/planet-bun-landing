import planets from '$lib/planets.json'
import { error } from '@sveltejs/kit';
export const prerender = true;

export async function load({ params }) {

  const planetData = planets.find((p) => p.name.toLowerCase().replaceAll(' ', '-') === 'cielitos');

  if (!planetData) {
    throw error(404, `Planet "${planet}" not found`);
  }

  return {
    planet: planetData || {}
  };
}

