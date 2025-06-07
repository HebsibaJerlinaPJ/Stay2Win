import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EntryPage.css';

function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="entry-page d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 fw-bold text-white">Stay2Win</h1>
      <p className="lead text-white">Empowering Students to Stay and Succeed</p>
      <button
        className="btn btn-light btn-lg mt-4"
        onClick={() => navigate('/login')}
      >
        Get Started
      </button>
    </div>
  );
}

export default EntryPage;