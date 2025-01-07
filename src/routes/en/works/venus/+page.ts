import planets from '$lib/planets.json'
import { error } from '@sveltejs/kit';
export const prerender = true;

export async function load({ params, url }) {
  const planetData = planets.find((p) => p.name.toLowerCase().replaceAll(' ', '-') === 'venus');

  if (!planetData) {
    throw error(404, `Planet "${planet}" not found`);
  }

  return {
    planet: planetData || {}
  };
}

