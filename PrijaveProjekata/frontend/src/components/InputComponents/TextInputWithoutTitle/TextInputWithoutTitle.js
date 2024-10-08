import React, { useEffect, useState } from "react";
import "./TextInputWithoutTitle.css";

// component TextInput takes "label" and "name" as props
const TextInputWithoutTitle = ({ name, setSpecificState, initialValue }) => {
  // useState to manage the input value state
  const [inputValue, setInputValue] = useState("");

  // function to handle input changes
  const handleInputChange = (event) => {
    // update the inputValue state as the input changes
    setInputValue(event.target.value);
    setSpecificState(event.target.value);

    sessionStorage.setItem(name, event.target.value);
  };

  // useEffect to retrive the value from sessionStorage when the component mounts or 'name' prop changes
  useEffect(() => {
    // retrive the value from the local storage if it exists for the provided 'name' key
    const storedValue = sessionStorage.getItem(name);

    // set inputValue to the retrived value if it exists
    if (storedValue) {
      setInputValue(storedValue);
      setSpecificState(storedValue);
    }
  }, []);

  // loading initial value
  useEffect(() => {
    const savedValue = sessionStorage.getItem(name);

    if (savedValue) {
      // if value is available in session storage, take if from there
      setInputValue(savedValue);

      // callback that updates state in parent component
      setSpecificState(savedValue);
    } else if (initialValue) {
      setInputValue(initialValue);

      // callback that updates state in parent component
      setSpecificState(initialValue);

      sessionStorage.setItem(name, initialValue);
    }
  }, [initialValue]);

  // useEffect to save input value to local session storage whenever it changes
  useEffect(() => {
    // store the input value in local storage with the 'name' as the key
    sessionStorage.setItem(name, inputValue);
  }, [inputValue, name]); // re-run this effect when 'inputValue' or 'name' changes

  return (
    <div className="text-input-without-title">
      <input
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="prazno..."
        type="text"
      ></input>
    </div>
  );
};

export default TextInputWithoutTitle;
