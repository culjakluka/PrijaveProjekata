import { useEffect, useState } from 'react' ;

// components
import FirstDataDetails from '../components/FirstDataDetails';

const Home = () => {
    const [firstDataSets, setFirstDataSets] = useState(null);

    useEffect(() => {
        const fetchFirstDataSets = async () => {
            const response = await fetch('/api/firstData');
            const json = await response.json();

            if(response.ok){
                setFirstDataSets(json);
            }
        }

        fetchFirstDataSets();
    }, [])

    return (
        <div className="home">
            <div className="firstDataSets">
                {firstDataSets && firstDataSets.map((firstData) => (
                    <FirstDataDetails key={firstData._id} firstData={firstData}/>
                ))}
            </div>
        </div>
    )
}

export default Home;