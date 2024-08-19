// odobri first formu

const approveFirstFormSubmit = async (projectId) => {
  try {
    // Make a PATCH request to the backend API using fetch
    const response = await fetch(
      `/api/projectInfo/approveFirstFormSubmit/${projectId}`,
      {
        method: "PATCH",
      }
    );  

    // Parse the JSON response
    const responseData = await response.json();

    if (response.ok) {
      console.log(
        "state='firstFormApproved' updated successfully!\n",
        responseData
      );

      return true;
    } else {
      // handle potentional non-JSON response
      const errorData = await response.json().catch(() => null);
      // if response is not null
      const errorMessage = errorData
        ? errorData.error
        : `Error: ${response.status} ${response.statusText}`;

      console.error("state='firstFormApproved' ERROR\nmessage:", errorMessage);

      return false;
    }

    // Handle the response as needed
    console.log(responseData); // Log the response data
  } catch (error) {
    console.error("Error approving first form submit:", error);
    return false;
    // Handle errors as needed
  }
};

// odobri second formu
const approveSecondFormSubmit = async (projectId) => {
  try {
    // Make a PATCH request to the backend API using fetch
    const response = await fetch(
      `/api/projectInfo/approveSecondFormSubmit/${projectId}`,
      {
        method: "PATCH",
      }
    );

    // Parse the JSON response
    const responseData = await response.json();

    if (response.ok) {
      console.log(
        "state='secondFormApproved' updated successfully!\n",
        responseData
      );

      return true;
    } else {
      // handle potentional non-JSON response
      const errorData = await response.json().catch(() => null);
      // if response is not null
      const errorMessage = errorData
        ? errorData.error
        : `Error: ${response.status} ${response.statusText}`;

      console.error("state='secondFormApproved' ERROR\nmessage:", errorMessage);

      return false;
    }
    // Handle the response as needed
    console.log(responseData); // Log the response data

    window.location.reload();
  } catch (error) {
    console.error("Error approving second form submit:", error);
    // Handle errors as needed
    return false;
  }
};

// firstFormSubmitted
const submitFirstForm = async (projectId) => {
  try {
    // Make a PATCH request to the backend API using fetch
    const response = await fetch(
      `/api/projectInfo/submitFirstForm/${projectId}`,
      {
        method: "PATCH",
      }
    );

    // Parse the JSON response
    const responseData = await response.json();

    if (response.ok) {
      console.log(
        "state='firstFormSubitted' updated successfully!\n",
        responseData
      );
      window.alert(
        "state='firstFormSubitted' updated successfully!\n",
        responseData
      );
      window.location.reload();
    } else {
      // handle potentional non-JSON response
      const errorData = await response.json().catch(() => null);
      // if response is not null
      const errorMessage = errorData
        ? errorData.error
        : `Error: ${response.status} ${response.statusText}`;

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
    const response = await fetch(
      `/api/projectInfo/submitSecondForm/${projectId}`,
      {
        method: "PATCH",
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      console.log(
        "state='secondFormSubitted' updated successfully!\n",
        responseData
      );
      window.alert(
        "state='secondFormSubitted' updated successfully!\n",
        responseData
      );
      window.location.reload();
    } else {
      // handle potentional non-JSON response
      const errorData = await response.json().catch(() => null);
      // if response is not null
      const errorMessage = errorData
        ? errorData.error
        : `Error: ${response.status} ${response.statusText}`;

      console.error("state='secondFormSubitted' ERROR\nmessage:", errorMessage);
      window.alert("state='secondFormSubitted' ERROR\nmessage:", errorMessage);
    }
  } catch (error) {
    console.error('Couldnt set up state="secondFormSubmitted" error:', error);
    window.alert('Couldnt set up state="secondFormSubmitted" error:', error);
  }
};

const rejectProject = async (projectId) => {
  try {
    const response = await fetch(
      `/api/projectInfo/rejectProject/${projectId}`,
      {
        method: "PATCH",
      }
    );

    // Parse the JSON response
    const responseData = await response.json();

    if (response.ok) {
      console.log('Projekt uspješno odbijen!');

      // returning true so it can be handled later easier
      return true;
    } 

    // Handle the response as needed
    console.log(responseData); // Log the response data

  } catch (error) {
    console.error("Unable to decline probject, an error occured: ", error);
    window.alert("Unable to decline probject, an error occured: ", error);
    // // returning ture so it can be handled later easier
    return false;
  }
};

// delete project
const deleteProject = async (project_id) => {
  try {
    const response = await fetch(`/api/projectInfo/${project_id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Project deleted successfully!", data);
      window.alert("Project deleted successfully!", data);
    } else {
      console.error("Error deleting project!", data.error);
      window.alert("Error deleting project!", data.error);
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

const adminUpdateProjectInfoSet = async (project_id, projectData) => {
  try {
    const response = await fetch(`/api/projectInfo/adminUpdate/${project_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Project updated successfully!", data);

      // to check if it was successfull
      return true;
    } else {
      console.error("Error updating project!", data.error);

      return false;
    }
  } catch (error) {
    console.log("Error: ", error.message);
  
    return false;
  }
};

export {
  submitFirstForm,
  submitSecondForm,
  approveFirstFormSubmit,
  approveSecondFormSubmit,
  rejectProject,
  deleteProject,
  adminUpdateProjectInfoSet,
};
