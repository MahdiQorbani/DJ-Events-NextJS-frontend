import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1 className="text-center md:text-start">Events</h1>
      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(({ attributes: evt }) => (
        <EventItem key={evt.slug} evt={evt} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?sort=date:asc&populate=*`);
  const { data: events } = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
