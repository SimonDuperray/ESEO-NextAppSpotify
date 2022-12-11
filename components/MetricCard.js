const MetricCard = (props) => {
    const renderColor = () => {
        let val = props.metricValue;
        let ret = "yellow";
        if(val >= 0 && val < 0.4) {
            ret = "red";
        } else if(val >= 0.4 && val <= 0.6) {
            ret = "orange";
        } else if(val > 0.6 && val <= 1) {
            ret = "green";
        }
        return ret;
    }

    return (
        <div
            id={props.key}
            className="metric-card"
            style={
                {
                    backgroundColor: renderColor()
                }
            }
        >
            <p>
                { props.metricLabel }: { props.metricValue }
            </p>
        </div>
    )
}

export default MetricCard;