    import React, {useState, useEffect} from 'react'
    import Style from './ProjectSummary.module.css'
import { ca } from 'date-fns/locale';

    const ProjectSummary = ({name, initialValue, length, setSpecificState}) => {

        // if initialValue is not provided, set it to be empty string
        const[projectSummary, setProjectSummary] = useState("");
        const[maxLength, setMaxlength] = useState(length || "200")

        const handleInput = (event) => {
            const newValue = event.target.value
            setProjectSummary(newValue);
            setSpecificState(newValue);

            try{
                sessionStorage.setItem(name, newValue)
            } catch(error) {
                console.log("Error while saving value in sessionStorage in ", name, " error: ", error);
                window.alert("Error while saving value in sessionStorage in ", name, " error: ", error);
            }
        }

        useEffect(() => {
            try{
                const savedValue = sessionStorage.getItem(name);

                // if value is available in sessionStorage load it
                if(savedValue) {
                    setProjectSummary(savedValue);
                    setSpecificState(savedValue);
                }
            } catch(error) {
                console.log("Error while getting value from sessionStorage in ", name, " error: ", error);
                window.alert("Error while getting value from sessionStorage in ", name, error);
            }
           
        }, [])

        useEffect(() => {
            try{
                const savedValue = sessionStorage.getItem(name);

                // if value is available in sessionStorage load it
                if(savedValue) {
                    setProjectSummary(savedValue);
                    setSpecificState(savedValue);
                } else if(initialValue) {
                    setProjectSummary(initialValue);
                    setSpecificState(initialValue);
                } else {
                    console.log("savedValue and initialValue not available")
                }
            } catch(error) {
                console.log("Error while getting value from sessionStorage in ", name, " error: ", error);
                window.alert("Error while getting value from sessionStorage in ", name, error);
            }
           
        }, [initialValue])



        return (  
            <div className={Style.ProjectSummaryContainer}>
                <textarea className={Style.ProjectSummaryInput} maxLength={maxLength} type="text" onChange={handleInput} value={projectSummary} placeholder="opis projekta..." ></textarea>
            </div>
        );
    }
    
    export default ProjectSummary;