import { useState, useEffect } from 'react'
import { useLogout } from '../../../hooks/useLogout'
import React from 'react'
import TextInput from '../../InputComponents/TextInput/TextInput'
import style from './FirstInputForm.css'
import DropdownMenuInput from '../../InputComponents/DropdownMenuInput/DropdownMenuInput'
import RadioButtonInput from '../../InputComponents/RadioButtonInput/RadioButtonInput'
import { useAuthContext } from '../../../hooks/useAuthContext'
import Question from '../../InputComponents/Question/Question'
import SpecialInput from '../../InputComponents/SpecialInput/SpecialInput'
import TextInputWithoutTitle from '../../InputComponents/TextInputWithoutTitle/TextInputWithoutTitle'
import CompletedProject from '../../InputComponents/CompletedProject/CompletedProject'
import CalendarInput from '../../InputComponents/CalendarInput/CalendarInput'

const FirstInputForm = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const [nameSurname, setNameSurname] = useState("");
    const [vocation, setVocation] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [projectAcronym, setProjectAcronym] = useState("");
    const [applicationDeadline, setApplicationDeadline ] = useState("");
    const [projectSummary, setProjectSummary] = useState("");
    const [applicationURL, setApplicationURL] = useState("");
    const [projectApplicant, setProjectAplicant] = useState("");
    const [projectPartners, setProjectPartners] = useState("");
    const [totalValue, setTotalValue] = useState(0);
    const [fesbValuePart, setFesbValuePart] = useState(0);
    const [newEmploymentBoolean, setNewEmployment] = useState(null);
    const [projectTeam, setProjectTeam] = useState([]);
    const [firstInputMarker, setFirstInputMarker] = useState(true)
    const [secondInputMarker, setSecondInputMarker] = useState(false)
    const [inputFormData, setInputFormData] = useState({});

    // object will take all data from input
    // later it will be extracted and sent to databases
    
    const handleSubmit = async () => {
        try {
          const response = await fetch('/api/projectInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputFormData),
          });
      
          if (response.ok) {
            const responseData = await response.json();
            
            console.log('Post successful:', responseData);

            window.alert("Post successful");

          } else {
            // handle potentional non-JSON response
            const errorData = await response.json().catch(() => null); 
            // if response is not null
            const errorMessage = errorData ? errorData.error : `Error: ${response.status} ${response.statusText}`;

            console.error("Error posting data: ", errorMessage);
            window.alert(`Error posting data: ${errorMessage}`);

            // printing missing field if there are any and displaying them
            if (errorData && errorData.emptyFields && errorData.emptyFields.length > 0) {

                const missingFieldsMessage = `Missing fields: ${errorData.emptyFields.join(', ')}`;
                console.error(missingFieldsMessage);
                window.alert(missingFieldsMessage);

            }

          }
        } catch (error) {
          console.error('Error posting data2:', error.message);

          window.alert("Error posting data2: ", error.message);

        }
    };

    useEffect(() => {
        setInputFormData({
            userId: user.userId,
            firstInputMarker,
            secondInputMarker,
            nameSurname,
            vocation,
            department,
            email,
            projectTitle,
            projectAcronym,
            applicationDeadline,
            projectSummary,
            applicationURL,
            projectApplicant,
            projectPartners,    
            totalValue,
            fesbValuePart,
            newEmploymentBoolean,
            projectTeam
        })
        console.log(JSON.stringify(inputFormData));
    }, [nameSurname, vocation, department, email, projectTitle, projectAcronym,
        applicationDeadline, projectSummary, applicationURL, projectApplicant,
        projectPartners, totalValue, fesbValuePart, newEmploymentBoolean,
        projectTeam ])

    // callback
    const updateProjectTeam = (projectMembersList) => {
        setProjectTeam(projectMembersList)
    }

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
        "6.Ostali partneri na projektu",
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
                <TextInput label={"NAZIV PROJEKTA"} name={"naziv_projekta"} setSpecificState={setProjectTitle}/>
                <TextInput label={"AKRONIM PROJEKTA"} name={"akronim_projekta"} setSpecificState={setProjectAcronym}/>
                <CalendarInput label={"ROK ZA PRIJAVU PROJEKTA"} name={"rok_za_prijavu_projekta"} setSpecificState={setApplicationDeadline} initialDate={"2024-12-11"}/>

                <Question questionText={questions[2]}/>
                <TextInputWithoutTitle name={"sazetak"} setSpecificState={setProjectSummary}/>

                <Question questionText={questions[3]}/>
                <TextInput 
                    label={"LINK NA STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA"}
                    name={"link_na_stranicu_s_dokumentacijom"}
                    setSpecificState={setApplicationURL}
                />

                <Question questionText={questions[4]}/>
                <TextInput
                    label={"PRIJAVITELJ PROJEKTA/VODEĆI PARTNER (institucija, tvrtka...)"}
                    name={"prijavitelj_projekta"}
                    setSpecificState={setProjectAplicant}
                />

                <Question questionText={questions[5]}/>
                <TextInputWithoutTitle name={"ostali_partneri_na_projektu"} setSpecificState={setProjectPartners}/>

                <Question questionText={questions[6]}/>
                <TextInput
                    label={"UKUPNA VRIJEDNOST(ukoliko trenutno nije poznat točan iznos, navesti okviran iznos"}
                    name={"ukupna_vrijednost_projekta"}
                    setSpecificState={setTotalValue}
                />
                <TextInput
                    label={"DIO PRORAČUNA KOJI PRIPADA FESB-u(vrijednost ili postotak ukupne vrijednosti"}
                    name={"dio_proracuna_fesb"}
                    setSpecificState={setFesbValuePart}
                />

                <Question questionText={questions[7]} />
                <RadioButtonInput simpleQuestionValue={""} setSelectionState={setNewEmployment}/>

                <SpecialInput pitanje={questions[8]} sendProjectMembers={updateProjectTeam} initialValue={[]}/>
                
                <button id="submit-button" onClick={handleSubmit}>SUBMIT</button>
                </div>
        </div>
    )

} 

export default FirstInputForm