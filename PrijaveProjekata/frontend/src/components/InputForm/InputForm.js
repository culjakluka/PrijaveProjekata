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
import TextInputWithoutTitle from '../TextInputWithoutTitle/TextInputWithoutTitle'

const InputForm = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const handleClick = () => {
        logout()
    }
    

    // 1st DropdownMenu's data
    let data = ["Pero Peric", "Ivo Ivic", "Mijo Mijic", "Mario Maric"]

    // questions - input form
    let questions = [
        "1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a",
        "2. Naziv, akronim i rok za prijavu",
        "3. Sažetak projekta (do 200 znakova)",
        "4. Poveznica za natječaj",
        "5. Koordinator projekta",
        "6. Ostali partneri na projektu",
        "7. Proračun projekta",
        "8. Jesu li u okviru projekta planirana nova radna mjesta",
        "9. Navedite ostale osobe koje će biti uključene u provedbu projekta"
    ]
    


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


                <Question questionText={questions[0]}/>
                <TextInput label={"IME I PREZIME"} name="ime_prezime"/>
                <TextInput label={"TITULA"} name={"titula"}/>
                <TextInput label={"ZAVOD (ODSJEK)"} name={"email"}/>

                <Question questionText={questions[1]}/>
                <TextInput label={"NAZIV PROJEKTA"} name={"naziv_projekta"}/>
                <TextInput label={"AKRONIM PROJEKTA"} name={"akronim_projekta"}/>
                <TextInput label={"ROK ZA PRIJAVU PROJKETA"} name={"rok_za_prijavu_projekta"}/>


                <Question questionText={questions[2]}/>
                <TextInputWithoutTitle name={"sazetak"}/>

                <Question questionText={questions[3]}/>
                <TextInput label={"LINK NA STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA"} name={"link_na_stranicu_s_dokumentacijom"}/>

                <Question questionText={questions[4]}/>
                <TextInput label={"PRIJAVITELJ PROJEKTA/VODEĆI PARTNER (institucija, tvrtka...)"} name={"prijavitelj_projekta"}/>

                <Question questionText={questions[5]}/>
                <TextInputWithoutTitle name={"ostali_partneri_na_projektu"}/>

                <Question questionText={questions[6]}/>
                <TextInput label={"UKUPNA VRIJEDNOST(ukoliko trenutno nije poznat točan iznos, navesti okviran iznos"} name={"ukupna_vrijednost_projekta"}/>
                <TextInput label={"DIO PRORAČUNA KOJI PRIPADA FESB-u(vrijednost ili postotak ukupne vrijednosti"} name={"dio_proracuna_fesb"}/>

                <Question questionText={questions[7]}/>
                <RadioButtonInput simpleQuestionValue={"no_value"}/>


                <Question questionText={questions[8]}/>
                <SpecialInput />
                </div>
        </div>
    )

} 

export default InputForm