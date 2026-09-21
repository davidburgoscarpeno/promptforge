import { useMemo, useState } from 'react';
import { buildPrompt, PROMPT_LIBRARY, libraryCategories, roastPrompt, nameIdeas } from './promptlib';

function CopyBtn({ text }: { text: string }) {
  return <div className="btn-row"><button className="secondary" onClick={() => navigator.clipboard.writeText(text)}>Copy</button></div>;
}
export function PromptBuilderTool() {
  const [role, setRole] = useState(''); const [task, setTask] = useState(''); const [ctx, setCtx] = useState('');
  const [fmt, setFmt] = useState(''); const [tone, setTone] = useState(''); const [cons, setCons] = useState('');
  const out = useMemo(() => buildPrompt({ role, task, context: ctx, format: fmt, tone, constraints: cons.split('\n') }), [role, task, ctx, fmt, tone, cons]);
  return (
    <div className="panel">
      <label>Role (Act as...)</label><input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="a senior copywriter" />
      <label>Task</label><input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="write a landing page headline" />
      <label>Context</label><textarea rows={3} value={ctx} onChange={(e) => setCtx(e.target.value)} placeholder="product, audience, background..." />
      <label>Output format</label><input type="text" value={fmt} onChange={(e) => setFmt(e.target.value)} placeholder="5 options, each under 10 words" />
      <label>Tone</label><input type="text" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="confident, friendly" />
      <label>Constraints (one per line)</label><textarea rows={3} value={cons} onChange={(e) => setCons(e.target.value)} placeholder={'no buzzwords\nUS English'} />
      {out && <><h3>Your prompt</h3><div className="output" style={{ whiteSpace: 'pre-wrap' }}>{out}</div><CopyBtn text={out} /></>}
    </div>
  );
}
export function LibraryTool() {
  const cats = libraryCategories();
  const [cat, setCat] = useState(cats[0]);
  const [q, setQ] = useState('');
  const rows = PROMPT_LIBRARY.filter((p) => (cat === 'All' || p.category === cat) && (!q.trim() || (p.title + p.prompt).toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="panel">
      <div className="btn-row">
        {['All', ...cats].map((c) => <button key={c} className={cat === c ? '' : 'secondary'} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts..." style={{ marginTop: 8 }} />
      {rows.map((p) => (
        <div key={p.title} className="tool-card" style={{ marginTop: 12 }}>
          <h3>{p.title} <small style={{ color: 'var(--text-muted)' }}>({p.category})</small></h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{p.prompt}</p>
          <CopyBtn text={p.prompt} />
        </div>))}
    </div>
  );
}
export function RoastTool() {
  const [p, setP] = useState('');
  const r = useMemo(() => p.trim() ? roastPrompt(p) : null, [p]);
  return (
    <div className="panel">
      <label>Your prompt</label>
      <textarea rows={6} value={p} onChange={(e) => setP(e.target.value)} placeholder="Paste the prompt you want reviewed..." />
      {r && <>
        <div className="tool-grid" style={{ marginTop: 12 }}>
          <div className="tool-card"><h3>{r.score}/10</h3><p>Prompt score</p></div>
          <div className="tool-card"><h3>{r.issues.length}</h3><p>Issues found</p></div>
        </div>
        {r.goods.length > 0 && <><h3>Working well</h3><ul>{r.goods.map((g) => <li key={g}>{g}</li>)}</ul></>}
        {r.issues.length > 0 && <><h3>To improve</h3><ul>{r.issues.map((i) => <li key={i}>{i}</li>)}</ul></>}
      </>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Rule-based review: checks for role, format, context, length and vague wording. No AI calls - everything runs locally.</p>
    </div>
  );
}
export function NameGenTool() {
  const [kw, setKw] = useState(''); const [style, setStyle] = useState('brandable');
  const names = useMemo(() => nameIdeas(kw, style), [kw, style]);
  return (
    <div className="panel">
      <label>Keyword</label><input type="text" value={kw} onChange={(e) => setKw(e.target.value)} placeholder="prompt" />
      <div className="btn-row">
        {[['brandable', 'Brandable'], ['compound', 'Compound'], ['ai', 'AI-flavored']].map(([v, l]) =>
          <button key={v} className={style === v ? '' : 'secondary'} onClick={() => setStyle(v)}>{l}</button>)}
      </div>
      {names.length > 0 && <div className="tool-grid" style={{ marginTop: 12 }}>
        {names.map((n) => <div key={n} className="tool-card" style={{ textAlign: 'center' }}><h3>{n}</h3><button className="secondary" onClick={() => navigator.clipboard.writeText(n)}>Copy</button></div>)}
      </div>}
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Check domain and trademark availability before committing to a name.</p>
    </div>
  );
}
