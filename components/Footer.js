import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 mb-10 text-center">
      <p className="footer-item">Copyright &copy; DJ Events 2023</p>
      <p className="footer-item">
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
