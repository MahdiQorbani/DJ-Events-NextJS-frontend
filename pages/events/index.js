import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const EventsPage = ({ events }) => {
  console.log(events);

  return (
    <Layout>
      <h1 className="text-center md:text-start">Events</h1>
      {events.length === 0 && <h4>No events to show</h4>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
