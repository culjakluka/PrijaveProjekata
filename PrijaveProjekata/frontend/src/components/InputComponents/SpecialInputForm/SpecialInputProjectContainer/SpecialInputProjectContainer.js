import React from 'react';
import SpecialInputProject from '../SpecialInputProject/SpecialInputProject';

//style 
import Style from '../SpecialInputFirstInputForm.module.css'

const SpecialInputProjectContainer = ({ addNewProjectProp }) => {
  return (
    <div className={Style.SpecialInputProjectContainer}>
      <p style={{margin:"10px 0px 0px 5px"}}>DODAJ OSTALE PROJEKTE:</p>
      <SpecialInputProject addNewProjectProp={addNewProjectProp} />
    </div>
  );
};

export default SpecialInputProjectContainer
