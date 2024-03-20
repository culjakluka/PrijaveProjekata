import React from 'react';
import SpecialInputProject from '../SpecialInputProject/SpecialInputProject';

//style 
import Style from '../SpecialInputFirstInputForm.module.css'

const SpecialInputProjectContainer = ({ addNewProjectProp }) => {
  return (
    <div className={Style.SpecialInputProjectContainer}>
      <SpecialInputProject addNewProjectProp={addNewProjectProp} />
    </div>
  );
};

export default SpecialInputProjectContainer
