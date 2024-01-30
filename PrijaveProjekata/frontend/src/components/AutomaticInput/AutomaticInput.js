const AutomaticInput = ({label, value}) => {
    return (  
        <div id="automatic-input-container">
            <div id="automatic-input">
                <label>{label}</label>
                <div>{value}</div>
            </div>
        </div>
    );
}
 
export default AutomaticInput;