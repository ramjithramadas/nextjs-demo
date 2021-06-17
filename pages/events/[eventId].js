import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailsPage = (props) => {
    const { event } = props;

    if (!event) {
        return <p className="center">Loading...!!</p>;
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    );
};

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            event,
        },
        revalidate: 30, //regenerate in every 30 seconds
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths,
        fallback: "blocking",
    };
}

export default EventDetailsPage;
