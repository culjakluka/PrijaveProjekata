import './AutomaticInput.css'

const AutomaticInput = ({label, value}) => {
    return (
        <div id="automatic-input-container">
            <div id="automatic-input">
                <label id="automatic-input-label">{label}</label>
                <div id="automatic-input-value">{value} €</div>
            </div>
        </div>
    );
}
 
export default AutomaticInput;