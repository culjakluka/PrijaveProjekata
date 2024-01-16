import { useEffect } from 'react' ;
import { useFirstDataContext } from '../hooks/useFirstDataContext';



// components
import FirstDataDetails from '../components/FirstDataDetails';
import FirstDataForm from '../components/firstDataForm';
import InputFormType1 from '../components/InputForm/InputForm';
import InputForm from '../components/InputForm/InputForm';
import LoginForm from '../components/LoginForm/LoginForm';

const Home = () => {
    const {firstDataSets, dispatch} = useFirstDataContext()
    let labelName = "Test label name"



    {/*useEffect(() => {
        const fetchFirstDataSets = async () => {
            const response = await fetch('/api/firstDataSets');
            const json = await response.json();

            if(response.ok){
               dispatch({type: 'SET_FIRSTDATA', payload: json});
            }
        }

        fetchFirstDataSets();
    }, [dispatch])*/}

    return (
        <div className="home">
            {/*<div className="firstDataSets">
                {firstDataSets && firstDataSets.map((firstData) => (
                    <FirstDataDetails key={firstData._id} firstData={firstData}/>
                ))}
                </div> 
            <FirstDataForm />*/}
            <LoginForm />    
        </div>

    )
}

export default Home;