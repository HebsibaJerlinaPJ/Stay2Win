import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Visualization({ student }) {
  if (!student) return <p>No student selected.</p>;

  // Extract all keys (columns) from the student object
  const columns = Object.keys(student);

  // Filter out non-numeric columns (e.g., Student_Name, Student_ID)
  const numericColumns = columns.filter(
    (column) => typeof student[column] === 'number'
  );

  // Data for the bar chart (all numeric columns)
  const barData = {
    labels: numericColumns,
    datasets: [
      {
        label: 'Student Data',
        data: numericColumns.map((column) => student[column]),
        backgroundColor: numericColumns.map(
          (_, index) => `hsl(${(index * 360) / numericColumns.length}, 70%, 50%)`
        ),
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  // Data for the pie chart (all numeric columns)
  const pieData = {
    labels: numericColumns,
    datasets: [
      {
        data: numericColumns.map((column) => student[column]),
        backgroundColor: numericColumns.map(
          (_, index) => `hsl(${(index * 360) / numericColumns.length}, 70%, 50%)`
        ),
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  // Chart options for better aesthetics
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="visualization">
      <h3>Visualization for {student.Student_Name}</h3>
      <div className="charts-container">
        <div className="chart">
          <h4>Numeric Data (Bar Chart)</h4>
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="chart">
          <h4>Numeric Data (Pie Chart)</h4>
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Visualization;