const FirstDataDetails = ({ firstData }) => {
    return (
        <div className="firstData-details">
            <h4>{firstData.name}</h4>
            <p><strong>Age: </strong>{firstData.age}</p>
            <p>{firstData.createdAt}</p>
        </div>
    )
}

export default FirstDataDetails;