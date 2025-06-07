import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard vh-100">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Stay2Win Dashboard</span>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          {/* Student Data Card */}
          <div className="col-md-4 mb-4 d-flex">
            <div className="card shadow-lg flex-fill" onClick={() => navigate('/student-data')}>
              <img
                src="/assets/student-data.jpg"
                className="card-img-top"
                alt="Student Data"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Student Data</h5>
                <p className="card-text flex-grow-1">
                  Access and manage comprehensive student records, including academic performance, attendance, and personal details.
                </p>
                <button className="btn btn-primary align-self-start">Explore</button>
              </div>
            </div>
          </div>

          {/* Risk Analysis Card */}
          <div className="col-md-4 mb-4 d-flex">
            <div className="card shadow-lg flex-fill" onClick={() => navigate('/risk-analysis')}>
              <img
                src="/assets/risk-analysis.jpg"
                className="card-img-top"
                alt="Risk Analysis"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Risk Analysis</h5>
                <p className="card-text flex-grow-1">
                  Analyze and identify students at risk of dropping out based on attendance, grades, and behavioral data.
                </p>
                <button className="btn btn-primary align-self-start">Explore</button>
              </div>
            </div>
          </div>

          {/* Intervention Plans Card */}
          <div className="col-md-4 mb-4 d-flex">
            <div className="card shadow-lg flex-fill" onClick={() => navigate('/intervention-plans')}>
              <img
                src="/assets/intervention-plans.png"
                className="card-img-top"
                alt="Intervention Plans"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Intervention Plans</h5>
                <p className="card-text flex-grow-1">
                  Create and manage personalized intervention plans, including counseling, tutoring, and mentorship programs.
                </p>
                <button className="btn btn-primary align-self-start">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;