import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/auth';

export default function Auth({ onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({name:'',email:'',password:'',role:'student',grade:'3',subject:'',teachingGrade:'',icon:'fa-user-graduate'});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const change = e => setForm({...form, [e.target.name]: e.target.value});
  async function submit(e) {
    e.preventDefault(); setError(''); setMessage('');
    try {
      if (isLogin) {
        const user = await loginUser(form.email, form.password);
        onAuthenticated(user);
      } else {
        await registerUser(form);
        setMessage('Registration successful. Please login.');
        setIsLogin(true);
      }
    } catch (err) { setError(err.message); }
  }

  return <div className="auth-container">
    <div className="auth-icon"><i className="fas fa-graduation-cap"></i></div>
    <h2>{isLogin ? 'Login' : 'Register'}</h2>
    <form onSubmit={submit}>
      {!isLogin && <>
        <div className="form-group"><label>Full Name</label><input name="name" value={form.name} onChange={change} required /></div>
        <div className="form-group"><label>Role</label><select name="role" value={form.role} onChange={change}><option value="student">Student</option><option value="teacher">Teacher</option></select></div>
        {form.role === 'student' ? <div className="form-group"><label>Grade</label><select name="grade" value={form.grade} onChange={change}>{[3,4,5,6,7,8,9,10,11,12].map(g=><option key={g}>{g}</option>)}</select></div> :
        <><div className="form-group"><label>Teaching Subject(s)</label><input name="subject" value={form.subject} onChange={change} placeholder="Mathematics, English" /></div>
        <div className="form-group"><label>Teaching Grade(s)</label><input name="teachingGrade" value={form.teachingGrade} onChange={change} placeholder="Gr.7, Gr.8" /></div></>}
        <div className="form-group"><label>Profile Icon</label><select name="icon" value={form.icon} onChange={change}><option value="fa-user-graduate">🎓 Graduate</option><option value="fa-user-tie">👔 Teacher</option><option value="fa-user-astronaut">🚀 Astronaut</option><option value="fa-user-ninja">🥷 Ninja</option></select></div>
      </>}
      <div className="form-group"><label>Email</label><input type="email" name="email" value={form.email} onChange={change} required /></div>
      <div className="form-group"><label>Password</label><input type="password" name="password" value={form.password} onChange={change} required /></div>
      <button className="btn-auth" type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
    {error && <div className="auth-error">{error}</div>}
    {message && <div className="success-text" style={{textAlign:'center'}}>{message}</div>}
    <div className="auth-switch">{isLogin ? "Don't have an account? " : "Already have an account? "}
      <a onClick={() => {setIsLogin(!isLogin);setError('');setMessage('')}}>{isLogin ? 'Register' : 'Login'}</a>
    </div>
  </div>;
}
