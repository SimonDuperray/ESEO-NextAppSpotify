const MetricsAnalyzer = (props) => {
    const renderMetrics = () => {
        for(let i=0; i<props.metrics.length; i++) {
            return (
                <p key={props.metrics[i]['index']}>{props.metrics[i]['danceability']}</p>
            )
        }
    }
    return (
        <div>
            <h5>Metrics are dispayed just below.</h5>
            {
                JSON.stringify(props.metrics[0])
            }
            {
                renderMetrics()
            }
        </div>
    )
}

export default MetricsAnalyzer;