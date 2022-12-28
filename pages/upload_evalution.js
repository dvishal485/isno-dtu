import React from "react";
import Layout from "components/Layout";
import useUser from "lib/useUser";
import useStudents from "lib/useStudents";
import Batches from "components/Batches";

import Link from "next/link";

// Make sure to check https://nextjs.org/docs/basic-features/layouts for more info on how to use layouts
export default function EvalutionSheetUpload() {
    const { user } = useUser({
        redirectTo: "/login",
    });
    const { students, error, mutate: refresh_list, isValidating } = useStudents(user);

    const handleEvalSheet = (event) => {
        console.log("handleEvalSheet");
        event.preventDefault();
        const file = event.target.csvFile.files[0];
        const formData = new FormData();
        // Append the file to the FormData object
        formData.append("file", file);

        fetch("/api/eval_upload", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Layout>
            {user && user.isLoggedIn && (<>
                <h1>Evaluation Sheet Upload</h1>
                <form
                    style={{
                        alignContent: "center",
                        margin: "2%",
                        padding: "1%",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                    onSubmit={handleEvalSheet}>

                    <label htmlFor="csvFile">Evaluation sheet</label>
                    <input
                        style={{
                            margin: "5%",
                            padding: "1%",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            width: "50%",
                        }}
                        type="file" id="csvFile" accept=".csv" />
                    <button type="submit">Upload</button>
                </form>

            </>)}
        </Layout>
    )
}
