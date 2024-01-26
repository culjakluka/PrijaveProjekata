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
import CompletedProject from '../CompletedProject/CompletedProject'

const InputForm = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const generateUniqueId = (name) => `${name}-${Math.random().toString(36).substring(7)}`;

    const[nameSurname, setNameSurname] = useState("");
    const[vocation, setVocation] = useState("");
    const[department, setDepartment] = useState("");
    const[email, setEmail] = useState("");
    const[projectName, setProjectName] = useState("");
    const[projectAcronym, setProjectAcronym] = useState("");
    const[applicationDeadline, setApplicationDeadline ] = useState("");
    const[projectSummary, setProjectSummary] = useState("");
    const[applicationURL, setApplicationURL] = useState("");
    const[projectApplicant, setProjectAplicant] = useState("");
    const[projectPartners, setProjectPartners] = useState("");
    const[totalValue, setTotalValue] = useState("");
    const[fesbValuePart, setFesbValuePart] = useState("");
    const[newEmploymentBoolean, setNewEmployment] = useState("");
    const[projectTeam, setProjectTeam] = useState([]);
    
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
                <TextInput label={"IME I PREZIME"} name="ime_prezime" setSpecificState={setNameSurname}/>
                <TextInput label={"TITULA"} name={"titula" } setSpecificState={setVocation}/>
                <TextInput label={"ZAVOD (ODSJEK)"} name={"zavod"} setSpecificState={setDepartment}/>
                <TextInput label={"E-MAIL"} name={"email"} setSpecificState={setEmail}/>

                <Question questionText={questions[1]}/>
                <TextInput label={"NAZIV PROJEKTA"} name={"naziv_projekta"} setSpecificState={setProjectName}/>
                <TextInput label={"AKRONIM PROJEKTA"} name={"akronim_projekta"} setSpecificState={setProjectAcronym}/>
                <TextInput label={"ROK ZA PRIJAVU PROJKETA"} name={"rok_za_prijavu_projekta"} setSpecificState={setApplicationDeadline}/>


                <Question questionText={questions[2]}/>
                <TextInputWithoutTitle name={"sazetak"} setSpecificState={setProjectSummary}/>

                <Question questionText={questions[3]}/>
                <TextInput label={"LINK NA STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA"} name={"link_na_stranicu_s_dokumentacijom"} setSpecificState={setApplicationURL}/>

                <Question questionText={questions[4]}/>
                <TextInput label={"PRIJAVITELJ PROJEKTA/VODEĆI PARTNER (institucija, tvrtka...)"} name={"prijavitelj_projekta"} setSpecificState={setProjectAplicant}/>

                <Question questionText={questions[5]}/>
                <TextInputWithoutTitle name={"ostali_partneri_na_projektu"} setSpecificState={setProjectPartners}/>

                <Question questionText={questions[6]}/>
                <TextInput label={"UKUPNA VRIJEDNOST(ukoliko trenutno nije poznat točan iznos, navesti okviran iznos"} name={"ukupna_vrijednost_projekta"} setSpecificState={setTotalValue}/>
                <TextInput label={"DIO PRORAČUNA KOJI PRIPADA FESB-u(vrijednost ili postotak ukupne vrijednosti"} name={"dio_proracuna_fesb"} setSpecificState={setFesbValuePart}/>

                <Question questionText={questions[7]} />
                <RadioButtonInput simpleQuestionValue={"no_value"} setSelectionState={setNewEmployment}/>

                <SpecialInput pitanje={questions[8]}/>
                
                <button id="submit-button">SUBMIT</button>
                </div>
        </div>
    )

} 

export default InputForm