import { useFirstDataContext } from "../hooks/useFirstDataContext";

// date fns
import formatDistanceToNow  from 'date-fns/formatDistanceToNow';

const FirstDataDetails = ({ firstData }) => {
    const { dispatch } = useFirstDataContext();

    const handleClick = async () => {
        const response = await fetch('/api/firstDataSets/' + firstData._id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (response.ok){
            dispatch({type: 'DELETE_FIRSTDATA', payload: json});
        }
    }

    return (
        <div className="firstData-details">
            <h4>{firstData.name}</h4>
            <p><strong>Age: </strong>{firstData.age}</p>
            <p>{formatDistanceToNow(new Date(firstData.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default FirstDataDetails;