import { useState } from 'react'
import { useFirstDataContext } from '../hooks/useFirstDataContext';

const FirstDataForm = () => {
    const { dispatch } = useFirstDataContext();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstData = {name, age};

        const response = await fetch('/api/firstDataSets', {
            method: 'POST',
            body: JSON.stringify(firstData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok) {
            setName('');
            setAge('');
            setError(null);
            setEmptyFields([]);
            console.log('New firstData added.', json);
            dispatch({type: 'CREATE_FIRSTDATA', payload: json});
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new firstData</h3>

            <label>Ime i prezime:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
             />

            <label>Dob (u godinama):</label>
            <input 
                type="number"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                className={emptyFields.includes('age') ? 'error' : ''}
             />

             <button>Add firstData</button>
             {error && <div className="error">{error}</div>}
        </form>
    )
}

export default FirstDataForm