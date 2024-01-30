import {useState} from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './RadioButtonInput.css'

const RadioButtonInput = ({simpleQuestionValue, setSelectionState}) => {

    const [selection, setSelection] = useState('')

    const handleRadioChange = (value) => {
        switch (value) {
            case 'da':
                setSelectionState(true)
                break;
            case 'ne':
                setSelectionState(false)
            default:
                break;
        }
        setSelection(value)
    }

    return(
        <div className="radio-button-container">
            <p className="simple-question-text">{simpleQuestionValue}</p>
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
        </div>
    )
}

export default RadioButtonInput