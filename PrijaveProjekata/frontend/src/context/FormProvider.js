import React from 'react';
import { FormProvider } from './FormContext';
import InputForm from '../components/InputForm/InputForm';

const App = () => {
    return (
      <FormProvider>
        <InputForm />
        {/* Other components */}
      </FormProvider>
    );
  };
  
  export default App;