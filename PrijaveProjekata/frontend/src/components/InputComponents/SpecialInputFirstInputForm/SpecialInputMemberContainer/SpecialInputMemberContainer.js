import React from 'react';
import Style from '../SpecialInputFirstInputForm.module.css'; // Replace with the correct path
import SpecialInputMember from '../SpecialInputMember/SpecialInputMember';

const SpecialInputMemberContainer = ({ addProjectMember }) => {
  return (
    <div className={Style.SpecialInputMemberContainer}>
      <SpecialInputMember addProjectMember={addProjectMember} />
    </div>
  );
};

export default SpecialInputMemberContainer;