// odobri first formu

const approveFirstFormSubmit = async (projectId) => {
    try {
        // Make a PATCH request to the backend API using fetch
        const response = await fetch(`/api/projectInfo/approveFirstFormSubmit/${projectId}`, {
            method: 'PATCH'
        });

        // Parse the JSON response
        const responseData = await response.json();

        if(response.ok) {
            console.log("state='firstFormApproved' updated successfully!\n", responseData);
            window.alert("state='firstFormApproved' updated successfully!\n", responseData);
        } else {
             // handle potentional non-JSON response
            const errorData = await response.json().catch(() => null); 
            // if response is not null
            const errorMessage = errorData ? errorData.error : `Error: ${response.status} ${response.statusText}`;

            console.error("state='firstFormApproved' ERROR\nmessage:", errorMessage);
            window.alert("state='firstFormApproved' ERROR\nmessage:", errorMessage);

        }

        // Handle the response as needed
        console.log(responseData); // Log the response data
        window.location.reload()

    } catch (error) {
        console.error('Error approving first form submit:', error);
        window.alert('Error approving first form submit:', error);
        // Handle errors as needed
    }
};

 // odobri second formu
 const approveSecondFormSubmit = async (projectId) => {
    try {
        // Make a PATCH request to the backend API using fetch
        const response = await fetch(`/api/projectInfo/approveSecondFormSubmit/${projectId}`, {
            method: 'PATCH'
        });

        // Parse the JSON response
        const responseData = await response.json();

        if(response.ok) {
            console.log("state='secondFormApproved' updated successfully!\n", responseData);
            window.alert("state='secondFormApproved' updated successfully!\n", responseData);
        } else {
             // handle potentional non-JSON response
            const errorData = await response.json().catch(() => null); 
            // if response is not null
            const errorMessage = errorData ? errorData.error : `Error: ${response.status} ${response.statusText}`;

            console.error("state='secondFormApproved' ERROR\nmessage:", errorMessage);
            window.alert("state='secondFormApproved' ERROR\nmessage:", errorMessage);

        }
        // Handle the response as needed
        console.log(responseData); // Log the response data

        window.location.reload()


    } catch (error) {
        console.error('Error approving second form submit:', error);
        // Handle errors as needed
    }
}


 // firstFormSubmitted
 const submitFirstForm = async (projectId) => {
    try {
        // Make a PATCH request to the backend API using fetch
        const response = await fetch(`/api/projectInfo/submitFirstForm/${projectId}`, {
            method: 'PATCH'
        });

        // Parse the JSON response
        const responseData = await response.json();

        if(response.ok) {
            console.log("state='firstFormSubitted' updated successfully!\n", responseData);
            window.alert("state='firstFormSubitted' updated successfully!\n", responseData);
        } else {
             // handle potentional non-JSON response
            const errorData = await response.json().catch(() => null); 
            // if response is not null
            const errorMessage = errorData ? errorData.error : `Error: ${response.status} ${response.statusText}`;

            console.error("state='firstFormSubitted' ERROR\nmessage:", errorMessage);
            window.alert("state='firstFormSubitted' ERROR\nmessage:", errorMessage);

        }

        // Handle the response as needed
        console.log(responseData); // Log the response data

    } catch (error) {
        console.error('Couldnt set up state="firstFormSubmitted!" error:', error);
        window.alert('Couldnt set up state="firstFormSubmitted!" error:', error);
        // Handle errors as needed
    }
};

const submitSecondForm = async (projectId) => {
    try {
        const response = await fetch(`/api/projectInfo/submitSecondForm/${projectId}`, {
            method: 'PATCH'
        });

        const responseData = await response.json();

        if(response.ok) {
            console.log("state='secondFormSubitted' updated successfully!\n", responseData);
            window.alert("state='secondFormSubitted' updated successfully!\n", responseData);
        } else {
            // handle potentional non-JSON response
            const errorData = await response.json().catch(() => null); 
            // if response is not null
            const errorMessage = errorData ? errorData.error : `Error: ${response.status} ${response.statusText}`;

            console.error("state='secondFormSubitted' ERROR\nmessage:", errorMessage);
            window.alert("state='secondFormSubitted' ERROR\nmessage:", errorMessage);
        }

    } catch(error) {
        console.error('Couldnt set up state="secondFormSubmitted" error:', error);
        window.alert('Couldnt set up state="secondFormSubmitted" error:', error);
    }
}

const rejectProject = async (projectId) => {
    try{
        const response = await fetch(`/api/projectInfo/rejectProject/${projectId}`, {
            method: "PATCH"
        });

        // Parse the JSON response
        const responseData = await response.json();

        if(response.ok) {
            window.alert("Project successfully declined\n");
        }

        // Handle the response as needed
        console.log(responseData); // Log the response data


    } catch(error) {
        console.error('Unable to decline probject, an error occured: ', error);
        window.alert('Unable to decline probject, an error occured: ', error);
        // Handle errors as needed
    }
}

 // delete project
 const deleteProject = async (project_id) => {
    try {
        const response = await fetch(`/api/projectInfo/${project_id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if(response.ok) {
            console.log("Project deleted successfully!", data);
            window.alert("Project deleted successfully!", data)
        } else {
            console.error("Error deleting project!", data.error);
            window.alert("Error deleting project!", data.error)
        }

    } catch(error) {
        console.log("Error: ", error.message);
    }
}


export { submitFirstForm, submitSecondForm, approveFirstFormSubmit, approveSecondFormSubmit, rejectProject, deleteProject }