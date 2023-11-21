import { createContext, useReducer } from 'react';

export const FirstDataContext = createContext()

export const firstDataReducer = (state, action) => {
    switch (action.type){
        case 'SET_FIRSTDATA':
            return {
                firstData: action.payload
            }
        case 'CREATE_FIRSTDATA':
            return {
                firstData: [action.payload, ...state.firstData]
            }
        default:
            return state
    }
}

export const FirstDataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(firstDataReducer, {
        firstData: null
    });


    return (
        <FirstDataContext.Provider value={{...state, dispatch}}>
            { children }
        </FirstDataContext.Provider>
    )
}