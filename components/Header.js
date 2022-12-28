import Link from "next/link";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import fetchJson from "lib/fetchJson";

export default function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <header>
      <nav>
        <ul>

          <li>
            <Link href="/">
              <span>Home</span>
            </Link>
          </li>
          {user?.isLoggedIn === false && (
            <li>
              <Link href="/login">
                <span>Login</span>
              </Link>
            </li>
          )}
          {user?.isLoggedIn === true && (
            <>
              <li>
                <Link href="/students">
                  <span>
                    Students List
                  </span>
                </Link>
              </li>
              <li>
                <Link className='linker' href="/upload_evalution">
                  <span>
                    Upload evaluation sheet
                  </span>
                </Link>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/api/logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    mutateUser(
                      await fetchJson("/api/logout", { method: "POST" }),
                      false,
                    );
                    router.push("/login");
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
          <li>
            <Link href="/">
              <Image
                src="/ISNO-bg-32px.png"
                width="32"
                height="32"
                alt=""
              />
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
          align-items: center;
        }

        li:first-child {
          margin-left: auto;
        }

        a,
        span {
          color: #fff;
          text-decoration: none;
          margin-right: .3em;
          vertical-align: middle;
          overflow: hidden;
          padding-right: 0.3rem;
        }
        

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header >
  );
}
