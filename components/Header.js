import { useContext } from "react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex flex-col items-center justify-between bg-white h-auto px-8 shadow md:h-16 md:flex-row">
      <div className="nav-link text-red-500 text-xl uppercase">
        <Link className="text-red-500" href="/">
          DJ Events
        </Link>
      </div>

      <Search />

      <nav>
        <ul className="flex flex-col text-center items-center justify-center my-5 md:my-0 md:flex-row">
          <li>
            <Link className="nav-link" href="/events">
              Events
            </Link>
          </li>
          {user ? (
            // if logged in
            <>
              <li>
                <Link className="nav-link" href="/events/add">
                  Add Event
                </Link>
              </li>
              <li>
                <Link className="nav-link" href="/account/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="nav-link btn-secondary btn-icon"
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            //if logged out
            <>
              <li>
                <Link
                  className="nav-link btn-secondary btn-icon"
                  href="/account/login"
                >
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
