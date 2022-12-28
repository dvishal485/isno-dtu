import React, { useState } from 'react';

export default function Batches(props) {
    const { user } = props;
    const host = process.env.VERCEL_URL || "http://localhost:3000";
    const generate_eval_sheet = (batch) => {
        const start = JSON.stringify([batch.start]);
        const end = JSON.stringify([batch.end]);
        const year = JSON.stringify([batch.year]);
        const branch = JSON.stringify([batch.branch]);
        const url = `${host}/api/gen_sheet?subj_code=${batch.subj_code}&year=${year}&branch=${branch}&start=${start}&end=${end}`;
        window.location.assign(url);
    }
    const generate_eval_subj = (subj_code) => {
        const batch_arr = user.batches.filter((batch) => batch.subj_code === subj_code);
        const start = JSON.stringify(batch_arr.map((batch) => batch.start));
        const end = JSON.stringify(batch_arr.map((batch) => batch.end));
        const year = JSON.stringify(batch_arr.map((batch) => batch.year));
        const branch = JSON.stringify(batch_arr.map((batch) => batch.branch));
        const url = `${host}/api/gen_sheet?subj_code=${subj_code}&year=${year}&branch=${branch}&start=${start}&end=${end}`;
        window.open(url, "_blank");
    }
    const subjects_taught = user.batches.map(
        (batch) => batch.subj_code).filter(
            (subject, index, self) =>
                self.indexOf(subject) === index);
    return (
        <div>
            <ul>
                {user.batches.map((batch) => (
                    <li style={{ display: "flex" }} key={batch.branch + batch.start}>
                        <div style={{ textAlign: "left", width: "80%" }}>
                            Subject : <b>{batch.subj_code}</b> - Roll Numbers : <strong>{batch.year}/{batch.branch}/{batch.start}</strong> to <strong>{batch.year}/{batch.branch}/{batch.end}</strong></div>
                        <div style={{ textAlign: "right" }}><button onClick={() => generate_eval_sheet(batch)} style={{ padding: "0.2rem", margin: "0.2rem", whiteSpace: "nowrap", }}>Generate Evaluation Sheet</button></div>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Subjects Taught</h3>
                <span>You can click on any subject to generate it&apos;s evaluation sheet</span>
                <ul>
                    {subjects_taught.map((subject) => (
                        <li key={subject} onClick={() => generate_eval_subj(subject)} style={{ padding: "0.2rem", margin: "0.2rem", whiteSpace: "nowrap", }}>{subject}</li>
                    ))}
                </ul>
            </div>
        </div >
    );
}


// function CustomPrompt(props) {
//     const [year, setYear] = useState('');

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         alert(`Hello, ${year}!`);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Please confirm year
//                 <input type="text" value={year} onChange={(event) => setYear(event.target.value)} />
//             </label>
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
