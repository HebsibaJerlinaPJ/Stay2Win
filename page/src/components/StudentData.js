import React, { useState } from 'react';
import Papa from 'papaparse';
import { Bar, Pie } from 'react-chartjs-2';
import '../styles/RiskAnalysis.css';

const RiskAnalysis = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data
          .filter(row => row.Name && row.Attendance && row.Marks && row.Participation) // filter valid rows
          .map((row) => {
            const dropoutRisk = calculateDropoutRisk(row);
            return {
              ...row,
              dropoutRisk,
              reason: generateReason(dropoutRisk),
            };
          });
        setStudents(parsedData);
        setSelectedStudent(parsedData[0]);
      },
    });
  };

  const calculateDropoutRisk = (student) => {
    let risk = 0;
    if (parseFloat(student.Attendance) < 75) risk += 30;
    if (parseFloat(student.Marks) < 50) risk += 30;
    if (parseFloat(student.Participation) < 50) risk += 20;
    if (student.Behavior && student.Behavior.toLowerCase() === 'poor') risk += 20;
    return Math.min(risk, 100);
  };

  const generateReason = (risk) => {
    if (risk >= 75) return 'Critical attendance and academic issues';
    if (risk >= 50) return 'Academic performance and engagement need improvement';
    if (risk >= 25) return 'Moderate risk due to some performance issues';
    return 'Student performance is satisfactory';
  };

  const getBarChartData = () => {
    const { Attendance, Marks, Participation, Name } = selectedStudent;
    return {
      labels: ['Attendance', 'Marks', 'Participation'],
      datasets: [
        {
          label: `${Name}'s Performance`,
          data: [parseFloat(Attendance), parseFloat(Marks), parseFloat(Participation)],
          backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
        },
      ],
    };
  };

  const getPieChartData = () => {
    const risk = selectedStudent.dropoutRisk;
    return {
      labels: ['Risk %', 'Remaining %'],
      datasets: [
        {
          data: [risk, 100 - risk],
          backgroundColor: ['#e74c3c', '#2ecc71'],
        },
      ],
    };
  };

  return (
    <div className="student-data-page">
      <h2>Risk Analysis Dashboard</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginBottom: '20px' }} />

      {students.length > 0 && (
        <div className="student-data-container">
          {/* Student List */}
          <div className="student-list-container">
            <div className="student-list">
              <h3>Students</h3>
              <ul>
                {students.map((student, index) => (
                  <li key={index} onClick={() => setSelectedStudent(student)}>
                    {student.Name || `Student ${index + 1}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Details */}
          <div className="student-details-container">
            {selectedStudent && (
              <div className="student-details">
                <h3>Student Details</h3>
                <div className="student-grid">
                  <div><strong>Name:</strong> {selectedStudent.Name}</div>
                  <div><strong>Dropout Risk:</strong> {selectedStudent.dropoutRisk}%</div>
                  <div><strong>Reason:</strong> {selectedStudent.reason}</div>
                </div>
              </div>
            )}

            <button
              className="visualize-button"
              onClick={() => setShowVisualization(!showVisualization)}
            >
              {showVisualization ? 'Hide Visualization' : 'Visualize'}
            </button>

            {showVisualization && selectedStudent && (
              <div className="visualization">
                <div className="charts-container">
                  <div className="chart">
                    <h4>Bar Chart - {selectedStudent.Name}'s Performance</h4>
                    <Bar data={getBarChartData()} />
                  </div>
                  <div className="chart">
                    <h4>Risk Level Pie Chart</h4>
                    <Pie data={getPieChartData()} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAnalysis;
