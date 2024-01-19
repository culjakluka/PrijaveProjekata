import { useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import React from 'react'
import TextInput from '../TextInput/TextInput'
import style from './InputForm.css'
import DropdownMenuInput from '../DropdownMenuInput/DropdownMenuInput'
import RadioButtonInput from '../RadioButtonInput/RadioButtonInput'
import { useAuthContext } from '../../hooks/useAuthContext'
import Question from '../Question/Question'
import SpecialInput from '../SpecialInput/SpecialInput'

const InputForm = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    

    // 1st DropdownMenu's data
    let data = ["Pero Peric", "Ivo Ivic", "Mijo Mijic", "Mario Maric"]

    let question1="1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a"

    return(
        <div className="input-container">
            {user && (
                <div className='logout'>
                    <span>{user.username}</span>
                    <button onClick={handleClick}>Log out</button>
                </div>
            )}
            <div className="input-form">
                <h1 className='document-title'>NAMJERA PRIJAVE</h1>
                <Question questionText={question1}/>
                <TextInput label="Ime i prezime" name="ime_prezime"/>
                <TextInput label="Titula*" name="titula"/>
                <TextInput label="Zavod(odsjek)*" name="zavod"/>
                <TextInput label="E-mail*" name="email"/>
                <TextInput label="Mobitel*" name="mobitel"/>
                <TextInput label="LINK NA STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA S TEKSTOM NATJEČAJA" name="link_na_stranicu"/>
                <DropdownMenuInput label="Dropdownmenu 1" data={data}/>
                <RadioButtonInput simpleQuestionValue="Jesu li u okviru projekta planirana nova radna mjesta?"/>
                <SpecialInput/>
            </div>
        </div>
    )

} 

export default InputForm