import classes from "./common-error-alert.module.css";

function CommonErrorAlert(props) {
    return <div className={classes.alert}>{props.children}</div>;
}

export default CommonErrorAlert;
