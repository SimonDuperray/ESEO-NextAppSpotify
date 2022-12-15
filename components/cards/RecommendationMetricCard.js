const RecommendationMetricCard = (props) => {
    return (
        <div id={props.label} className="recommendation-metric-card">
            <p>{props.label}</p>
        </div>
    );
};

export default RecommendationMetricCard;