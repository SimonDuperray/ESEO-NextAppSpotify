const DeveloperCard = (props) => {
    return (
        <div className="dev-card">
            <a
                href={props.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
            >
                {props.name}
            </a>
            <p>{props.class}</p>
        </div>
    );
};

export default DeveloperCard;
