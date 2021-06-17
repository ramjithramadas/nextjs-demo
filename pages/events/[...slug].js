import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import CommonButton from "../../components/common/common-button";
import CommonErrorAlert from "../../components/common/common-error-alert";

function FilteredEventsPage(props) {
    const router = useRouter();

    // const filterData = router.query.slug;

    // if (!filterData) {
    //     return <p className="center">Loading...</p>;
    // }

    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    if (props.hasError) {
        return (
            <>
                <CommonErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </CommonErrorAlert>
                <div className="center">
                    <CommonButton link="/events">Show All Events</CommonButton>
                </div>
            </>
        );
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <CommonErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </CommonErrorAlert>
                <div className="center">
                    <CommonButton link="/events">Show All Events</CommonButton>
                </div>
            </>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList events={filteredEvents} />
        </>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // converting string to integer
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: { hasError: true },
            // notFound:true
            // redirect:{
            //     destination: "/error"
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
}

export default FilteredEventsPage;
