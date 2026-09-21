export interface PromptSpec { role: string; task: string; context: string; format: string; tone: string; constraints: string[] }
export function buildPrompt(s: PromptSpec): string {
  const parts: string[] = [];
  if (s.role.trim()) parts.push(`Act as ${s.role.trim()}.`);
  if (s.task.trim()) parts.push(`Your task: ${s.task.trim()}.`);
  if (s.context.trim()) parts.push(`Context: ${s.context.trim()}.`);
  if (s.format.trim()) parts.push(`Format the output as: ${s.format.trim()}.`);
  if (s.tone.trim()) parts.push(`Tone: ${s.tone.trim()}.`);
  const cons = s.constraints.filter((c) => c.trim());
  if (cons.length) parts.push(`Constraints:\n${cons.map((c) => `- ${c.trim()}`).join('\n')}`);
  return parts.join('\n\n');
}
export const PROMPT_LIBRARY: { category: string; title: string; prompt: string }[] = [
  { category: 'Writing', title: 'Blog outline', prompt: 'Act as a content strategist. Create a detailed blog post outline on [TOPIC] with an H1, 4-6 H2 sections with talking points, and a conclusion with a call to action. Target audience: [AUDIENCE].' },
  { category: 'Writing', title: 'Rewrite for clarity', prompt: 'Rewrite the following text for clarity and concision. Keep the meaning, remove filler, and use simple words. Text: [TEXT]' },
  { category: 'Writing', title: 'Cold email', prompt: 'Act as a B2B copywriter. Write a 5-sentence cold email to [ROLE] at [COMPANY TYPE] about [PRODUCT]. One clear benefit, one question call to action, no buzzwords.' },
  { category: 'Coding', title: 'Code review', prompt: 'Act as a senior engineer. Review this code for bugs, edge cases, readability and performance. List issues by severity with suggested fixes. Code: [CODE]' },
  { category: 'Coding', title: 'Explain like I am new', prompt: 'Explain what this code does step by step, assuming I am new to [LANGUAGE]. Then suggest one improvement. Code: [CODE]' },
  { category: 'Coding', title: 'Test generator', prompt: 'Act as a QA engineer. Write unit tests for this function covering happy path, edge cases and invalid input, using [FRAMEWORK]. Function: [CODE]' },
  { category: 'Marketing', title: 'Value propositions', prompt: 'Generate 5 value propositions for [PRODUCT] aimed at [AUDIENCE]. Each under 15 words, focused on outcomes not features.' },
  { category: 'Marketing', title: 'Social posts', prompt: 'Act as a social media manager. Turn this blog post into 3 posts: one for LinkedIn (professional), one for X (punchy, under 280 chars), one for Instagram (casual with hashtags). Post: [TEXT]' },
  { category: 'Learning', title: 'Study plan', prompt: 'Act as a learning coach. Build a 4-week study plan to learn [SUBJECT] from scratch, 5 hours per week. Week by week with resources types and checkpoints.' },
  { category: 'Learning', title: 'Feynman check', prompt: 'I will explain [CONCEPT] in my own words. Point out what I got wrong, what I missed, and one analogy that would make it click. My explanation: [TEXT]' },
  { category: 'Productivity', title: 'Meeting agenda', prompt: 'Create a 30-minute meeting agenda for [GOAL] with time boxes, one decision per item, and space for action items with owners.' },
  { category: 'Productivity', title: 'Email triage reply', prompt: 'Act as my assistant. Draft a polite reply to this email that [GOAL: declines / accepts / asks for more info]. Keep it under 6 sentences. Email: [TEXT]' },
];
export function libraryCategories(): string[] { return [...new Set(PROMPT_LIBRARY.map((p) => p.category))]; }
export const ROAST_RULES: { test: RegExp; issue: string; fix: string }[] = [
  { test: /\b(please|can you|could you)\b/i, issue: 'Hedged request ("please", "can you")', fix: 'Drop politeness filler; state the task directly.' },
  { test: /\b(something|stuff|things|etc)\b/i, issue: 'Vague words ("something", "things")', fix: 'Name exactly what you want.' },
  { test: /\b(act as|you are)\b/i, issue: '', fix: '' }, // role present = good, handled below
  { test: /.{500,}/s, issue: 'Very long prompt', fix: 'Split context from instructions; long walls of text dilute the task.' },
];
export function roastPrompt(p: string): { score: number; issues: string[]; goods: string[] } {
  const issues: string[] = [], goods: string[] = [];
  if (/\b(act as|you are)\b/i.test(p)) goods.push('Defines a role or persona'); else issues.push('No role: add "Act as a ..." to set expertise.');
  if (/\bformat|list|table|json|bullet|steps\b/i.test(p)) goods.push('Specifies an output format'); else issues.push('No output format: say "as a table", "in 5 bullets", etc.');
  if (/\[|\bexample|for example\b/i.test(p)) goods.push('Includes context or examples');
  else issues.push('No context or example: paste the text, code or audience the task is about.');
  if (p.trim().split(/\s+/).length < 15) issues.push('Very short: one-line prompts get generic answers. Add task, context and format.');
  for (const r of ROAST_RULES) if (r.issue && r.test.test(p)) { issues.push(`${r.issue} ${r.fix}`); break; }
  const score = Math.max(1, 10 - issues.length * 2);
  return { score, issues, goods };
}
export function nameIdeas(keyword: string, style: string): string[] {
  const k = keyword.trim().toLowerCase().replace(/\s+/g, '');
  if (!k) return [];
  const Cap = k.charAt(0).toUpperCase() + k.slice(1);
  const out: string[] = [];
  if (style === 'brandable') out.push(Cap + 'ly', Cap + 'ify', Cap + 'io', 'Get' + Cap, Cap + 'hub', Cap + 'lab', Cap + 'HQ', 'Try' + Cap);
  else if (style === 'compound') out.push(Cap + 'Forge', Cap + 'Flow', Cap + 'Mint', Cap + 'Kit', Cap + 'Press', Cap + 'Base', Cap + 'Stack', Cap + 'Works');
  else out.push(Cap + 'ai', Cap + 'GPT', 'Ask' + Cap, Cap + 'Bot', Cap + 'Mind', 'Deep' + Cap, Cap + 'Genius', Cap + 'Pilot');
  return out;
}
