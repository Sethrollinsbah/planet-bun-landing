import planets from '$lib/planets.json'
export const prerender = true;

export async function load() {

  return {
    planets,
  };
}
