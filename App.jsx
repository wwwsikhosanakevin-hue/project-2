import React,{useEffect,useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';
import {logoutUser} from './services/auth';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Whiteboard from './components/Whiteboard';
import Library from './components/Library';
import AI from './components/AI';
import Session from './components/Session';
import Video from './components/Video';
import Grades from './components/Grades';
import Settings from './components/Settings';
import CrudTable from './components/CrudTable';

function Dashboard({user}){return <section className="panel active-panel"><div className="panel-header"><i className="fas fa-chart-pie"></i> Dashboard</div><div className="card profile-card"><div className="profile-avatar"><i className="fas fa-user-graduate"></i></div><div className="profile-info"><h4>{user?.displayName||'MyBoard User'}</h4><div className="grade-badge">Learning Platform</div><p className="muted">Authenticated with Firebase.</p></div></div><div className="module-grid"><div className="stat"><i className="fas fa-book"></i> Library</div><div className="stat"><i className="fas fa-tasks"></i> Activities</div><div className="stat"><i className="fas fa-star"></i> Grades</div><div className="stat"><i className="fas fa-video"></i> Sessions</div><div className="stat"><i className="fas fa-robot"></i> AI</div></div></section>}

const modules={
 subjects:{title:'Manage Subjects',collection:'subjects',columns:[{key:'subject',label:'Subject'},{key:'grade',label:'Grade'},{key:'teacher',label:'Teacher'},{key:'students',label:'Students'}],rows:[{subject:'Mathematics',grade:'Gr.7',teacher:'Mr. Dlamini',students:22},{subject:'English',grade:'Gr.9',teacher:'Ms. Nkosi',students:18}]},
 timetable:{title:'Manage Timetable',collection:'timetable',columns:[{key:'day',label:'Day'},{key:'time',label:'Time'},{key:'subject',label:'Subject'},{key:'grade',label:'Grade'},{key:'teacher',label:'Teacher'}],rows:[{day:'Monday',time:'08:00-09:00',subject:'Mathematics',grade:'Gr.7',teacher:'Mr. Dlamini'}]},
 assignments:{title:'Manage Assignments',collection:'assignments',columns:[{key:'subject',label:'Subject'},{key:'grade',label:'Grade'},{key:'dueDate',label:'Due Date'},{key:'submissionTime',label:'Submission Time'},{key:'lateDeduction',label:'Late Deduction'}],rows:[{subject:'Mathematics',grade:'Gr.7',dueDate:'2025-08-15',submissionTime:'16:00',lateDeduction:'10%'}]},
 activities:{title:'Manage Activities',collection:'activities',columns:[{key:'activity',label:'Activity'},{key:'grade',label:'Grade'},{key:'dueDate',label:'Due Date'},{key:'submissionTime',label:'Submission Time'},{key:'lateDeduction',label:'Late Deduction'}],rows:[{activity:'Group discussion: History',grade:'Gr.10',dueDate:'2025-08-12',submissionTime:'14:00',lateDeduction:'10%'}]},
 memorandum:{title:'Manage Memorandum',collection:'memorandum',columns:[{key:'subject',label:'Subject'},{key:'grade',label:'Grade'},{key:'file',label:'File'}],rows:[{subject:'Mathematics',grade:'Gr.7',file:'Math_Gr7_Memo.pdf'}]},
 quiz:{title:'Manage Quizzes',collection:'quizzes',columns:[{key:'quiz',label:'Quiz'},{key:'grade',label:'Grade'},{key:'dueDate',label:'Due Date'},{key:'submissionTime',label:'Submission Time'},{key:'lateDeduction',label:'Late Deduction'}],rows:[{quiz:'Fractions Quiz',grade:'Gr.7',dueDate:'2025-08-18',submissionTime:'15:00',lateDeduction:'10%'}]}
};

export default function App(){
 const [user,setUser]=useState(null),[active,setActive]=useState('home'),[dark,setDark]=useState(false);
 useEffect(()=>onAuthStateChanged(auth,setUser),[]);
 useEffect(()=>document.body.classList.toggle('dark',dark),[dark]);

 function content(){
   if(active==='home') return <Home onAuthenticated={u=>{setUser(u);setActive('dashboard')}}/>;
   if(!user) return <Home onAuthenticated={u=>{setUser(u);setActive('dashboard')}}/>;
   if(active==='dashboard')return <Dashboard user={user}/>;
   if(active==='whiteboard')return <Whiteboard/>;
   if(active==='library')return <Library user={user}/>;
   if(active==='ai')return <AI/>;
   if(active==='session')return <Session user={user}/>;
   if(active==='video')return <Video user={user}/>;
   if(active==='grades')return <Grades user={user}/>;
   if(active==='settings')return <Settings dark={dark} setDark={setDark}/>;
   if(active==='papers')return <div className="panel active-panel"><div className="panel-header"><i className="fas fa-scroll"></i> Past Papers</div><div className="card"><h3>Access papers</h3><p className="muted">Store past papers in Firebase Storage and reference them from Firestore.</p></div></div>;
   if(active==='register')return <CrudTable ownerId={user.uid} collectionName="attendance" title="Manage Attendance" columns={[{key:'student',label:'Student'},{key:'grade',label:'Grade'},{key:'status',label:'Status'}]} initialRows={[{student:'Lerato M.',grade:'Gr.7',status:'Present'},{student:'Thabo K.',grade:'Gr.7',status:'Absent'}]}/>;
   if(modules[active]){const m=modules[active];return <CrudTable ownerId={user.uid} collectionName={m.collection} title={m.title} columns={m.columns} initialRows={m.rows}/>;}
   return <div className="panel active-panel"><div className="card"><h3>{active}</h3><p>Module ready for expansion.</p></div></div>;
 }
 return <div className="app-shell"><Sidebar active={active} onChange={setActive}/><main className="main-content app-main">{user&&active!=='home'&&<div style={{display:'flex',justifyContent:'flex-end',gap:8}}><span className="muted">{user.email}</span><button className="secondary-btn" onClick={()=>logoutUser().then(()=>setActive('home'))}>Logout</button></div>}{content()}</main></div>;
}
