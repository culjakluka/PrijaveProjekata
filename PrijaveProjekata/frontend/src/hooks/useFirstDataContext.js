import { FirstDataContext } from "../context/FirstDataContext";
import { useContext } from "react";

export const useFirstDataContext = () => {
    const context = useContext(FirstDataContext);

    if (!context) {
        throw Error('useFirstDataContext must be used inside a FirstDataContextProvider');
    }

    return context;
}