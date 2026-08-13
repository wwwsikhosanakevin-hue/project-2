import React,{useRef,useState} from 'react';
import {uploadFile} from '../services/storage';
export default function Session({user}){
 const video=useRef(), recorder=useRef(), chunks=useRef([]), [recording,setRecording]=useState(false), [items,setItems]=useState([]);
 async function start(){
   const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});video.current.srcObject=stream;
   chunks.current=[];recorder.current=new MediaRecorder(stream);
   recorder.current.ondataavailable=e=>e.data.size&&chunks.current.push(e.data);
   recorder.current.onstop=async()=>{const blob=new Blob(chunks.current,{type:'video/webm'});const file=new File([blob],`Session_${Date.now()}.webm`,{type:'video/webm'});try{const u=await uploadFile(file,'recordings',user?.uid);setItems(x=>[...x,u]);}catch(e){alert(e.message)}};
   recorder.current.start();setRecording(true);
 }
 function stop(){recorder.current?.stop();video.current.srcObject?.getTracks().forEach(t=>t.stop());setRecording(false)}
 return <section className="panel active-panel"><div className="panel-header"><i className="fas fa-video"></i> Session · Recordings</div><div className="card"><div className="video-container"><div className="video-box"><video ref={video} autoPlay muted/><button className="rec-btn" onClick={recording?stop:start}>{recording?'Stop':'Start Recording'}</button></div><div className="video-box"><h4 style={{color:'#ffb347'}}>Recordings</h4><ul>{items.map(x=><li key={x.path}><a href={x.url} target="_blank" rel="noreferrer">{x.name}</a></li>)}</ul></div></div></div></section>;
}
