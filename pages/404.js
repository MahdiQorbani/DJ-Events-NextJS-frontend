import Layout from "@/components/Layout";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <Layout titile="Page Not Found">
      <div className="text-center mb-[200px] mt-[100px]">
        <div className="text-3xl flex justify-center space-x-1">
          <FaExclamationTriangle />
          <h1>404</h1>
        </div>
        <h4>Sorry, there is nothing here to show!</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
