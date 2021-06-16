import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import CommonButton from "../../components/common/common-button";
import CommonErrorAlert from "../../components/common/common-error-alert";

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

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

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

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

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList events={filteredEvents} />
        </>
    );
}

export default FilteredEventsPage;
