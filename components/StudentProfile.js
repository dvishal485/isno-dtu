
import useStudentInfo from "lib/useStudentInfo";
import { useState } from "react";
import React from "react";
import useSWR from "swr";
import EvalutionForm from "./EvalutionForm";
import IDCard from "./IDCard";
import Result from "./Result";

export default function StudentProfile(props) {
    const { roll_no, user } = props;
    const [viewResult, setViewResult] = useState(false);
    const [components, setComponents] = useState({});
    const { student, StudentMutate, error, isValidating } = useStudentInfo(roll_no, user);
    const { data: dbStudent, error: dbError, isValidating: dbValidating, mutate: dbRefresh } = useSWR(user?.isLoggedIn ? `/api/database?roll_no=${roll_no}` : null, { refreshWhenHidden: false, refreshWhenOffline: false, revalidateOnFocus: false });
    const refresh = (id) => {
        setComponents((prevComponents) => ({
            ...prevComponents,
            [id]: false,
        }));
        dbRefresh();
    }
    if (!roll_no) return (<div>
        <p>Invalid Roll Number</p>
        <strong>Roll Number :</strong> <input type="text" name="roll_no" id="roll_no" /><br />
        <button onClick={() => {
            const roll_no = document.getElementById("roll_no").value;
            window.location.href = `/student_profile?roll_no=${roll_no}`;
        }}>Submit</button>
    </div>
    );
    const subject_array = user.batches.map((batch) => batch.subj_code);
    const evaluateMarks = (id) => {
        setComponents((prevComponents) => ({
            ...prevComponents,
            [id]: true,
        }));
    }
    return (
        <div className="prof" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="left-div" >
                <p>
                    {(!isValidating && student && (
                        <>
                            <p>
                                {!dbValidating && dbStudent && (dbStudent.length == 1) &&
                                    (<IDCard
                                        name={student.name}
                                        roll_no={student.roll_no}
                                        prev_roll={dbStudent[0].prev_roll}
                                        branch={dbStudent[0].course} />)
                                    ||
                                    (<IDCard
                                        name={student.name}
                                        roll_no={student.roll_no}
                                        prev_roll={student.roll_no} />)
                                }
                            </p>
                            <p>
                                <strong>Name</strong><br />{student.name}<br />
                            </p>
                            <p>
                                <strong>Roll Number</strong><br />{student.roll_no}<br />
                            </p>

                            {!dbValidating && !dbError && dbStudent && dbStudent.length == 1 && (<>
                                <p>
                                    <strong>Old Roll Number</strong><br />
                                    {dbStudent[0].prev_roll}
                                </p>
                            </>)}
                            <button onClick={StudentMutate}>Refresh</button>
                        </>))}
                </p>
            </div>
            <div className="right-div" >
                <p>
                    {error && "Oops, some error occured!"}
                    {isValidating && "Loading..."}
                    {!isValidating && student && dbStudent && dbStudent.length == 1 && dbStudent[0].evaluation && student.subjects.every(subject => dbStudent[0].evaluation[subject.code] !== undefined) && (
                        <>
                            {
                                viewResult &&
                                (<>
                                    <Result student={student} evaluation={dbStudent[0].evaluation} /><br />
                                    <button onClick={() => setViewResult(false)}>Minimise</button>
                                </>
                                ) || (
                                    <button onClick={() => setViewResult(true)}>View Result</button>
                                )
                            }
                        </>
                    )}
                    {!isValidating && student && (
                        <>
                            <p><strong>Branch</strong><br />{student.branch}<br /></p>
                            <p><strong>Address</strong><br />{student.address != '' ? student.address : (dbStudent && dbStudent.length == 1 ? dbStudent[0].address : "")}<br /></p>
                            <p><strong>Phone</strong><br />{student.phone}<br /></p>
                            <p><strong>Personal Email</strong><br />{student.personal_email}<br /></p>
                            <p><strong>Father&apos;s Name</strong><br />{student.father_name != '' ? student.father_name : (dbStudent && dbStudent.length == 1 ? dbStudent[0].father : "")}<br /></p>
                            <p><strong>Mother&apos;s Name</strong><br />{student.mother_name != '' ? student.mother_name : (dbStudent && dbStudent.length == 1 ? dbStudent[0].mother : "")}<br /></p>
                            <p><strong>Date of Birth</strong><br />{student.dob}<br /></p>
                            <p><strong>Subjects</strong><br />
                                <ul>{student.subjects.map((subject) => (
                                    <li key={subject.code} style={{ padding: "0.3rem" }}>
                                        <strong>{subject.code}</strong>{" : "}
                                        <span>{subject.subject}</span><br />
                                        <span>{"( "}{subject.credits} credits{", "}
                                            {subject.compulsory ? "Compulsory" : "Elective"}{" )"}</span><br />
                                        {!dbValidating && dbStudent && dbStudent.length == 1 && dbStudent[0].evaluation && dbStudent[0].evaluation[subject.code] &&
                                            (<>
                                                <span style={{
                                                    alignItems: "center",
                                                    display: "flex",
                                                    padding: "0.5rem",

                                                }}>
                                                    <strong>CWS :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].cws},&nbsp;
                                                    <strong>MTE :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].mte},&nbsp;
                                                    <strong>PRS :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].prs},&nbsp;
                                                    <strong>ETE :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].ete}
                                                </span>
                                                <br />
                                            </>)}
                                        {subject_array.includes(subject.code) &&
                                            (<>
                                                {
                                                    !dbValidating && dbStudent && dbStudent.length == 1 && dbStudent[0].evaluation && dbStudent[0].evaluation[subject.code] && components[subject.code + student.roll_no] &&
                                                    (
                                                        <EvalutionForm
                                                            refresh={() => refresh(subject.code + student.roll_no)}
                                                            key={subject.code + student.roll_no}
                                                            cws={dbStudent[0].evaluation[subject.code].cws}
                                                            mte={dbStudent[0].evaluation[subject.code].mte}
                                                            prs={dbStudent[0].evaluation[subject.code].prs}
                                                            ete={dbStudent[0].evaluation[subject.code].ete}
                                                            subj_code={subject.code}
                                                            roll_no={student.roll_no}
                                                        />
                                                    )
                                                }
                                                {
                                                    !dbValidating && (!dbStudent || dbStudent.length != 1 || !dbStudent[0].evaluation || !dbStudent[0].evaluation[subject.code]) && components[subject.code + student.roll_no] && (
                                                        <EvalutionForm
                                                            refresh={() => refresh(subject.code + student.roll_no)}
                                                            key={subject.code + student.roll_no}
                                                            cws={0}
                                                            mte={0}
                                                            prs={0}
                                                            ete={0}
                                                            subj_code={subject.code}
                                                            roll_no={student.roll_no} />)
                                                }
                                                <span className="subjectTeacher">
                                                    {!components[subject.code + student.roll_no] && (
                                                        <button key={subject.code + student.roll_no} onClick={() => evaluateMarks(subject.code + student.roll_no)}>Evaluate Marks</button>
                                                    )}
                                                </span>
                                            </>)}
                                    </li>
                                ))}</ul>
                            </p>
                            {student.failed_subjects.length > 0 && (<p><strong>Failed Subjects</strong><br />
                                <ul>{student.failed_subjects.map((subject) => (
                                    <li key={subject.code} style={{ padding: "0.3rem" }}>
                                        <strong>{subject.code}</strong>{" : "}
                                        <span>{subject.subject}</span><br />
                                        <span>{"( "}{subject.credits} credits{", "}
                                            {subject.compulsory ? "Compulsory" : "Elective"}{" )"}</span><br />
                                        {!dbValidating && dbStudent && dbStudent.length == 1 && dbStudent[0].evaluation && dbStudent[0].evaluation[subject.code] &&
                                            (<>
                                                <span style={{
                                                    alignItems: "center",
                                                    display: "flex",
                                                    padding: "0.5rem",

                                                }}>
                                                    <strong>CWS :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].cws},&nbsp;
                                                    <strong>MTE :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].mte},&nbsp;
                                                    <strong>PRS :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].prs},&nbsp;
                                                    <strong>ETE :</strong>&nbsp;{dbStudent[0].evaluation[subject.code].ete}
                                                </span>
                                            </>)}
                                        {subject_array.includes(subject.code) &&
                                            (<span className="subjectTeacher">
                                                {
                                                    !dbValidating && dbStudent && dbStudent.length == 1 && dbStudent[0].evaluation && dbStudent[0].evaluation[subject.code] && components[subject.code + student.roll_no] &&
                                                    (
                                                        <EvalutionForm
                                                            refresh={() => refresh(subject.code + student.roll_no)}
                                                            key={subject.code + student.roll_no}
                                                            cws={dbStudent[0].evaluation[subject.code].cws}
                                                            mte={dbStudent[0].evaluation[subject.code].mte}
                                                            prs={dbStudent[0].evaluation[subject.code].prs}
                                                            ete={dbStudent[0].evaluation[subject.code].ete}
                                                            subj_code={subject.code}
                                                            roll_no={student.roll_no}
                                                        />
                                                    )
                                                }
                                                {
                                                    !dbValidating && (!dbStudent || dbStudent.length != 1 || !dbStudent[0].evaluation || !dbStudent[0].evaluation[subject.code]) && components[subject.code + student.roll_no] && (
                                                        <EvalutionForm
                                                            refresh={() => refresh(subject.code + student.roll_no)}
                                                            key={subject.code + student.roll_no}
                                                            cws={0}
                                                            mte={0}
                                                            prs={0}
                                                            ete={0}
                                                            subj_code={subject.code}
                                                            roll_no={student.roll_no} />)
                                                }

                                                {!components[subject.code + student.roll_no] && (
                                                    <button key={subject.code + student.roll_no} onClick={() => evaluateMarks(subject.code + student.roll_no)}>Evaluate Marks</button>
                                                )}
                                            </span>)}
                                    </li>
                                ))}</ul></p>)}
                        </>
                    )}

                </p>
            </div>

            <style jsx>{`
            .subjectTeacher {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
            .subjectTeacher button {
                padding: 0.5rem;
                margin: 0.5rem;
                border: 1px solid black;
                border-radius: 0.5rem;
                background-color: #f1f1f1;
            }
            .right-div {
                padding: 2rem;
            }
            .prof {
                @media (max-width: 600px) {
                    .left-div {
                        width: 100%;
                    }
                    .right-div {
                        width: 100%;
                        clear: both;
                    }
                }
            }
            `}</style>
        </div>
    );
}
