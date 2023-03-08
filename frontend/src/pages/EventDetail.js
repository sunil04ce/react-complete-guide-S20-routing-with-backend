import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  // const params = useParams();
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      {/* <h1>EventDetailPage</h1>
            <p>Event Id : {params.eventId}</p> */}
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  }

  return response;
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete selected event." },
      { status: 500 }
    );
  }

  return redirect("/events");
}
