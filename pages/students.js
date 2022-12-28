import React from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import useStudents from "lib/useStudents";
import Batches from "components/Batches";
import Link from "next/link";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function AllStudentList() {
  const { user } = useUser({
    redirectTo: "/login",
  });
  const [updating, setUpdating] = React.useState(false);
  const { students, error, mutate: refresh_list, isValidating } = useStudents(user);
  const update_details = async (roll_no) => {
    if (updating) {
      window.alert('Please wait for the previous request to complete');
      return;
    }
    setUpdating(true);
    await fetch(`/api/database?roll_no=${roll_no}&refresh_db=true`);
    refresh_list();
    window.alert('If details are not refreshed, kindly report this to the admin');
  }
  return (
    <Layout>
      <h1>Welcome {user && (user.username)}</h1>
      {user && (
        <>
          <p>
            {user && user.batches && user.batches.length > 0 && (
              <>
                You are a teacher of the following batches:{" "}
                <Batches key={user.username} user={user} />
              </>
            )}
          </p>
        </>
      )}
      {user && !error && (<><h3>All Students Database</h3></>)}
      {user && user.isLoggedIn && (isValidating && ("Database is being loaded...")) || (students !== undefined && (
        <p>
          Number of students in database: <b>{students.length}</b>.{" "}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => refresh_list()}>Refresh</button>
          </div>
        </p>))
      }
      {user && user.isLoggedIn && students && students.length > 0 && (
        <table>
          <tr><th>Student&apos;s Name</th><th>Roll Number</th><th>Date Of Birth</th><th>Address</th><th>Actions</th></tr>
          {students.map((student) => (
            <tr key={student.roll_no + student.name}>
              <td style={{ width: "10%", maxWidth: "25%", overflow: "auto" }}>{student.name}</td>
              <td style={{ width: "15%", maxWidth: "20%", overflow: "auto" }}>{student.roll_no}</td>
              <td style={{ width: "10%", maxWidth: "15%", overflow: "auto" }}>{student.dob}</td>
              <td style={{ width: "30%", maxWidth: "40%", overflow: "auto" }}>{student.address}</td>
              <td>
                <ul>
                  <li><Link href={`/student_profile?roll_no=${student.roll_no}`} >View Profile</Link></li>
                  <li onClick={() => { update_details(student.roll_no) }}>Update Details</li>
                  <li>Show batch</li>
                  <li>Report Student</li>
                </ul>
              </td>
            </tr>
          ))}
        </table>)
      }
    </Layout>
  );
}
