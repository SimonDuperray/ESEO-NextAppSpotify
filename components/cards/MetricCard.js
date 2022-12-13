/**
 * Render metric label card with background conditional renderer color
 * The color is mapped to the metric value (often between 0 and 1)
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MetricCard = (props) => {
    /**
     * Return corresponding color mapped to the metric value passed as a parameter
     * @returns {string}
     */
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
                { props.metricLabel }
            </p>
        </div>
    )
}

export default MetricCard;
