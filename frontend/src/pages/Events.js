import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  // const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  // const events = data.events;
  // return (
  //   <>
  //     <EventsList events={events} />
  //   </>
  // );

  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //setError("Fetching events failed.");
    // return { isError: true, message: "Could not fetch events." };
    // throw { message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // return response;
    const resData = await response.json();
    //setFetchedEvents(resData.events);
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents()
  })
}
