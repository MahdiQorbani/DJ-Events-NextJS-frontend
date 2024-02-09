import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config";

const EventPage = ({ evt }) => {
  const router = useRouter();

  if (router.isFallback) {
    return;
  }

  const { attributes: thisEvent } = evt;

  return (
    <Layout>
      <div className="relative pt-10">
        <span>
          {new Date(thisEvent.date).toLocaleDateString("en-US")} at{" "}
          {thisEvent.time}
        </span>
        <h1>{thisEvent.name}</h1>
        <ToastContainer />
        {thisEvent.image.data && (
          <div className="mb-5">
            <Image
              src={thisEvent.image.data.attributes.url}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
              alt=""
            />
          </div>
        )}
        <h4>Performers:</h4>
        <p>{thisEvent.performers}</p>
        <h4>Description:</h4>
        <p>{thisEvent.description}</p>
        <h4>Venue: {thisEvent.venue}</h4>
        <p>{thisEvent.address}</p>

        <Link href="/events" className="block mt-10">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?sort=date:asc&populate=*`);
  const { data: events } = await res.json();

  const paths = events
    ? events.map(({ attributes: evt }) => ({
        params: { slug: evt.slug },
      }))
    : [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const { data: events } = await res.json();

  if (!events) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  const evt = events[0];

  return {
    props: {
      evt,
    },
    revalidate: 1,
  };
}
