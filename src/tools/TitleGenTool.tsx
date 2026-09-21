import { useState } from 'react';

const PATTERNS: ((t: string, n: number) => string)[] = [
  (t, n) => `${n} ${cap(t)} Tips That Actually Work`,
  (t) => `How to ${t}: A Practical Guide`,
  (t) => `${cap(t)}: What Nobody Tells Beginners`,
  (t, n) => `${n} Common ${cap(t)} Mistakes (and How to Fix Them)`,
  (t) => `The Complete Guide to ${cap(t)}`,
  (t) => `Why ${cap(t)} Matters More Than You Think`,
  (t, n) => `${n} ${cap(t)} Ideas for ${new Date().getFullYear()}`,
  (t) => `${cap(t)} vs. The Alternatives: An Honest Look`,
  (t) => `I Tried ${cap(t)} for 30 Days. Here Is What Happened`,
  (t) => `${cap(t)} for Beginners: Start Here`,
  (t, n) => `${n} Signs You Are Doing ${cap(t)} Wrong`,
  (t) => `The Truth About ${cap(t)}`,
];
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function TitleGenTool() {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  function generate() {
    const t = topic.trim();
    if (!t) return;
    const nums = [7, 9, 10, 11, 13, 15, 17, 21, 25, 5, 8, 12];
    setTitles(PATTERNS.map((p, i) => p(t, nums[i % nums.length])));
  }
  return (
    <div className="panel">
      <label htmlFor="topic">Your topic</label>
      <div className="btn-row">
        <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="indoor plants" onKeyDown={(e) => e.key === 'Enter' && generate()} />
        <button onClick={generate}>Generate titles</button>
      </div>
      {titles.map((title) => (
        <div className="example" key={title} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
          <span>{title}</span>
          <button className="secondary" onClick={() => navigator.clipboard.writeText(title)}>Copy</button>
        </div>
      ))}
    </div>
  );
}
