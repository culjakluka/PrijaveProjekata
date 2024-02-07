import React, { useEffect, useState } from "react";

// style
import "./ProjectInfo.css"
import '../AdminDashboard.css'


// my components
import AdminQuestion from '../AdminDashboardProjectComponents/AdminQuestion/AdminQuestion.js'
import AdminTextInput from '../AdminDashboardProjectComponents/AdminTextInput/AdminTextInput.js'

const ProjectInfo = ({selectedProject}) => {

    const [selectedProjectData, setSelectedProjectData] = useState();

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
        "9. Navedite ostale osobe koje će biti uključene u provedbu projekta"
    ]


    return(
        <>
            <div className="project-info-container">

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
                    <AdminTextInput currentLabelValue={"nova_radna_mjesta"} currentInputValue={selectedProject.newEmploymentBoolean}/>

                <AdminQuestion questionText={questions[8]}/>
                    <p>COMING SOON</p>

            </div>
        </>
    )
}

export default ProjectInfo