import React, { useState } from 'react';
import { createRecord, deleteRecord, updateRecord } from '../services/firestore';

export default function CrudTable({ collectionName, title, columns, initialRows = [], ownerId }) {
  const [rows,setRows]=useState(initialRows.map((r,i)=>({...r,id:r.id||`local-${i}`})));
  const [editing,setEditing]=useState(null);
  const [draft,setDraft]=useState({});

  function startEdit(row){setEditing(row.id);setDraft({...row});}
  async function save(){
    const clean={...draft}; delete clean.id;
    if(!String(editing).startsWith('local-')) await updateRecord(collectionName,editing,clean);
    setRows(rows.map(r=>r.id===editing?{...r,...clean}:r)); setEditing(null);
  }
  async function remove(id){
    if(!String(id).startsWith('local-')) await deleteRecord(collectionName,id);
    setRows(rows.filter(r=>r.id!==id));
  }
  async function add(){
    const blank=Object.fromEntries(columns.map(c=>[c.key,'']));
    const record=ownerId ? await createRecord(collectionName,{...blank,ownerId}) : {...blank,id:`local-${Date.now()}`};
    setRows([...rows,record]); startEdit(record);
  }
  return <div className="card">
    <h3>{title}</h3><button className="add-row-btn" onClick={add}><i className="fas fa-plus"></i> Add</button>
    <div style={{overflowX:'auto'}}><table className="crud-table"><thead><tr>{columns.map(c=><th key={c.key}>{c.label}</th>)}<th>Actions</th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}>{columns.map(c=><td key={c.key}>{editing===row.id?<input className="crud-input" value={draft[c.key]??''} onChange={e=>setDraft({...draft,[c.key]:e.target.value})}/>:row[c.key]}</td>)}
      <td>{editing===row.id?<><button className="crud-btn save" onClick={save}>Save</button><button className="crud-btn cancel" onClick={()=>setEditing(null)}>Cancel</button></>:<><button className="crud-btn edit" onClick={()=>startEdit(row)}>Edit</button><button className="crud-btn delete" onClick={()=>remove(row.id)}>Delete</button></>}</td>
    </tr>)}</tbody></table></div>
  </div>;
}
