import { useEffect } from 'react' ;
import { useFirstDataContext } from '../hooks/useFirstDataContext';



// components
import FirstDataDetails from '../components/FirstDataDetails';
import FirstDataForm from '../components/firstDataForm';
import InputFormType1 from '../components/InputForm/InputForm';
import InputForm from '../components/InputForm/InputForm';
import { FormProvider } from '../context/FormContext';

const Home = () => {
    
    return (
        <FormProvider/>
    )
}

export default Home;