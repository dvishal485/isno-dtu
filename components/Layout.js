import Head from "next/head";
import Header from "components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ISNO Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ISNO Portal - Online platform to manage the students' data" />
        <meta name="og:title" content="ISNO Portal" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }

        .container {
          max-width: 85%;
          margin: 1.5rem auto;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        
        a {
          text-decoration: none;
        }

        table {
          max-width: 100%;
          width: 100%;
          border-collapse: collapse;
        }
        @media (orientation: portrait) {
          /* Hide the third column when the screen is in portrait mode */
          table td:nth-child(4),
          table th:nth-child(4) {
            display: none;
          }
          table td:nth-child(5),
          table td:nth-child(1),
          table th:nth-child(1),
          table th:nth-child(5) {
            width: 25%;
            max-width: 30%;
          }
        }
        td, th {
          border: 1px solid #ddd;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        tr:hover {
          background-color: #ddd;
        }

        th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #4caf50;
          color: white;
        }

        /* Style for mobile devices */
        @media only screen and (max-width: 600px) {
          td, th {
            font-size: 12px;
          }
        }

        /* Style for laptops */
        @media only screen and (min-width: 601px) {
          td, th {
            font-size: 14px;
          }
        }
      `}</style>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
