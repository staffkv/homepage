import { phrases } from "./phrases";

export function getRandomPhrase() {
  const index = Math.floor(Math.random() * phrases.length);
  return phrases[index];
}