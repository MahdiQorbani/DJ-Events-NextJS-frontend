import Pagination from "@/components/common/Pagination";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";

const EventsPage = ({ events, page, total }) => {
  if (!events)
    return (
      <Layout>
        <h1 className="text-center md:text-start">Upcoming Events</h1>
        <h4>No events to show</h4>
      </Layout>
    );
  return (
    <Layout>
      <h1 className="text-center md:text-start">Events</h1>
      {events.length === 0 && <h4>No events to show</h4>}

      {events.map(({ attributes: evt }) => (
        <EventItem key={evt.slug} evt={evt} />
      ))}
      <Pagination total={total} page={page} />
    </Layout>
  );
};

export default EventsPage;

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate Start Page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //Fetch Events
  const res = await fetch(
    `${API_URL}/api/events?sort=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&pagination[withCount]=true&populate=*`
  );
  const { data: events, meta } = await res.json();

  const total = meta ? meta.pagination.total : 0;

  return {
    props: { events, page: +page, total },
  };
}
