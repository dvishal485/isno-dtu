import useSWR from "swr";

export default function useStudents(user) {
    const { data: students, error, mutate, isValidating } = useSWR(user?.isLoggedIn ? `/api/database` : null, { refreshWhenHidden: false, refreshWhenOffline: false, revalidateOnFocus: false });
    return { students, error, mutate, isValidating};
}
