export default function Form({ errorMessage, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Username</span>
        <input disabled={loading} type="text" name="username" required />
      </label>

      <label>
        <span>Password</span>
        <input disabled={loading} type="password" name="password" required />
      </label>
      <button disabled={loading} type="submit">Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        button,
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  );
}
