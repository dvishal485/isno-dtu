import useSWR from "swr";

export default function useStudentInfo(roll_no, user) {
    const { data: student, error, mutate: StudentMutate, isValidating } = useSWR(user?.isLoggedIn ? `https://dtu-student-api.vercel.app/isno_request?roll_number=${roll_no}` : null, { refreshWhenHidden: false, refreshWhenOffline: false, revalidateOnFocus: false });
    return { student, error, StudentMutate, isValidating };
}