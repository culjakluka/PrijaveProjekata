import { createContext, useReducer } from 'react';

export const FirstDataContext = createContext()

export const firstDataReducer = (state, action) => {
    switch (action.type){
        case 'SET_FIRSTDATA':
            return {
                firstDataSets: action.payload
            }
        case 'CREATE_FIRSTDATA':
            return {
                firstDataSets: [action.payload, ...state.firstDataSets]
            }
        case 'DELETE_FIRSTDATA':
            return {
                firstDataSets: state.firstDataSets.filter((f) => f._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const FirstDataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(firstDataReducer, {
        firstDataSets: null
    });


    return (
        <FirstDataContext.Provider value={{...state, dispatch}}>
            { children }
        </FirstDataContext.Provider>
    )
}