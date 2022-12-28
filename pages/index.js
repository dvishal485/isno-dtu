import Layout from "components/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <h1>
        <span style={{ marginRight: ".3em", verticalAlign: "middle" }}>
          <Image src="/ISNO-32px.jpg" width="32" height="32" style={{ borderRadius: "50%", overflow: "hidden" }} alt="" />
        </span>
        ISNO Portal
      </h1>

      <p>
        ISNO Portal is an online platform to manage the students&apos; data.<br />
        Assisting to manage their informtion, grades, and ease the process of evaluation.
      </p>

      <p>
        To get started, click on the <strong>Login</strong> menu on the top right corner.
      </p>

      <h2>Features</h2>

      <ul>
        <li>Uses data directly from DTU website, so data remains upto date</li>
        <li>Everything is recorded in MongoDB database making administration easy</li>
        <li>Technology Used : Next JS , MongoDB , iron-session</li>
        <li>Login access only for verified teachers and administrators</li>
        <li>Student ID Card and Informtaion access</li>
        <li>Easier evaluation by pre-filled excel sheets</li>
        <li>Automated result generation <sup>(ToDo)</sup></li>
        <li>Students can access their information through a different portal <sup>(ToDo)</sup></li>
      </ul>

      <h2>Register as Teacher</h2>

      <ol>
        <li>Navigate to <a href="https://dtu.irins.org/" rel="noreferrer" target="_blank">DTU Irins Platform</a></li>
        <li>Find your profile and copy the link</li>
        <li><a href="https://forms.gle/C63eTegD6JB7ofPZ9" rel="noreferrer" target="_blank">Fill the registration form with your profile link</a></li>
        <li>You will be notified once your request is approved.</li>
      </ol>
      Registration link : <a href="https://forms.gle/C63eTegD6JB7ofPZ9" rel="noreferrer" target="_blank">https://forms.gle/C63eTegD6JB7ofPZ9</a>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  );
}
