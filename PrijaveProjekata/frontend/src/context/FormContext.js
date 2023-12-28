import React, {createContext, useState, useContext, useEffect} from 'react';


// creating FormContext to manage form state
const FormContext = createContext();

// custom hook to use the FormContext
export const useFormContext = () => {
    return useContext(FormContext);
}

// provider component to manage form state
export const FormProvider = ({children}) => {
    // initial form state
    const initialState = {
        ime_prezime: '',
        titula: '',
        zavod: '',
        email: '',
        mobitel: ''
    };

    // state to manage form data -> initialized to initialState data
    const [formData, setFormData] = useState(initialState);

    // load data from sessionStorage on initial render 
    // in storage, data is in the form key-value
    useEffect(() => {
        // load save data into storeData
        const storedData = sessionStorage.getItem('formData')
        if(storedData) {
            setFormData(JSON.parse(storedData))
        }
    }, []);

    // update sessionStorage whenever formData changes
    useEffect(() => {
        sessionStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    // function to update form data
    const updateFormData = (name, value) => {
        setFormData({...formData, [name] : value});
    }
 
    // context value to provide
    const contextValue = {
        formData,
        updateFormData
    };

    return(
        <FormContext.Provide value={contextValue}>{children}</FormContext.Provide>
    );

}