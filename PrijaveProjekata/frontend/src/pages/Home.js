import { useEffect } from 'react' ;
import { useFirstDataContext } from '../hooks/useFirstDataContext';

// components
import FirstDataDetails from '../components/FirstDataDetails';
import FirstDataForm from '../components/firstDataForm';

const Home = () => {
    const {firstData, dispatch} = useFirstDataContext()

    useEffect(() => {
        const fetchFirstDataSets = async () => {
            const response = await fetch('/api/firstData');
            const json = await response.json();

            if(response.ok){
               dispatch({type: 'SET_FIRSTDATA', payload: json});
            }
        }

        fetchFirstDataSets();
    }, [])

    return (
        <div className="home">
            <div className="firstDataSets">
                {firstData/*zasto ne sets?*/ && firstData/*zasto ne sets?*/.map((firstData) => (
                    <FirstDataDetails key={firstData._id} firstData={firstData}/>
                ))}
            </div>
            <FirstDataForm />
        </div>
    )
}

export default Home;