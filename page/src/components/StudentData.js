
import React, { useState } from 'react';
import Papa from 'papaparse';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';
import Visualization from './Visualization';
import '../styles/StudentData.css';

function StudentData() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);

  // Handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setStudents(results.data);
          setSelectedStudent(results.data[0]); // Select the first student by default
        },
      });
    }
  };

  return (
    <div className="student-data-page">
      <h2>Student Data Visualization</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      <div className="student-data-container">
        {/* Sidebar with student names */}
        <div className="student-list-container">
          <StudentList students={students} onSelectStudent={setSelectedStudent} />
        </div>

        {/* Display selected student's details or visualization */}
        <div className="student-details-container">
          {selectedStudent ? (
            <>
              <button
                className="visualize-button"
                onClick={() => setShowVisualization(!showVisualization)}
              >
                {showVisualization ? 'Hide Visualization' : 'Visualize'}
              </button>
              <div className={`content-container ${showVisualization ? 'flipped' : ''}`}>
                <div className="front">
                  <StudentDetails student={selectedStudent} />
                </div>
                <div className="back">
                  <Visualization student={selectedStudent} />
                </div>
              </div>
            </>
          ) : (
            <p>No student selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentData;