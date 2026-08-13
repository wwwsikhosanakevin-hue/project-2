import React from 'react';
import Auth from './Auth';

export default function Home({ onAuthenticated }) {
  return <section className="panel active-panel">
    <div className="hero">
      <h1><i className="fas fa-chalkboard-teacher"></i> Welcome to MyBoard</h1>
      <p>Your all-in-one learning platform for grades 3–12. CAPS & Mind the Gap aligned.</p>
      <div className="hero-icons"><i className="fas fa-user-graduate"></i><i className="fas fa-chalkboard"></i><i className="fas fa-book-open"></i><i className="fas fa-robot"></i><i className="fas fa-video"></i></div>
    </div>
    <Auth onAuthenticated={onAuthenticated}/>
  </section>;
}
