import Link from "next/link";
import Search from "./Search";

const Header = () => {
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
          <li>
            <Link className="nav-link" href="/events">
              Events
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
