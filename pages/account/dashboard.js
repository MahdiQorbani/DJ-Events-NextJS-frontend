import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import DashboardEvent from "@/components/DashboardEvent";
import { parseCookies } from "@/helpers";
import { API_URL } from "@/config";

export default function DashboardPage({ events, token }) {
  const router = useRouter();
  const { data } = events;

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div>
        <h1>Dashboard</h1>
        <h3 className="text-lg font-bold text-red-500">My Events</h3>

        {data.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
