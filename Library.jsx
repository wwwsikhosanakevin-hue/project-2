import React, { useEffect, useState } from 'react';
import { createRecord, listRecords } from '../services/firestore';
import { uploadFile } from '../services/storage';

const subjects=["Mathematics","English","Afrikaans","Natural Science","Social Science","Life Orientation","Creative Arts","EMS","Technology","History","Geography","Life Sciences","Physical Science","Accounting","Business Studies","Economics","Tourism","CAT","IT","Agricultural Science","Dramatic Arts","Music","Visual Arts","Design","Civil Technology","Electrical Technology","Mechanical Technology","Engineering Graphics","Hospitality Studies","Consumer Studies"];

export default function Library({user}) {
 const [books,setBooks]=useState([]),[file,setFile]=useState(null),[status,setStatus]=useState('');
 useEffect(()=>{listRecords('library',user?.uid).then(setBooks).catch(()=>{});},[user]);
 async function addResource(){
   if(!file)return;
   setStatus('Uploading...');
   try{const uploaded=await uploadFile(file,'library',user?.uid);const record=await createRecord('library',{ownerId:user.uid,title:file.name,subject:'General',...uploaded});setBooks([...books,record]);setStatus('Uploaded to Firebase Storage + Firestore.');}
   catch(e){setStatus(e.message)}
 }
 return <section className="panel active-panel"><div className="panel-header"><i className="fas fa-book-open"></i> Library · 30 subjects</div>
  <div className="card"><div className="book-grid">{subjects.map((s,i)=><div className="book-item" key={s} onClick={()=>alert(`📖 ${s} · Grade 3–12`) }><i className="fas fa-book"></i>{s}<span className={`tag ${i%3===1?'mtg':i%3===2?'africa':''}`}>{['CAPS','MTG','Africa'][i%3]}</span></div>)}</div></div>
  <div className="card"><h3><i className="fas fa-upload"></i> Store Library Resource</h3><input type="file" onChange={e=>setFile(e.target.files[0])}/><button className="primary-btn" onClick={addResource} style={{marginLeft:8}}>Upload</button><p className="muted">{status}</p>
   {books.length>0&&<ul>{books.map(b=><li key={b.id}><a href={b.url} target="_blank" rel="noreferrer">{b.title}</a></li>)}</ul>}
  </div></section>;
}
