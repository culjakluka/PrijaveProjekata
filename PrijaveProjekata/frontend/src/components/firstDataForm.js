import { useState } from 'react'

const FirstDataForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstData = {name, age};

        const response = await fetch('/api/firstData', {
            method: 'POST',
            body: JSON.stringify(firstData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setName('');
            setAge('');
            setError(null);
            console.log('New firstData added.', json);
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
             />

            <label>Dob (u godinama):</label>
            <input 
                type="number"
                onChange={(e) => setAge(e.target.value)}
                value={age}
             />

             <button>Add firstData</button>
             {error && <div className="error">{error}</div>}
        </form>
    )
}

export default FirstDataForm