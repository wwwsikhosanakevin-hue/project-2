import React from 'react';

const items = [
  ['home','fa-home','Home'],['dashboard','fa-chart-pie','Dashboard'],['whiteboard','fa-chalkboard','Whiteboard'],
  ['library','fa-book-open','Library'],['subjects','fa-book','Subjects'],['timetable','fa-clock','Timetable'],
  ['assignments','fa-pencil-alt','Assignments'],['activities','fa-tasks','Activities'],['grades','fa-star','Grades'],
  ['memorandum','fa-file-alt','Memorandum'],['papers','fa-scroll','Past Papers'],['register','fa-clipboard-list','Register'],
  ['ai','fa-robot','AI'],['session','fa-video','Session'],['video','fa-play-circle','Video'],
  ['quiz','fa-question-circle','Quiz'],['settings','fa-cog','Settings']
];

export default function Sidebar({ active, onChange }) {
  return <aside className="sidebar">
    <div className="logo"><i className="fas fa-chalkboard-teacher"></i> MyBoard<span>grades 3–12</span></div>
    {items.map(([id, icon, label]) => (
      <button key={id} className={`tab ${active === id ? 'active' : ''}`} onClick={() => onChange(id)}>
        <i className={`fas ${icon}`}></i> {label}
      </button>
    ))}
    <div className="connect-group">
      <button onClick={() => alert('Gmail integration can be connected here.')}><i className="fas fa-envelope"></i> Gmail</button>
      <button onClick={() => alert('Outlook integration can be connected here.')}><i className="fas fa-envelope-open-text"></i> Outlook</button>
      <button onClick={() => alert('External integrations can be connected here.')}><i className="fas fa-plug"></i> Connect</button>
    </div>
  </aside>;
}
