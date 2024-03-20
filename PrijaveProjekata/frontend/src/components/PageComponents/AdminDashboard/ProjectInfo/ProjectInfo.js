import React, { useCallback, useContext, useEffect, useState } from "react";

// style
import "./ProjectInfo.css"
import '../AdminDashboard.css'

// context
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext.js";


// my components
import AdminQuestion from '../AdminDashboardProjectComponents/AdminQuestion/AdminQuestion.js'
import AdminTextInput from '../AdminDashboardProjectComponents/AdminTextInput/AdminTextInput.js'

const ProjectInfo = ({selectedProject}) => {

    const [selectedProjectData, setSelectedProjectData] = useState();

    const { intentionSelection } = useContext(AdminDashboardContext);

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
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>

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
                        
                    <AdminQuestion questionText={questions[8]}/>


                    <AdminQuestion questionText={questions[9]}/>
                    </>
                }

                {!intentionSelection && <>
                    <AdminQuestion questionText={questions[0]}/>
                        <AdminTextInput currentLabelValue={"IME I PREZIME"} currentInputValue={selectedProject.nameSurname}/>
                        <AdminTextInput currentLabelValue={"ZAVOD (ODJSEK)"} currentInputValue={selectedProject.department}/>
                        <AdminTextInput currentLabelValue={"TITULA"} currentInputValue={selectedProject.vocation}/>
                        <AdminTextInput currentLabelValue={"E-MAIL"} currentInputValue={selectedProject.email}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>
                        <AdminTextInput currentLabelValue={""} currentInputValue={""}/>

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
                        
                    <AdminQuestion questionText={questions[8]}/>


                    <AdminQuestion questionText={questions[9]}/>

                    <AdminQuestion questionText={questions[10]}/>

                    <AdminQuestion questionText={questions[11]}/>

                    <AdminQuestion questionText={questions[12]}/>

                    <AdminQuestion questionText={questions[13]}/>

                    <AdminQuestion questionText={questions[14]}/>

                    <AdminQuestion questionText={questions[15]}/>

                    <AdminQuestion questionText={questions[16]}/>

                    <AdminQuestion questionText={questions[17]}/>

                    <AdminQuestion questionText={questions[18]}/>

                    <AdminQuestion questionText={questions[19]}/>

                    <AdminQuestion questionText={questions[20]}/>

                    <AdminQuestion questionText={questions[21]}/>
                    </>
                }


            </div>
        </>
    )
}

export default ProjectInfo