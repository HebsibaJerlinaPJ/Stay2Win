import React from 'react';

function StudentList({ students, onSelectStudent }) {
  return (
    <div className="student-list">
      <h3>Students</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index} onClick={() => onSelectStudent(student)}>
            {student.Student_Name} {/* Use the correct key from your CSV */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;