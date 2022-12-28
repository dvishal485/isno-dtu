import React from "react";
import Layout from "components/Layout";
import StudentProfile from "components/StudentProfile";
import { useRouter } from 'next/router';
import useUser from "lib/useUser";


export default function StudentProfilePage() {
    const { user } = useUser({
        redirectTo: "/login",
    });
    const router = useRouter();
    const { query } = router;
    return (
        <Layout>
            <h1>Student Profile Page</h1>
            {user && user.isLoggedIn && (<> <StudentProfile user={user} roll_no={query.roll_no} /> </>) || (<><strong>Please login to the portal first to prevent any unauthorised access</strong></>)}
        </Layout>
    );
}