import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events_23");
  if (!response.ok) {
    //setError("Fetching events failed.");
    // return { isError: true, message: "Could not fetch events." };
    throw { message: "Could not fetch events." };
  } else {
    // const resData = await response.json();
    //setFetchedEvents(resData.events);
    // return resData.events;
    return response;
  }
}
