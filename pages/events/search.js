import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const SearchPage = ({ events }) => {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events"> {"<"} Go Back</Link>
      <h1 className="text-center md:text-start mt-5">
        Search Results for {router.query.term}
      </h1>
      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(({ attributes: evt }) => (
        <EventItem key={evt.slug} evt={evt} />
      ))}
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $eq: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },

          {
            venue: {
              $containsi: term,
            },
          },
          {
            slug: {
              $containsi: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const { data: events } = await res.json();

  return {
    props: { events },
  };
}
