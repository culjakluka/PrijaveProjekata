import React, { useState } from 'react';
import SpecialInputMember from '../SpecialInputMember/SpecialInputMember';

// style
import Style from '../SpecialInputSecondInputForm.module.css';

const SpecialInputMemberContainer = ({ addProjectMember }) => {

    return (
        <div className={Style.SpecialInputMemberContainer}>
            <SpecialInputMember addProjectMember={addProjectMember} />
        </div>
    );
}

export default SpecialInputMemberContainer;
