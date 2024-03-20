import React, { useCallback, useContext, useEffect, useState } from "react";

// style
import "./ProjectInfo.css"
import '../AdminDashboard.css'

// context
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext.js";


// my components
import AdminQuestion from '../AdminDashboardProjectComponents/AdminQuestion/AdminQuestion.js'
import AdminTextInput from '../AdminDashboardProjectComponents/AdminTextInput/AdminTextInput.js'
import SpecialInputSecondInputForm from "../../../InputComponents/SpecialInput/SpecialInputSecondInputForm.js";

const ProjectInfo = ({selectedProject}) => {

    const [selectedProjectData, setSelectedProjectData] = useState();

    const { intentionSelection, approvalSelection } = useContext(AdminDashboardContext);

    useEffect(() => {
        setSelectedProjectData(selectedProject);
    }, [])

    // DATA

    // questions - approval form
    let questions = [
        "1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a",
        "2. Naziv, akronim i rok za prijavu",
        "3. Sažetak projekta (do 200 znakova)",
        "4. Poveznica za natječaj",
        "5. Koordinator projekta",
        "6.Ostali partneri na projektu",
        "7. Proračun projekta",
        "8. Jesu li u okviru projekta planirana nova radna mjesta",
        "9. Navedite ostale osobe koje će biti uključene u provedbu projekta",
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
        "20. Planirate li koristiti konzultantsku pomoć prilikom prijave projekta?",
        "21. Navedite dokumentaciju koju je potrebno osigurati za prijavu projekta od strane FESB-a"
    ]


    return(
        <>
            <div className="project-info-container">

                <h4>Document_id:{selectedProject._id}</h4>
                <h2>{selectedProject.nameSurname} {selectedProject.projectAcronym}</h2>

                {intentionSelection && <>
                    <AdminQuestion questionText={questions[0]}/>
                        <AdminTextInput currentLabelValue={"IME I PREZIME"} currentInputValue={selectedProject.nameSurname}/>
                        <AdminTextInput currentLabelValue={"ZAVOD (ODJSEK)"} currentInputValue={selectedProject.department}/>
                        <AdminTextInput currentLabelValue={"TITULA"} currentInputValue={selectedProject.vocation}/>
                        <AdminTextInput currentLabelValue={"E-MAIL"} currentInputValue={selectedProject.email}/>

                    <AdminQuestion questionText={questions[1]}/>
                        <AdminTextInput currentLabelValue={"NAZIV PROJEKTA"} currentInputValue={selectedProject.projectTitle}/>
                        <AdminTextInput currentLabelValue={"AKRONIM PROJEKTA"} currentInputValue={selectedProject.projectAcronym}/>
                        <AdminTextInput currentLabelValue={"ROK ZA PRIJAVU PROJEKTA"} currentInputValue={selectedProject.applicationDeadline}/>

                    <AdminQuestion questionText={questions[2]}/>
                        <AdminTextInput currentLabelValue={"summary"} currentInputValue={selectedProject.projectSummary}/>

                    <AdminQuestion questionText={questions[3]}/>
                        <AdminTextInput currentLabelValue={"LINK NA STRANICU"} currentInputValue={selectedProject.applicationURL}/>
                        
                    <AdminQuestion questionText={questions[4]}/>
                        <AdminTextInput currentLabelValue={"PRIJAVITELJ PROJEKTA/VODEĆI PARTNER (institucija, tvrtka..."} currentInputValue={selectedProject.projectApplicant}/>

                    <AdminQuestion questionText={questions[5]}/>
                        <AdminTextInput currentLabelValue={"others"} currentInputValue={selectedProject.projectPartners}/>

                    <AdminQuestion questionText={questions[6]}/>
                        <AdminTextInput currentLabelValue={"UKUPNA VRIJEDNOST"} currentInputValue={selectedProject.totalValue}/>
                        <AdminTextInput currentLabelValue={"DIO PRORAČUNA FESB"} currentInputValue={selectedProject.fesbValuePart}/>

                    <AdminQuestion questionText={questions[7]}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={selectedProject.newEmploymentBoolean}/>

                    <AdminQuestion questionText={questions[8]}/>
                    <div>{JSON.stringify(selectedProject.projectTeam)}</div>
                    </>
                }

                {approvalSelection && <>
                    <AdminQuestion questionText={questions[0]}/>
                        <AdminTextInput currentLabelValue={"IME I PREZIME"} currentInputValue={selectedProject.nameSurname}/>
                        <AdminTextInput currentLabelValue={"ZAVOD (ODJSEK)"} currentInputValue={selectedProject.department}/>
                        <AdminTextInput currentLabelValue={"TITULA"} currentInputValue={selectedProject.vocation}/>
                        <AdminTextInput currentLabelValue={"E-MAIL"} currentInputValue={selectedProject.email}/>
                        <AdminTextInput currentLabelValue={"MOBITEL*"} currentInputValue={selectedProject.mobilePhoneNumber}/>
                        <AdminTextInput currentLabelValue={"POSTOTAK RADNOG VREMENA U OKVIRU PREDLOŽENOG PROJEKTA*"} currentInputValue={selectedProject.workTimeThisPercentage}/>
                        <AdminTextInput currentLabelValue={"POSTOTAK RADNOG VREMENA U OKVIRU OSTALIH PROJEKATA U PROVEDBI"} currentInputValue={selectedProject.workTimeOtherPercentage}/>
                        <AdminTextInput currentLabelValue={"NAPOMENA"} currentInputValue={selectedProject.teamLeaderDisclaimer}/>

                    <AdminQuestion questionText={questions[1]}/>
                        <AdminTextInput currentLabelValue={"NAZIV PROJEKTA"} currentInputValue={selectedProject.projectTitle}/>
                        <AdminTextInput currentLabelValue={"AKRONIM PROJEKTA"} currentInputValue={selectedProject.projectAcronym}/>
                        <AdminTextInput currentLabelValue={"ROK ZA PRIJAVU PROJEKTA"} currentInputValue={selectedProject.applicationDeadline}/>

                    <AdminQuestion questionText={questions[2]}/>
                        <AdminTextInput currentLabelValue={"summary"} currentInputValue={selectedProject.projectSummary}/>

                    <AdminQuestion questionText={questions[3]}/>
                        <AdminTextInput currentLabelValue={"LINK NA STRANICU"} currentInputValue={selectedProject.applicationURL}/>
                        
                    <AdminQuestion questionText={questions[4]}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={selectedProject.sourceOfFunding}/>

                        <AdminQuestion questionText={questions[5]}/>
                    <AdminTextInput currentLabelValue={"TIP PROJEKTA"} currentInputValue={selectedProject.projectType}/>

                    <AdminQuestion questionText={questions[6]}/>
                        <AdminTextInput currentLabelValue={"OČEKIVANI POČETAK PROJEKTA"} currentInputValue={selectedProject.expectedProjectBeginning}/>

                    <AdminQuestion questionText={questions[7]}/>
                        <AdminTextInput currentLabelValue={"TRAJANJE PROJEKTA (U MJESECIMA)"} currentInputValue={selectedProject.expectedProjectDurationInMonths}/>

                    <AdminQuestion questionText={questions[8]}/>
                        <AdminTextInput currentLabelValue={"PRIJAVITELJ PROJEKTA/VODEĆI PARTNER"} currentInputValue={selectedProject.projectApplicant}/>

                    <AdminQuestion questionText={questions[9]}/>
                        <AdminTextInput currentLabelValue={"PARTNERI NA PROJEKTU"} currentInputValue={selectedProject.projectPartners}/>

                    <AdminQuestion questionText={questions[10]}/>
                        <AdminTextInput currentLabelValue={"UKLJUČENOST GOSPODARSKOG SUBJEKTA"} currentInputValue={selectedProject.economicSubjectInvolvement}/>

                    <AdminQuestion questionText={questions[11]}/>
                        <AdminTextInput currentLabelValue={"UKUPNA VRIJEDNOST"} currentInputValue={selectedProject.totalValue}/>

                    <AdminQuestion questionText={questions[12]}/>
                        <AdminTextInput currentLabelValue={"DIO PRORAČUNA KOJI PRIPADA FESB-u"} currentInputValue={selectedProject.fesbValuePart}/>
                        <AdminTextInput currentLabelValue={"TROŠAK POSTOJEĆEG OSOBLJA"} currentInputValue={selectedProject.currentPersonnelExpense}/>
                        <AdminTextInput currentLabelValue={"TROŠAK NOVOZAPOSLENOG OSOBLJA"} currentInputValue={selectedProject.newPersonnelExpense}/>
                        <AdminTextInput currentLabelValue={"NEIZRAVNI TROŠKOVI"} currentInputValue={`${0.15 * selectedProject.fesbValuePart}`}/> {/* Calculated as 15% of FESB value part */}
                        <AdminTextInput currentLabelValue={"TROŠAK I POPIS OPREME"} currentInputValue={selectedProject.equipmentDescriptionAndExpense}/>
                        <AdminTextInput currentLabelValue={"TROŠAK AMORTIZACIJE OPREME"} currentInputValue={selectedProject.equipmentAmortizationExpense}/>
                        <AdminTextInput currentLabelValue={"TROŠAK VANJSKIH USLUGA"} currentInputValue={selectedProject.otherServicesExpense}/>
                        <AdminTextInput currentLabelValue={"TROŠAK MATERIJALA I SITNOG INVENTARA"} currentInputValue={selectedProject.materialExpense}/>
                        <AdminTextInput currentLabelValue={"PUTNI TROŠAK"} currentInputValue={selectedProject.travelRegistrationEducationExpense}/>
                        <AdminTextInput currentLabelValue={"NAPOMENA O TROŠKOVIMA"} currentInputValue={selectedProject.expenseDisclaimer}/>

                    <AdminQuestion questionText={questions[13]}/>
                        <AdminTextInput currentLabelValue={"TROŠKOVI PARTNERA"} currentInputValue={selectedProject.partnerExpense}/>

                    <AdminQuestion questionText={questions[14]}/>
                        <AdminTextInput currentLabelValue={"ZAHTIJEVANO FINANCIRANJE"} currentInputValue={selectedProject.requestedFunding}/>

                    <AdminQuestion questionText={questions[15]}/>
                        <AdminTextInput currentLabelValue={"AVANSNO PLAĆANJE"} currentInputValue={selectedProject.downPayment}/>

                    <AdminQuestion questionText={questions[16]}/>
                        <AdminTextInput currentLabelValue={"PLAN SUFINANCIRANJA"} currentInputValue={selectedProject.personalFinancingExpense}/>

                    <AdminQuestion questionText={questions[17]}/>
                        {/* Assuming 'newEmploymentBoolean' is a boolean, converting it to a more readable format for display */}
                        <AdminTextInput currentLabelValue={"NOVOZAPOSLENJE"} currentInputValue={selectedProject.newEmploymentBoolean ? "Da" : "Ne"}/>

                    <AdminQuestion questionText={questions[18]}/>
                        {/* Special case, might not have a direct mapping or requires a component to list team members */}
                        <div>{JSON.stringify(selectedProject.projectTeam)}</div>


                    </>
                }


            </div>
        </>
    )
}

export default ProjectInfo