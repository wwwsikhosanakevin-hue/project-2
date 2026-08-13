import React,{useState} from 'react'; import {uploadFile} from '../services/storage';
export default function Video({user}){const [url,setUrl]=useState(''),[status,setStatus]=useState('');
async function upload(e){const f=e.target.files[0];if(!f)return;setStatus('Uploading...');try{const r=await uploadFile(f,'videos',user?.uid);setUrl(r.url);setStatus('Uploaded.')}catch(err){setStatus(err.message)}}
return <section className="panel active-panel"><div className="panel-header"><i className="fas fa-play-circle"></i> Video</div><div className="card"><h3>Upload & watch</h3><input type="file" accept="video/*" onChange={upload}/><p className="muted">{status}</p>{url&&<video src={url} controls style={{width:'100%',maxHeight:360,borderRadius:16}}/>}</div></section>}
