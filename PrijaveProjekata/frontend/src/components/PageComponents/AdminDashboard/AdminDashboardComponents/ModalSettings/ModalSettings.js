import React, { useEffect, useState, useContext} from 'react';
import { AdminDashboardContext } from '../../../../../context/AdminDashboardContext';
import { ModalSettingsContext } from '../../../../../context/ModalSettingsContext'

// style
import Style from './ModalSettings.module.css'

// external components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

// my components
import Dean from './Dean/Dean';
import Department from './Department/Department';


// api requests Dean
import { getDean, createDean, updateDean, deleteDean } from './deanApi.js';

// api request Departments
import { getDepartments,  createDepartment, updateDepartment, deleteDepartment} from './departmentApi.js'

const ModalSettings = ({}) => {

    const { modalSettingsIsOpen, setModalSettingsIsOpen } = useContext(AdminDashboardContext);
    
    const [dean, setDean] = useState([]);
    const [departments, setDepartments] = useState([]);

    // new department
    const [newDepartmentData, setNewDepartmentData] = useState([]);

    // fetching data
    const fetchDeanData = async () => {
        try {
            const deanData = await getDean();
            setDean(deanData[0]);
            console.log(deanData);
        } catch(error) {
            console.error("Error fetching dean data", error);
            window.alert("Failed to fetch dean data!");
            console.alert("Hello world")
        }
    }

    // Create a new dean 
    const handleCreateDean = async (newDeanData) => {
        try {
            const createdDean = await createDean(newDeanData);
        } catch (error) {
            console.error('Error creating dean:', error);
            window.alert('Failed to create dean!');
        }
    };

     // Update an existing dean
     const handleUpdateDean = async (id, updatedDeanData) => {
        try {
            const updatedDean = await updateDean(id, updatedDeanData);
            console.log('Dean updated successfully:', updatedDean);
            // Optionally, update the state or perform any other actions after updating the dean
            window.alert("Dekan uspješno ažuriran")
        } catch (error) {
            console.error('Error updating dean:', error);
            window.alert('Failed to update dean!');
        }
    };

    // DEPARTMENTS API REQUESTS
    // Fetch department data
    const fetchDepartmentData = async () => {
        try {
            const departmentsData = await getDepartments();
            setDepartments(departmentsData);
            console.log(departmentsData);
            // Handle the fetched department data as needed
            console.log(departmentsData);
        } catch (error) {
            console.error('Error fetching department data:', error);
            window.alert('Failed to fetch department data!');
        }
    };

    // Create a new department
    const handleCreateDepartment = async (newDepartmentData) => {
        try {
            const createdDepartment = await createDepartment(newDepartmentData);
            console.log('Department created successfully:', createdDepartment);
            // Optionally, update the state or perform any other actions after creating the department
        } catch (error) {
            console.error('Error creating department:', error);
            window.alert('Failed to create department!');
        }
    };

    // Update an existing department
    const handleUpdateDepartment = async (id, updatedDepartmentData) => {
        try {
            const updatedDepartment = await updateDepartment(id, updatedDepartmentData);
            console.log('Department updated successfully:', updatedDepartment);
            // Optionally, update the state or perform any other actions after updating the department
        } catch (error) {
            console.error('Error updating department:', error);
            window.alert('Failed to update department!');
        }
    };



    const closeModal = () => {
        setModalSettingsIsOpen(false);
    }

    // function that perfrom data fetch once the modal is open
    useEffect(() => {
        if(modalSettingsIsOpen) {
            fetchDeanData();
            fetchDepartmentData();
        }
    }, [modalSettingsIsOpen])

    useEffect(() => {
        // TO-DO
    }, [])

    useEffect(() => {
        fetchDepartmentData();
    }, [departments])

    const handleDepartmentName = (event) => {
        setNewDepartmentData({...newDepartmentData, name : event.target.value});
    }

    const handleDepartmentHead = (event) => {
        setNewDepartmentData({...newDepartmentData, headName : event.target.value});
    }


    return (  
        <ModalSettingsContext.Provider value={{dean, setDean, handleUpdateDean, newDepartmentData, setNewDepartmentData}}>
            <div className={Style.ModalContainerOverlay}>
                <div className={Style.Modal}>
                    <div className={Style.ModalTopBar}>
                        <FontAwesomeIcon onClick={() => closeModal()} icon={faXmark} size='1x'/>
                    </div>

                    <h2 className="title-font">Postavke</h2>

                    <div className={Style.ModalLine}></div>

                    

                    <div className={Style.ModalContent}>

                        <h4 className="title-font" style={{ marginTop: '10px'}}>Dekan</h4>

                        <div className={Style.DeanInfo}>
                            <Dean />
                        </div>

                        <h4 className="title-font" style={{ marginTop: '10px'}}>Zavodi</h4>

                        <div className={Style.DepartmentsInfo}>
                            {/* Render departments */}
                            {/* 
                                maping list departments -> department represents single department
                                while going through the list of department and thus can be usedas
                                we wish
                             */}
                            {departments && departments.map((department) => (
                            <Department
                                key={department._id}
                                name={department.name}
                                headName={department.headName}
                                departmentName={department.name}
                                headOfDepartmentName={department.headName}
                                departmentIdNumber={department._id}
                            />
                            ))}

                            {/* ADDIG NEW DEPARTMENT */}
                            <div className={Style.NewDepartmentContainer}>
                                <input className={Style.NewDepartmentName} onChange={handleDepartmentName} type="text" placeholder='ime zavoda...'></input>
                                <input className={Style.NewDepartmentHead} onChange={handleDepartmentHead} type="text" placeholder='ime nositelja zavoda...'></input>
                                <button className={Style.AddNewDepartmentButton} onClick={() => handleCreateDepartment(newDepartmentData)}>DODAJ NOVI ZAVOD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalSettingsContext.Provider>
    );
}
 
export default ModalSettings;