import { useState, useEffect } from "react";
import "./DropdownMenuInput.css";

const DropdownMenuInput = ({ name, label, data, setSpecificState, isDepartment, initialValue }) => {
  const [selectionValue, setSelectionValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;
    setSpecificState(selectedValue);
    setSelectionValue(selectedValue);

    // Save selection in sessionStorage
    sessionStorage.setItem(name, selectedValue);
  };

  useEffect(() => {
    setOptions(data);

    // Check if the selection value is stored in sessionStorage
    const selectionValueSessionStorage = sessionStorage.getItem(name);

    if (selectionValueSessionStorage) {
      setSelectionValue(selectionValueSessionStorage);
      setSpecificState(selectionValueSessionStorage);
    } else if (initialValue) {
      const matchingOption = data?.find(option => option === initialValue || (isDepartment && option.split(' - ')[0] === initialValue));
      if (matchingOption) {
        setSelectionValue(matchingOption);
        setSpecificState(matchingOption);
      }
    }
  }, [data, initialValue, isDepartment, name, setSpecificState]);

  return (
    <div className="dropdown-menu-container">
      <div className />
      <label>{label}</label>
      <select value={selectionValue} onChange={handleSelectionChange}>
        <option value="">Odaberite opciju</option>
        {options?.map((member, index) => (
          <option key={index} value={member}>
            {isDepartment ? member.split(' - ')[0] : member}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenuInput;
