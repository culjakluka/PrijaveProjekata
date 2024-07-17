import { useState, useEffect } from "react";
import { useLogout } from "../../../hooks/useLogout";
import React from "react";
import TextInput from "../../InputComponents/TextInput/TextInput";
import DropdownMenuInput from "../../InputComponents/DropdownMenuInput/DropdownMenuInput";
import RadioButtonInput from "../../InputComponents/RadioButtonInput/RadioButtonInput";

// my components
import { useAuthContext } from "../../../hooks/useAuthContext";
import Question from "../../InputComponents/Question/Question";
import SpecialInputFirstInputForm from "../../InputComponents/SpecialInputForm/SpecialInputForm.js";
import TextInputWithoutTitle from "../../InputComponents/TextInputWithoutTitle/TextInputWithoutTitle";
import CompletedProject from "../../InputComponents/CompletedProject/CompletedProject";
import CalendarInput from "../../InputComponents/CalendarInput/CalendarInput";

// modal components
import ModalMessage from "../../InputComponents/ModalMessage/ModalMessage.js";
import ModalApplicationSubmitted from "../../InputComponents/ModalApplicationSubmitted/ModalApplicationSubmitted.js";

// styles
import Style from "./FirstInputForm.module.css";
import "../../../index.css";

// data
import { questions } from "../../data/firstInputFormData.js";

// context
import { FirstInputFormDataContext } from "../../../context/FirstInputFormDataContext.js";
import ProjectSummary from "../../InputComponents/ProjectSummary/ProjectSummary.js";
import NumberInput from "../../InputComponents/NumberInput/NumberInput.js";

// API requests
import { getDepartments } from "./firstInputFormApi.js";
import { set } from "date-fns";
import CalendarInputAdvanced from "../../InputComponents/CalendarInputAdvanced/CalendarInputAdvanced.js";
import NumberInputSelect from "../../InputComponents/NumberInputSelect/NumberInputSelect.js";

const FirstInputForm = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [nameSurname, setNameSurname] = useState("");
  const [vocation, setVocation] = useState("");
  const [department, setDepartment] = useState("");
  // departments data
  //const [departmentsData, setDepartmentsData] = useState([]);
  //
  const [email, setEmail] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectAcronym, setProjectAcronym] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [projectApplicant, setProjectAplicant] = useState("");
  const [projectPartners, setProjectPartners] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [fesbValuePart, setFesbValuePart] = useState(0);
  const [newEmploymentBoolean, setNewEmployment] = useState(null);
  const [projectTeam, setProjectTeam] = useState([]);
  const [firstInputMarker, setFirstInputMarker] = useState(true);
  const [secondInputMarker, setSecondInputMarker] = useState(false);
  const [inputFormData, setInputFormData] = useState({});

  // object will take all data from input
  // later it will be extracted and sent to databases

  // MISSING FIELDS MODAL
  const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  // modal application submitted
  const [modalApplicationSubmittedIsOpen, setModalApplicationSubmittedIsOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/projectInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFormData),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log("Post successful:", responseData)

        // show message that application is submitted
        
        // clearing session storage and refreshing browser
        sessionStorage.clear();
        setModalApplicationSubmittedIsOpen(true);

      } else {
        // handle potentional non-JSON response
        const errorData = await response.json().catch(() => null);
        // if response is not null
        const errorMessage = errorData
          ? errorData.error
          : `Error: ${response.status} ${response.statusText}`;

        console.error("Error posting data: ", errorMessage);

        // printing missing field if there are any and displaying them
        if (
          errorData &&
          errorData.emptyFields &&
          errorData.emptyFields.length > 0
        ) {
          const missingFieldsMessage = `Missing fields: ${errorData.emptyFields.join(", ")}`;
          console.error(missingFieldsMessage);
          //window.alert(missingFieldsMessage);
          
          setMissingFields(missingFieldsMessage);
          // opean modal missing fields
          setModalMessageIsOpen(true);
          

        }
      }
    } catch (error) {
      console.error("Error posting data2:", error.message);

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
      projectTeam,
    });

    console.log(inputFormData);
    //console.log(JSON.stringify(inputFormData));
  }, [
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
    projectTeam,
  ]);

  // callback
  const updateProjectTeam = (projectMembersList) => {
    setProjectTeam(projectMembersList);
  };

  const handleClick = () => {
    logout();
  };

  // loading departments data

  const handleGetDepartments = async () => {
    try {
      const departments = await getDepartments();

      console.log(departments);

      const fetchedDepartments = departments.map(
        (department) => (department.name + " - " + department.headName)
      );
      // Update state with fetched department names
      setDepartmentsData(fetchedDepartments);

      console.log(fetchedDepartments);
    } catch (error) {
      console.error("Error fetching department data:", error);
      window.alert("Failed to fetch department data!");
    }
  };

  useEffect(() => {
    handleGetDepartments();
  }, []);

  const [departmentsData, setDepartmentsData] = useState([]);

  return (
    <FirstInputFormDataContext.Provider value={{
      projectTeam,
      setProjectTeam,
      totalValue,
      setModalMessageIsOpen,
      setModalApplicationSubmittedIsOpen,
      missingFields
      }}>

      {modalMessageIsOpen && <ModalMessage missingFieldsMessage={missingFields} />}
      {modalApplicationSubmittedIsOpen && <ModalApplicationSubmitted />}

      <div className={Style.InputContainer}>
        {user && (
          <div className="logout">
            <span>{user.username}</span>
            <button onClick={handleClick}>Odjavi se</button>
          </div>
        )}
        <div className={Style.InputForm}>
          <h1 className="document-title">NAMJERA PRIJAVE</h1>
          <h3>{user.userId}</h3>
          <Question questionText={questions[0]} />
          <TextInput
            label={"IME I PREZIME"}
            name="ime_prezime"
            setSpecificState={setNameSurname}
          />

          <TextInput
            label={"TITULA"}
            name={"titula"}
            setSpecificState={setVocation}
          />
          <DropdownMenuInput
            label={"ZAVOD (ODSJEK)"}
            name={"zavod"}
            data={departmentsData}
            setSpecificState={setDepartment}
            isDepartment={true}
          />
          <TextInput
            label={"E-MAIL"}
            name={"email"}
            setSpecificState={setEmail}
          />

          <Question questionText={questions[1]} />
          <TextInput
            label={"NAZIV PROJEKTA"}
            name={"naziv_projekta"}
            setSpecificState={setProjectTitle}
          />
          <TextInput
            label={"AKRONIM PROJEKTA"}
            name={"akronim_projekta"}
            setSpecificState={setProjectAcronym}
          />
          <CalendarInputAdvanced 
            label={"ROK ZA PRIJAVU PROJEKTA"}
            name={"rok_za_prijavu_projekta"}
            setSpecificState={setApplicationDeadline}
            workingDaysLimit={15}
          />

          <Question questionText={questions[2]} />
          <ProjectSummary
            name={"sazetak"}
            setSpecificState={setProjectSummary}
          />

          <Question questionText={questions[3]} />
          <TextInput
            label={"LINK NA STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA"}
            name={"link_na_stranicu_s_dokumentacijom"}
            setSpecificState={setApplicationURL}
          />

          <Question questionText={questions[4]} />
          <TextInput
            label={
              "PRIJAVITELJ PROJEKTA/VODEĆI PARTNER (FESB, institucija, tvrtka...)"
            }
            name={"prijavitelj_projekta"}
            setSpecificState={setProjectAplicant}
          />

          <Question questionText={questions[5]} />
          <TextInputWithoutTitle
            name={"ostali_partneri_na_projektu"}
            setSpecificState={setProjectPartners}
          />

          <Question questionText={questions[6]} />
          <NumberInput
            label={
              "UKUPNA VRIJEDNOST(ukoliko trenutno nije poznat točan iznos, navesti okviran iznos"
            }
            name={"ukupna_vrijednost_projekta"}
            setSpecificState={setTotalValue}
            currencySign={"€"}
          />

          <NumberInputSelect
            label={
              "DIO PRORAČUNA KOJI PRIPADA FESB-u(vrijednost ili postotak ukupne vrijednosti"
            }
            name={"dio_proracuna_fesb"}
            setSpecificState={setFesbValuePart}
            isFirstInputForm={true}
            isSecondInputForm={false}
          />

          <Question questionText={questions[7]} />
          <RadioButtonInput
            simpleQuestionValue={""}
            setSelectionState={setNewEmployment}
          />

          <SpecialInputFirstInputForm
            name="project_team_members"
            pitanje={questions[8]}
            formType={"first"}
          />

          <button className="default-button" onClick={handleSubmit}>
            PODNESI OBRAZAC NAMJERE
          </button>
        </div>
      </div>
    </FirstInputFormDataContext.Provider>
  );
};

export default FirstInputForm;
