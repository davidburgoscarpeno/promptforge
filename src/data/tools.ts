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
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
