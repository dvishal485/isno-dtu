import grade from "lib/grading";
import React from "react";

export default function Result(props) {
    const { student, evaluation } = props;
    const grades = grade(evaluation);
    let total_points = 0;
    let max_points = 0;
    student.subjects.map((subject) => {
        max_points += subject.credits * 100;
        total_points += grades[subject.code].marks * subject.credits;
    }
    )
    const sgpa = total_points / max_points * 10;

    return (
        <>
            <div style={{
                maxWidth: '55vw',
                padding: '1rem',
                border: '1px solid black',
                borderRadius: '1rem',
                margin: '1rem auto',
                textAlign: 'left',
                lineHeight: '1.5rem'
            }}>
                <h1>Result</h1>
                <b>Name :</b> {student.name}<br />
                <b>Roll Number :</b> {student.roll_no}<br />
                <b>Branch :</b> {student.branch}<br />
                <b>Address:</b > {student.address}<br />
                <b>Phone Number:</b > {student.phone}<br />
                <b>Subjects :</b ><br />
                <table>
                    <tr><th>S. No.</th><th>Subject Code</th><th>Subject Name</th><th>Credits</th><th>Credits Secured</th><th>Grade</th></tr>
                    {
                        student.subjects.map((subject, index) => (
                            <tr key={subject.code}>
                                <td>{index + 1}</td>
                                <td>{subject.code}</td>
                                <td>{subject.subject}</td>
                                <td>{subject.credits}</td>
                                <td>{grades[subject.code].grade !== 'F' ? subject.credits : 0}</td>
                                <td>{grades[subject.code].grade}</td>
                            </tr>
                        ))}
                </table><br />
                SGPA : {sgpa.toFixed(2)}
            </div>
            <style jsx> {`
        table {
          max-width: 100%;
          width: 100%;
          border-collapse: collapse;
        }
        
        td, th {
          border: 1px solid #ddd;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        td:nth-child(4),
        td:nth-child(5),
        th:nth-child(4),
        th:nth-child(5){
            width: 10%;
        }

        td:nth-child(6),
        th:nth-child(6){
            width: 12%;
        }

        tr:hover {
          background-color: #ddd;
        }

        th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #4caf50;
          color: white;
        }
        `}</style>
        </>
    )
}
