import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
    const router = useRouter();
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList events={events} />
        </>
    );
}

export async function getStaticProps() {
    const events = getAllEvents();

    return {
        props: {
            events,
        },
        revalidate: 60, //regenerate in every 60 seconds
    };
}

export default AllEventsPage;
