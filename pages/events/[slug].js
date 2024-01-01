import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config";

const EventPage = ({ evt }) => {
  const deleteEvent = (e) => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className="relative pt-10">
        <div className="absolute flex right-8 top-0">
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className="ml-5 text-red-500" onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {evt.name} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className="mb-5">
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h4>Performers:</h4>
        <p>{evt.performers}</p>
        <h4>Description:</h4>
        <p>{evt.description}</p>
        <h4>Venue: {evt.venue}</h4>
        <p>{evt.address}</p>

        <Link href="/events" className="block mt-10">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({ params: { slug: evt.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
