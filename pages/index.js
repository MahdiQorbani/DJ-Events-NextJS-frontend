import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const HomePage = ({ events }) => {
  if (!events)
    return (
      <Layout>
        <h1 className="text-center md:text-start">Upcoming Events</h1>
        <h4>No events to show</h4>
      </Layout>
    );
  return (
    <Layout>
      <h1 className="text-center md:text-start">Upcoming Events</h1>
      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(({ attributes: evt }) => (
        <EventItem key={evt.slug} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?sort=date:asc&pagination[limit]=3&populate=*`
  );
  const { data: events } = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
