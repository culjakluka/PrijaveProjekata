import { useState } from 'react'
import React from 'react'
import TextInput from '../TextInput/TextInput'
import style from './InputForm.css'

const InputForm = () => {
    


    return(
        <div class="input-container">
            <div class="input-form">
                <h2 id="document-title">TRAŽENJE SUGLASNOSTI ZA PRIJAVU PROJEKTA</h2>
                <p class="question">1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a</p>
                <TextInput label="Ime i prezime" name="ime_prezime"/>
                <TextInput label="Titula*" name="titula"/>
                <TextInput label="Zavod(odsjek)*" name="zavod"/>
                <TextInput label="E-mail*" name="email"/>
                <TextInput label="Mobitel*" name="mobitel"/>
            </div>
        </div>
    )

} 

export default InputForm