import React, { useState } from 'react';
import Style from '../SpecialInputSecondInputForm.module.css'

import SpecialInputProject from '../SpecialInputProject/SpecialInputProject';

const SpecialInputProjectContainer = ({ addNewProjectProp }) => {
  return (
    <div className="special-input-project-container">
      <SpecialInputProject addNewProjectProp={addNewProjectProp} />
    </div>
  );
};

export default SpecialInputProjectContainer;