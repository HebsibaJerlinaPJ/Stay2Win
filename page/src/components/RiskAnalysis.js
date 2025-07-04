import React, { useState } from 'react';
import Papa from 'papaparse';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/RiskAnalysis.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

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
        const parsedData = results.data.map((row) => {
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
    if (parseFloat(student.Attendance) < 75) risk += 25;
    if (parseFloat(student.Grades) < 50) risk += 25;
    if (parseFloat(student.Engagement_Score) < 30) risk += 20;
    if (parseInt(student.Behavioral_Issues) > 0) risk += 15;
    if (student.Mental_Health_Indicators === 'Yes') risk += 15;
    return Math.min(risk, 100);
  };

  const generateReason = (risk) => {
    if (risk >= 75) return 'Critical issues in attendance, grades, and mental health.';
    if (risk >= 50) return 'Needs improvement in academics and behavior.';
    if (risk >= 25) return 'Moderate risk due to performance or issues.';
    return 'Student appears to be on track.';
  };

  const getBarChartData = () => {
    if (!selectedStudent) return null;

    return {
      labels: ['Attendance', 'Grades', 'Engagement'],
      datasets: [
        {
          label: selectedStudent.Student_Name,
          backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
          data: [
            parseFloat(selectedStudent.Attendance),
            parseFloat(selectedStudent.Grades),
            parseFloat(selectedStudent.Engagement_Score),
          ],
        },
      ],
    };
  };

  const getStudentRiskPieChartData = () => {
    if (!selectedStudent) return null;
    const risk = parseFloat(selectedStudent.dropoutRisk || 0);
    const safe = 100 - risk;

    return {
      labels: ['Dropout Risk', 'Safe'],
      datasets: [
        {
          data: [risk, safe],
          backgroundColor: ['#e74c3c', '#2ecc71'],
        },
      ],
    };
  };

  const getOverallRiskPieChartData = () => {
    const high = students.filter(s => s.dropoutRisk >= 75).length;
    const medium = students.filter(s => s.dropoutRisk >= 50 && s.dropoutRisk < 75).length;
    const low = students.filter(s => s.dropoutRisk >= 25 && s.dropoutRisk < 50).length;
    const safe = students.filter(s => s.dropoutRisk < 25).length;

    return {
      labels: ['High Risk', 'Medium Risk', 'Low Risk', 'Safe'],
      datasets: [
        {
          data: [high, medium, low, safe],
          backgroundColor: ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71'],
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
                    {student.Student_Name || `Student ${index + 1}`}
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
                  <div><strong>Name:</strong> {selectedStudent.Student_Name}</div>
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

            {showVisualization && (
              <div className="visualization">
                <div className="charts-container">
                  {/* Bar Chart */}
                  <div className="chart">
                    <h4>{selectedStudent?.Student_Name}'s Performance</h4>
                    {getBarChartData() && <Bar data={getBarChartData()} />}
                  </div>

                  {/* Individual Risk Pie Chart */}
                  <div className="chart">
                    <h4>{selectedStudent?.Student_Name}'s Dropout Risk</h4>
                    {getStudentRiskPieChartData() && <Pie data={getStudentRiskPieChartData()} />}
                  </div>

                  {/* Overall Risk Distribution */}
                  <div className="chart">
                    <h4>Overall Risk Distribution</h4>
                    <Pie data={getOverallRiskPieChartData()} />
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
