import { useState, useEffect } from "react";
import "./DropdownMenuInput.css";

const DropdownMenuInput = ({ name, label, data, setSpecificState, isDepartment }) => {
  const [selectionValue, setSelectionValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleSelectionChange = (event) => {
    setSpecificState(event.target.value);

    setSelectionValue(event.target.value);
    // save selection in sessionStorage
    sessionStorage.setItem(name, event.target.value);
  };

  useEffect(() => {
    setOptions(data);

    // check if the selection value is stored in storage
    const selectionValueSessionStorage = sessionStorage.getItem(name);
    // if it is stored, load it
    if (selectionValueSessionStorage) {
      setSelectionValue(selectionValueSessionStorage);
      setSpecificState(selectionValueSessionStorage); 
    }
  }, [data]);

  return (
    <div className="dropdown-menu-container">
      <div className />
      <label>{label}</label>
      <select value={selectionValue} onChange={handleSelectionChange}>
        <option value="">Odaberite opciju</option>
        {isDepartment ? options.map(
          // takes all the data from "data" and maps it
          // (data that we can take of each memeber of data) => (html element and us of data's data)
          (member, index) => (
            <option key={index} value={member}>
              {member.split(' - ')[0]}
            </option>
          )
        ) :
        options.map(
          // takes all the data from "data" and maps it
          // (data that we can take of each memeber of data) => (html element and us of data's data)
          (member, index) => (
            <option key={index} value={member}>
              {member}
            </option>
          )
        )
      }
      </select>
    </div>
  );
};

export default DropdownMenuInput;
