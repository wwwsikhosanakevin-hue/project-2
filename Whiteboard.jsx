import React, { useEffect, useRef, useState } from 'react';

export default function Whiteboard() {
  const ref=useRef(null), drawing=useRef(false), [color,setColor]=useState('#0b1e33');
  useEffect(()=>{const c=ref.current,ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height);
    const pos=e=>{const r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}};
    const down=e=>{drawing.current=true;const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y)};
    const move=e=>{if(!drawing.current)return;const p=pos(e);ctx.strokeStyle=color;ctx.lineWidth=3;ctx.lineCap='round';ctx.lineTo(p.x,p.y);ctx.stroke()};
    const up=()=>drawing.current=false;c.addEventListener('pointerdown',down);c.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
    return()=>{c.removeEventListener('pointerdown',down);c.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up)}
  },[color]);
  const clear=()=>{const c=ref.current,ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height)};
  return <section className="panel active-panel"><div className="panel-header"><i className="fas fa-chalkboard"></i> Whiteboard</div><div className="card">
    <div className="wb-tools"><button onClick={clear}><i className="fas fa-eraser"></i> Clear</button><input type="color" className="color-picker" value={color} onChange={e=>setColor(e.target.value)}/><span className="wb-status"><i className="fas fa-circle live"></i> Private</span></div>
    <canvas ref={ref} width="1000" height="420" id="whiteboardCanvas"/><p className="muted">Drawing is currently local to the browser. Connect a realtime Firestore/WebSocket layer for shared classrooms.</p>
  </div></section>;
}
