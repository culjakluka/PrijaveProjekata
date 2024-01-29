import { useState, useEffect, useContext } from "react";
import { SecondInputFormDataConext } from '../../context/SecondInputFormDataContext' 
import './SecondInputForm.css'

//my components
import Question from '../Question/Question'
import TextInput from '../TextInput/TextInput.js'
import TextInputWithoutTitle from '../TextInputWithoutTitle/TextInputWithoutTitle.js'
import DropdownMenuInputOther from '../DropdownMenuInputOther/DropdownMenuInputOther.js';
import DropdownMenuInput from '../DropdownMenuInput/DropdownMenuInput.js'
import RadioButtonInput from '../RadioButtonInput/RadioButtonInput.js'


const SecondInputForm = () => {

    const [inputFormData, setInputFormData] = useState('');
    const [nameSurname, setNameSurname] = useState("");
    const [vocation, setVocation] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [workTimeThisPercentage, setWorkTimeThisPercentage] = useState('');
    const [workTimeOtherPercetange, setWorkTimeOTherPercentage] = useState('');
    const [teamLeaderDisclamer, setTeamLeaderDisclamer] = useState('');
    const [projectTitle, setProjectTitle] = useState("");
    const [projectAcronym, setProjectAcronym] = useState("");
    const [applicationDeadline, setApplicationDeadline ] = useState("");
    const [projectSummary, setProjectSummary] = useState("");
    const [applicationURL, setApplicationURL] = useState("");
    const [sourceOfFunding, setSourceOfFunding] = useState('');
    const [projectType, setProjectType] = useState('');
    const [expectedProjectBeginning, setExpectedProjectBeginning] = useState('');
    const [expectedProjectDurationInMonths, setExpectedProjectDurationInMonths] = useState('');
    const [projectApplicant, setProjectAplicant] = useState("");
    const [projectPartners, setProjectPartners] = useState("");
    const [economicSubjectInvolvement, setEconomicSubjectInvolvement] = useState('');
    const [totalValue, setTotalValue] = useState(0);
    const [fesbValuePart, setFesbValuePart] = useState(0);
    const [currentPesonnelExpense, setCurrentPesonnelExpense] = useState('');
    const [newPersonnelExpense, setNewPersonnelExpense] = useState('');
    const [equipmentDescriptionAndExpense, setEquipmentDescriptionAndExpense] = useState('');
    const [equipmentAmortizationExpense, setEquipmentAmortizationExpense] = useState('');
    const [materialExpense, setMaterialExpense] = useState('');
    const [travelRegistrationEducationExpense, setTravelRegistrationEducationExpense] = useState('');
    const [expenseDisclaimer, setExpenseDisclaimer] = useState('');


    const [projectTeam, setProjectTeam] = useState([]);
    const [partnerExpense, setPartnerExpense] = useState('');
    const [requestedFunding,setRequestedFunding] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [personalFinancingExpense, setPersonalFinancingExpense] = useState('');
    const [consultantServices, setConsultantServices] = useState('');
    const [consultantExpense, setConsultantExpense] = useState('');
    const [consultantExpenseSource, setConsultantExpenseSource] = useState('');
    const [requiredDocumentationFESB, setRequiredDocumentationFESB] = useState('');




    useEffect(() => {
        // TO-DO
    }, [])


    // in the future could be the wa how we load data
    let inputFormTemplate = 
    {

        name : "second_input_form",
        questions : [
            {
                question : "1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a",
                content : [
                    {
                        type : "text",
                        label : "IME I PREZIME*",
                        name : "name_and_surname_2"
                    }
                ] 
            },
            
        ]
    }
    
    // source of funding data
    let sourceOfFundingData = [
        "HRZZ",
        "Horizon Europe",
        "Europski socijalni fond",
        "Europski fond za regionalni razvoj",
        "Drugi strukturni fondovi",
        "Erasmus +",
        "INTERREG",
        "Jedinice lokalne samouprave"
    ]

    let projectTypesData = [
        "Međunarodni znanstveni kompetitivni",
        "Nacionalni znanstveni kompetitivni",
        "Stručni projekt",
        "Strateški projekt",
        "Infrastrukturni projekt",
        "Suradnja s gospodarstvom",
        "Podizanje kapaciteta",
        "Donacija",
        "Ostalo"
    ]

    let radioButtonData1 = "UKOLIKO JE JEDAN OD PARTNERA U PROJEKTU TVRTKA I/ILI POSTOJI" +
                            "PRIJENOS ZNANJA/TEHNOLOGIJE\n PREMA GOSPODARSTVU KOJE JE NUŽNO" +
                            "OSTVARITI TIJEKOM PROVEDBE PROJEKTA ODABERITE DA"

    let questions = [
        "1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a",
        "2. Naziv, akronim i rok za prijavu",
        "3. Sažetak projekta (do 500 znakova)",
        "4. Poveznica za natječaj",
        "5. Izvor financiranja",
        "6. Vrsta projekta",
        "7. Očekivani početak projekta",
        "8. Očekivano trajanje projekta u mjesecima",
        "9 Koordinator projekta*",
        "10. Ostali partneri na projektu*",
        "11. U projektu kao partner sudjeluju gospodarski subjekti",
        "12. Ukupna vrijednost projekta",
        "13. Proračun projekta (može se unositi vrijedost ili postotak ukupne vrijednosti projketa*)",
        "14. Proračun za ostale partnere",
        "15. Traženo financiranje",
        "16. Predujam (iznos ili postotak",
        "17. Iznos potrebnog vlastitog sufinanciranja projekta",
        "18. Jesu li u projektu planirana nova radna mjesta*",
        "19. Navedite ostale osobe koje će biti uključene u provedbu projekta",
        "20. Planirate li koristiti konzultantsku pomoć prilikom prijave projekta?"
    ]

    return ( 
    // all the child components inside SecondInputFormDataConext.Provide have access value data
    <div className="input-form-container">
        <div className="input-form">
            <SecondInputFormDataConext.Provider>
                <Question questionText={questions[0]}/>
                    <TextInput label={"IME I PREZIME*"} name={"name_and_surname_2"} setSpecificState={setNameSurname}/>
                    <TextInput label={"TITULA*"} name={"vocation_2"} setSpecificState={setVocation}/>
                    <TextInput label={"ZAVOD (OD"} name={"department_2"} setSpecificState={setDepartment}/>
                    <TextInput label={"E-MAIL*"} name={"email_2"} setSpecificState={setEmail}/>
                    <TextInput label={"MOBITEL*"} name={"phone_number_2"} setSpecificState={setMobilePhoneNumber}/>
                    <TextInput label={"POSTOTAK RADNOG VREMENA U OKVIRU PREDLOŽENOG PROJEKTA*"} name={"work_time_this_percentage"} setSpecificState={setWorkTimeThisPercentage}/>
                    <TextInput label={"POSTOTAK RADNOG VREMENA U OKVIRU OSTALIH PROJEKATA U PROVEDBI"} name={"work_time_other_percentage"} setSpecificState={setWorkTimeOTherPercentage}/>
                    <TextInput label={"NAPOMENA"} name={"team_leader_disclamer"} setSpecificState={setTeamLeaderDisclamer}/>

                <Question questionText={questions[1]}/>
                    <TextInput label={"NAZIV PROJEKTA"} name={"project_title"} setSpecificState={setProjectTitle}/>
                    <TextInput label={"AKRONIM PROJEKTA"} name={"project_acronym_2"} setSpecificState={setProjectAcronym}/>
                    <TextInput label={"ROK ZA PRIJAVU PROJEKTA"} name={"application_dead_line"} setSpecificState={setApplicationDeadline}/>
                    
                <Question questionText={questions[2]}/>
                <TextInputWithoutTitle name={"project_summary"} setSpecificState={setProjectSummary}/>

                <Question questionText={questions[3]}/>
                <TextInput label={"LINK NA INTERNETSKU STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA S TEKSTOM NATJEČAJA"} name={"application_url"} setSpecificState={setApplicationURL}/>

                <Question questionText={questions[4]}/>
                    <DropdownMenuInputOther name={"source_of_funding"} data={sourceOfFundingData} setSpecificState={setSourceOfFunding}/>

                <Question questionText={questions[5]}/>
                    <DropdownMenuInput name={"type_of_projects"} data={projectTypesData} setSpecificState={setProjectType}/>

                <Question questionText={questions[6]}/>
                    <TextInputWithoutTitle name={"expected_project_beginning"} setSpecificState={setExpectedProjectBeginning}/>

                <Question questionText={questions[7]}/>
                    <TextInputWithoutTitle name={"expected_project_duration_in_months"} setSpecificState={setExpectedProjectDurationInMonths}/>

                <Question questionText={questions[8]}/>
                    <TextInput  label={"PRIJAVITELJ PROJKETA/VODEĆI PARTNER (INSTITUCIJA, TVRTKA, ...)"} name={"project_applicant"} setSpecificState={setProjectAplicant}/>

                <Question questionText={questions[9]}/>
                    <TextInputWithoutTitle name={"project_partners"} setSpecificState={setProjectPartners}/>

                <Question questionText={questions[10]}/>
                    <RadioButtonInput name={"economic_subjet_involvment"} simpleQuestionValue={radioButtonData1} setSelectionState={setEconomicSubjectInvolvement} />

                <Question questionText={questions[11]}/>
                    <TextInputWithoutTitle name={"total_value"} setSpecificState={setTotalValue}/>

                
                <Question questionText={questions[12]}/>
                    <TextInput label={"DIO PRORAČUNA KOJI PRIPADA FESB-u"} name={"fesb_value_part"} setSpecificState={setFesbValuePart}/>
                    <TextInput label={"TROŠAK POSTOJEĆEG OSOBLJA"} name={"current_personnel_expense"} setSpecificState={setCurrentPesonnelExpense}/>
                    <TextInput label={"TROŠAK NOVOZAOSLENOG OSOBLJA"} name={"new_personnel_expense"} setSpecificState={setNewPersonnelExpense}/>
                    <TextInput label={"TROŠAK I POPIS OPREME KOJA SE NABAVLJA (OZNAČITI NABAVU IZNAD 26.544,00 E"} name={"equipment_description_and_expense"} setSpecificState={setEquipmentDescriptionAndExpense}/>
                    <TextInput label={"TROŠAK AMORTIZACIJE OPREME"} name={"equipment_amortization_expense"} setSpecificState={setEquipmentAmortizationExpense}/>
                    <TextInput label={"TROŠAK MATERIJALA I SITNOG INVENTARA"} name={"material_expense"} setSpecificState={setMaterialExpense}/>
                    <TextInput label={"PUTNI TROŠAK/TROŠAK KOTIZACIJA/STRUČNOG USAVRŠAVANJA"} name={"travel_registration_education_expense"} setSpecificState={setTravelRegistrationEducationExpense}/>
                    <p>Upozoriti ukoliko je zbroj stavki od 13.2 do 13.9 veći od 13.1</p>
                    <TextInput label={"NAPOMENA"} name={"expense_disclaimer"} setSpecificState={setExpenseDisclaimer}/>

                <Question questionText={questions[13]}/>
                <Question questionText={questions[14]}/>
                <Question questionText={questions[15]}/>
                <Question questionText={questions[16]}/>
                <Question questionText={questions[17]}/>
                <Question questionText={questions[18]}/>
                <Question questionText={questions[19]}/>
                <Question questionText={questions[20]}/>
                <Question questionText={questions[21]}/>


            </SecondInputFormDataConext.Provider>
        </div>
    </div>
   );
}
export default SecondInputForm;