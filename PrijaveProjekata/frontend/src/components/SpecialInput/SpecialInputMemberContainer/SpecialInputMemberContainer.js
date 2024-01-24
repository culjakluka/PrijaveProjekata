import React, { useState } from 'react';

import '../SpecialInput.css'
import SpecialInputMember from '../SpecialInputMember/SpecialInputMember';

const SpecialInputMemberContainer = () => {

    return (
        <div className='special-input-member-container'>
            <SpecialInputMember/>
            <SpecialInputMember/>
        </div>
    );
}
 
export default SpecialInputMemberContainer;