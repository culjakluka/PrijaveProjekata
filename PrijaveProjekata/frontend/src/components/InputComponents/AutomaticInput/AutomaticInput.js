import './AutomaticInput.css'
import { useEffect, useState } from 'react';

const AutomaticInput = ({label, value}) => {
    const [roundedValue, setRoundedValue] = useState(0);

    useEffect(() => {
        setRoundedValue(value.toFixed(2));
    }, [value]);

    return (
        <div id="automatic-input-container">
            <div id="automatic-input">
                <label id="automatic-input-label">{label}</label>
                <div id="automatic-input-value">{roundedValue} €</div>
            </div>
        </div>
    );
}
 
export default AutomaticInput;