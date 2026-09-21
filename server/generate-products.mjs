// Regenerates products.json from PokéAPI for 50 classic Gen 1 Pokémon.
// Run from the repo root: node server/generate-products.mjs
import { writeFile } from 'node:fs/promises';

const NAMES = [
  'bulbasaur','ivysaur','venusaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise',
  'pikachu','raichu','eevee','vaporeon','jolteon','flareon','snorlax','gastly','haunter','gengar',
  'mewtwo','mew','dratini','dragonair','dragonite','magikarp','gyarados','lapras','articuno','zapdos','moltres',
  'jigglypuff','meowth','psyduck','machop','machamp','abra','alakazam','onix','scyther','ditto',
  'growlithe','arcanine','vulpix','ninetales','clefairy','slowpoke','cubone','pidgeot','butterfree','golem',
];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
// Deterministic pseudo-random in [0,1) from the dex number so re-running the script is stable.
const rand = (n, salt) => { const x = Math.sin(n * 9301 + salt * 49297) * 233280; return x - Math.floor(x); };

const get = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); };

const products = [];
for (const name of NAMES) {
  const p = await get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const s = await get(p.species.url);

  // Prefer modern, properly-cased Pokédex text; fall back to the oldest entries.
  const PREFERRED = ['lets-go-pikachu', 'lets-go-eevee', 'x', 'y', 'firered', 'red'];
  const english = s.flavor_text_entries.filter((e) => e.language.name === 'en');
  const flavor = PREFERRED.map((v) => english.find((e) => e.version.name === v)).find(Boolean) ?? english[0];
  const description = flavor.flavor_text
    .replace(/\u00ad\s*/g, '')          // soft hyphen line breaks
    .replace(/[\n\f\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/POKéMON/g, 'Pokémon')
    .trim();
  const genus = s.genera.find((g) => g.language.name === 'en')?.genus ?? 'Pokémon';
  const types = p.types.sort((a, b) => a.slot - b.slot).map((t) => cap(t.type.name));
  const abilities = p.abilities.filter((a) => !a.is_hidden).map((a) => a.ability.name.split('-').map(cap).join(' '));
  const bst = p.stats.reduce((sum, st) => sum + st.base_stat, 0);
  const rare = s.is_legendary || s.is_mythical;

  products.push({
    id: String(p.id).padStart(3, '0'),
    number: p.id,
    name: cap(p.name),
    species: genus,
    category: types[0],
    types,
    price: Math.round(bst * (rare ? 4 : 1.5)) - 0.01,
    rating: Math.round((3.8 + rand(p.id, 1) * 1.2) * 10) / 10,
    reviewCount: Math.round(50 + rand(p.id, 2) * 4000),
    description,
    imageUrl: p.sprites.other['official-artwork'].front_default,
    heightM: p.height / 10,
    weightKg: p.weight / 10,
    tags: [...abilities, ...(rare ? ['Legendary'] : [])],
    inStock: !s.is_mythical && rand(p.id, 3) > 0.12,
  });
  process.stdout.write('.');
}
products.sort((a, b) => a.number - b.number);
await writeFile(new URL('./products.json', import.meta.url), JSON.stringify(products, null, 2) + '\n');
console.log(`\nwrote ${products.length} pokemon`);
