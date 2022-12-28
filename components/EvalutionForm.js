import React from "react";
import { useState } from "react";

export default function EvalutionForm(props) {
    const { subj_code, roll_no, refresh } = props;
    const [cws, setCWS] = useState(props.cws ? props.cws : 0);
    const [mte, setMTE] = useState(props.mte ? props.mte : 0);
    const [prs, setPRS] = useState(props.prs ? props.prs : 0);
    const [ete, setETE] = useState(props.ete ? props.ete : 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/eval_upload', {
            method: 'POST',
            body: `singleEval\n${roll_no},${subj_code},${cws},${mte},${prs},${ete}`
        });
        console.log(res.status);
        const data = await res.json();
        alert(data.message);
        refresh();
    }
    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="marks">CWS</label>
            <input type="number" name="marks" id="marks" value={cws} onChange={(e) => setCWS(e.target.value)} /><br />
            <label htmlFor="marks">MTE</label>
            <input type="number" name="marks" id="marks" value={mte} onChange={(e) => setMTE(e.target.value)} /><br />
            <label htmlFor="marks">PRS</label>
            <input type="number" name="marks" id="marks" value={prs} onChange={(e) => setPRS(e.target.value)} /><br />
            <label htmlFor="marks">ETE</label>
            <input type="number" name="marks" id="marks" value={ete} onChange={(e) => setETE(e.target.value)} /><br />
            <button type="submit">Submit</button><br />
            <style jsx>{`
                form {
                    padding: 0.2rem;
                }
                label {
                    margin: 0.5rem;
                    padding: 0.5rem;
                }
                input {
                    padding: 0.5rem;
                    margin: 0.5rem;
                    border-radius: 0.5rem;
                }
                button {
                    padding: 0.5rem;
                    margin-left: 1rem;
                }
            `}</style>
        </form>
    </>);
}
