const DescriptionCard = (props) => {
    return (
        <div className="description-card">
            <h3>{props.label}: </h3>
            <p>{props.description}</p>
        </div>
    )
}

export default DescriptionCard;