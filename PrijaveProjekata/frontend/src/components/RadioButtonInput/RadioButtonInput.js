import {useState} from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';

const RadioButtonInput = () => {

    const [selection, setSelection] = useState('')

    const handleRadioChange = (value) => {
        setSelection(value)
    }

    return(
            <Form>
                <Form.Check
                type='radio'
                id="default-radio"
                label="Da"
                value="da"
                name="radioGroup"
                checked={selection === 'da'}
                onChange={() => handleRadioChange('da')}
                />

                <Form.Check
                type='radio'
                id="default-radio"
                label="Ne"
                value="ne"
                name="radioGroup"
                checked={selection === 'ne'}
                onChange={() => handleRadioChange('ne')}
                />                    
           </Form>
    )
}

export default RadioButtonInput