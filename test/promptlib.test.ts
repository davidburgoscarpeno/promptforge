import { describe, it, expect } from 'vitest';
import { buildPrompt, roastPrompt, nameIdeas, PROMPT_LIBRARY, libraryCategories } from '../src/tools/promptlib';
describe('prompt builder', () => {
  it('assembles sections', () => {
    const out = buildPrompt({ role: 'a chef', task: 'write a recipe', context: '', format: 'a list', tone: '', constraints: ['no nuts', 'vegan'] });
    expect(out).toContain('Act as a chef.');
    expect(out).toContain('Your task: write a recipe.');
    expect(out).toContain('- no nuts');
    expect(out).not.toContain('Tone:');
  });
  it('empty spec is empty', () => expect(buildPrompt({ role: '', task: '', context: '', format: '', tone: '', constraints: [] })).toBe(''));
});
describe('roast', () => {
  it('vague one-liner scores low', () => {
    const r = roastPrompt('write something about marketing');
    expect(r.score).toBeLessThan(5);
    expect(r.issues.length).toBeGreaterThan(2);
  });
  it('structured prompt scores high', () => {
    const r = roastPrompt('Act as a senior copywriter. Write 5 headline options as a list for our hiking boots launch. Audience: beginner hikers, US.');
    expect(r.score).toBeGreaterThanOrEqual(8);
  });
});
describe('names', () => {
  it('brandable style', () => expect(nameIdeas('prompt', 'brandable')).toContain('Promptly'));
  it('compound style', () => expect(nameIdeas('prompt', 'compound')).toContain('PromptForge'));
  it('empty keyword gives nothing', () => expect(nameIdeas('  ', 'brandable')).toEqual([]));
});
describe('library', () => {
  it('has prompts in 5 categories', () => expect(libraryCategories().length).toBe(5));
  it('every prompt has placeholders', () => expect(PROMPT_LIBRARY.every((p) => p.prompt.includes('['))).toBe(true));
});
