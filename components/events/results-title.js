import CommonButton from "../common/common-button";
import classes from "./results-title.module.css";

function ResultsTitle(props) {
    const { date } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <section className={classes.title}>
            <h1>Events in {humanReadableDate}</h1>
            <CommonButton link="/events">Show all events</CommonButton>
        </section>
    );
}

export default ResultsTitle;
