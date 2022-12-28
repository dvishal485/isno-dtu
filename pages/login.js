import React, { useState } from "react";
import useUser from "lib/useUser";
import Layout from "components/Layout";
import Form from "components/Form";
import fetchJson, { FetchError } from "lib/fetchJson";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/students",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  return (
    <Layout>
      <div className="login">
        <Form
          errorMessage={errorMsg}
          loading={isLoading}
          onSubmit={async function handleSubmit(event) {
            setLoading(true);
            event.preventDefault();
            const body = {
              username: event.currentTarget.username.value,
              password: event.currentTarget.password.value,
            };

            try {
              mutateUser(
                await fetchJson("/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                }),
                false,
              );
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
              } else {
                console.error("An unexpected error happened:", error);
              }
            } finally { setLoading(false); }
          }}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
}
