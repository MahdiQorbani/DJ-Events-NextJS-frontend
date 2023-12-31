import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      <div className="my-16 m-auto px-8 max-w-[960px]">{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest DJ and musical events",
  keywords: "music, dj, edm, events",
};

export default Layout;
