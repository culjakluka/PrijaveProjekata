import { useEffect, useState } from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './RadioButtonInput.css';

const RadioButtonInput = ({ name, simpleQuestionValue, setSelectionState, initialValue }) => {
    const [selection, setSelection] = useState('');

    const handleRadioChange = (value) => {
        switch (value) {
            case 'da':
                setSelectionState(true);
                sessionStorage.setItem(name, 'da');
                break;
            case 'ne':
                setSelectionState(false);
                sessionStorage.setItem(name, 'ne');
                break;
            default:
                break;
        }
        setSelection(value);
    };

    useEffect(() => {
        let savedValue = sessionStorage.getItem(name);

        if (savedValue) {
            setSelection(savedValue);
            if (savedValue === 'da') {
                setSelectionState(true);
            } else if (savedValue === 'ne') {
                setSelectionState(false);
            } else {
                console.log("Radio button loading error");
            }
        } else if (initialValue !== undefined) {
            if (initialValue === true) {
                setSelection('da');
                setSelectionState(true);
            } else if (initialValue === false) {
                setSelection('ne');
                setSelectionState(false);
            } else {
                console.log("Radio button loading error");
            }
        }
    }, [initialValue]);

    return (
        <div className={styles.radioButtonContainer}>
            <p className={styles.simpleQuestionText}>{simpleQuestionValue}</p>
            <Form>
                <Form.Check
                    type="radio"
                    id="default-radio-da"
                    label="Da"
                    value="da"
                    name="radioGroup"
                    checked={selection === 'da'}
                    onChange={() => handleRadioChange('da')}
                />
                <Form.Check
                    type="radio"
                    id="default-radio-ne"
                    label="Ne"
                    value="ne"
                    name="radioGroup"
                    checked={selection === 'ne'}
                    onChange={() => handleRadioChange('ne')}
                />
            </Form>
        </div>
    );
};

export default RadioButtonInput;
