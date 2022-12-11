const MetricCard = (props) => {
    const renderColor = () => {
        return 'green';
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