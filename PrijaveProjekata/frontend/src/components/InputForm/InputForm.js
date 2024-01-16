import { useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import React from 'react'
import TextInput from '../TextInput/TextInput'
import style from './InputForm.css'
import DropdownMenuInput from '../DropdownMenuInput/DropdownMenuInput'
import RadioButtonInput from '../RadioButtonInput/RadioButtonInput'
import { useAuthContext } from '../../hooks/useAuthContext'

const InputForm = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    

    // 1st DropdownMenu's data
    let data = ["Pero Peric", "Ivo Ivic", "Mijo Mijic", "Mario Maric"]

    return(
        <div className="input-container">
            {user && (
                <div className='logout'>
                    <span>{user.username}</span>
                    <button onClick={handleClick}>Log out</button>
                </div>
            )}
            <div className="input-form">
                <h2 id="document-title">TRAŽENJE SUGLASNOSTI ZA PRIJAVU PROJEKTA</h2>
                <p className="question">1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a</p>
                <TextInput label="Ime i prezime" name="ime_prezime"/>
                <TextInput label="Titula*" name="titula"/>
                <TextInput label="Zavod(odsjek)*" name="zavod"/>
                <TextInput label="E-mail*" name="email"/>
                <TextInput label="Mobitel*" name="mobitel"/>
                <DropdownMenuInput label="Dropdownmenu 1" data={data}/>
                <RadioButtonInput/>
            </div>
        </div>
    )

} 

export default InputForm