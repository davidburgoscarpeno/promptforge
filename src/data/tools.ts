export interface ToolFaq { q: string; a: string }
export interface ToolExample { title: string; input?: string; output?: string; note?: string }
export interface Tool {
  slug: string; name: string; category: string; description: string;
  seoTitle: string; metaDescription: string; intro: string;
  howTo: string[]; examples: ToolExample[]; faqs: ToolFaq[];
  related: string[]; component: string; mode?: string; implemented: boolean; popular?: boolean;
}
export const tools: Tool[] = [
  {
    slug: 'blog-title-generator',
    name: 'Blog Title Generator',
    category: 'Generators',
    description: 'Generate dozens of blog title ideas from a topic, using proven headline patterns.',
    seoTitle: 'Blog Title Generator - 30+ Title Ideas from a Topic | PromptForge',
    metaDescription: 'Free blog title generator. Enter a topic and get dozens of title ideas based on proven headline formulas: lists, how-tos, questions and more.',
    intro: 'Enter your topic and get a batch of title ideas built from proven headline patterns: listicles, how-tos, questions, comparisons and mistakes-to-avoid.',
    howTo: ['Type your topic (e.g. "indoor plants").', 'Pick the tone: neutral, punchy or curious.', 'Copy any title you like.'],
    examples: [{ title: 'Topic: indoor plants', output: '11 Indoor Plants That Are Hard to Kill / How to Keep Indoor Plants Alive: A Practical Guide / Indoor Plants: What Nobody Tells Beginners' }],
    faqs: [
      { q: 'Does this use AI?', a: 'This version is pattern-based: it applies known headline formulas to your topic. An AI-powered mode is planned and the interface is already designed for it.' },
      { q: 'Are the titles unique?', a: 'They are generated fresh from your topic, but headline patterns are common knowledge - always adapt the winner to your voice.' }
    ],
    related: [],
    component: 'TitleGenTool',
    implemented: true,
    popular: true
  },
  {
    slug: 'prompt-generator',
    name: 'Prompt Generator',
    category: 'Builders',
    description: 'Build structured AI prompts: role, task, context, format, tone, constraints.',
    seoTitle: 'AI Prompt Generator - Build Better Prompts | PromptForge',
    metaDescription: 'Free AI prompt generator. Build structured prompts with role, task, context, format, tone and constraints. Works with ChatGPT, Claude, Gemini.',
    intro: 'Good prompts have structure. Fill in the six building blocks and get a prompt that gets better answers from ChatGPT, Claude or Gemini.',
    howTo: ['Fill in role and task (the two that matter most).', 'Add context, format, tone and constraints.', 'Copy the assembled prompt into your AI tool.'],
    examples: [{ title: 'Marketing prompt', output: 'Act as a senior copywriter. Your task: write a landing headline. Format: 5 options under 10 words...' }],
    faqs: [{ q: 'Which block matters most?', a: 'Task and context. A clear task plus the actual material (text, data, audience) beats any trick.' }],
    related: ['prompt-library', 'prompt-roast', 'blog-title-generator'],
    component: 'PromptBuilderTool', implemented: true, popular: true
  },
  {
    slug: 'prompt-library',
    name: 'Prompt Library',
    category: 'Library',
    description: 'Ready-to-use prompts for writing, coding, marketing, learning and productivity.',
    seoTitle: 'Prompt Library - 12+ Ready AI Prompts | PromptForge',
    metaDescription: 'Free prompt library. Ready-to-use prompts for writing, coding, marketing, learning and productivity. Copy and fill in the brackets.',
    intro: 'Twelve field-tested prompts across five categories. Copy one, replace the [BRACKETS] with your material, and paste it into your AI tool.',
    howTo: ['Pick a category or search.', 'Copy the prompt.', 'Replace the [BRACKETED] placeholders with your content.'],
    examples: [{ title: 'Code review prompt', output: 'Act as a senior engineer. Review this code for bugs, edge cases, readability and performance...' }],
    faqs: [{ q: 'Do these work with any AI?', a: 'Yes - ChatGPT, Claude, Gemini and others all follow this structure.' }],
    related: ['prompt-generator', 'prompt-roast'],
    component: 'LibraryTool', implemented: true, popular: true
  },
  {
    slug: 'prompt-roast',
    name: 'Prompt Roast',
    category: 'Review',
    description: 'Instant rule-based review of your prompt with a score and fixes.',
    seoTitle: 'Prompt Roast - Review and Improve Your Prompts | PromptForge',
    metaDescription: 'Free prompt review tool. Paste your prompt for an instant score and concrete fixes: role, format, context, length and vague wording.',
    intro: 'Why is the AI giving generic answers? Usually the prompt. Paste yours for an instant review: score, what works, and what to fix.',
    howTo: ['Paste your prompt.', 'Read the score and the issue list.', 'Fix the top issue and resubmit.'],
    examples: [{ title: 'write something about marketing', output: 'Score 2/10: no role, no format, no context, vague wording.' }],
    faqs: [{ q: 'Is this an AI review?', a: 'No - it is a rule-based checklist (role, format, context, length, vague words), so it runs instantly and privately in your browser.' }],
    related: ['prompt-generator', 'prompt-library'],
    component: 'RoastTool', implemented: true
  },
  {
    slug: 'startup-name-generator',
    name: 'Startup Name Generator',
    category: 'Generators',
    description: 'Brandable, compound and AI-flavored name ideas from your keyword.',
    seoTitle: 'Startup Name Generator - Brandable Name Ideas | PromptForge',
    metaDescription: 'Free startup name generator. Get brandable, compound and AI-flavored name ideas from any keyword. Copy and check domains.',
    intro: 'Turn one keyword into name ideas in three styles: brandable (-ly, -ify), compound (Forge, Flow, Mint) and AI-flavored.',
    howTo: ['Enter your keyword.', 'Pick a style.', 'Copy the names you like and check domain availability.'],
    examples: [{ title: 'Keyword: prompt', output: 'Promptly, PromptForge, PromptPilot...' }],
    faqs: [{ q: 'Are these available as domains?', a: 'The generator does not check availability - always verify the domain and trademark before committing.' }],
    related: ['blog-title-generator', 'prompt-generator'],
    component: 'NameGenTool', implemented: true
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
