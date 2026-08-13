import React,{useState} from 'react';
import {askAI} from '../services/api';
export default function AI(){
 const [q,setQ]=useState(''),[answer,setAnswer]=useState('Ask me about grades 3–12 subjects, CAPS, Mind the Gap, or assignments.');
 async function ask(){if(!q.trim())return;setAnswer('Thinking...');try{const r=await askAI(q);setAnswer(r.answer||'No answer returned.');}catch(e){setAnswer(`AI service unavailable: ${e.message}`)}}
 return <section className="panel active-panel"><div className="panel-header"><i className="fas fa-robot"></i> AI Helper</div><div className="card"><div className="ai-chat"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Ask anything about CAPS, subjects, assignments..."/><button onClick={ask}><i className="fas fa-paper-plane"></i> Ask</button></div><div className="ai-response"><i className="fas fa-lightbulb"></i> {answer}</div></div></section>;
}
