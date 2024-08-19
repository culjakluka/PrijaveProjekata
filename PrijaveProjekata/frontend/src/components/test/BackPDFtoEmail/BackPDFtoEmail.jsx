import React from "react";

class BackPDFtoEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  
  generatePDF = async () => {
    try {
      const projectData = {
        _id: "66ba3745740a41bf28d34d95",
        userId: "65a56e9b54fb67b1b39e706c",
        firstInputMarker: true,
        secondInputMarker: true,
        nameSurname: "Perica Peric Perislav",
        vocation: "Doktor",
        department: "Zavod za strojarstvo i brodogradnju - dr.sc. Damir Sedlar",
        email: "perica@gmail.com",
        projectTitle: "PrijaveProjekata 2",
        projectAcronym: "PrijProje",
        applicationDeadline: 1724882400000,
        projectSummary: "Ovo je kratak sazetak projekta",
        applicationURL: "www.fesb.hr",
        projectApplicant: "FESB",
        projectPartners: "Nema 1ostalih partnera",
        totalValue: 100000,
        fesbValuePart: 20000,
        newEmploymentBoolean: true,
        newEmploymentPositions: [
          {
            positionName: "sdsd",
            positionSalary: 323,
            positionPercentage: 23,
            _id: "66ba3745740a41bf28d34d96"
          },
          {
            positionName: "Tajnik",
            positionSalary: 800,
            positionPercentage: 23,
            _id: "66ba3745740a41bf28d34d97"
          },
          {
            positionName: "1",
            positionSalary: 1,
            positionPercentage: 1,
            _id: "66c1de9be3e02eda670ad87e"
          }
        ],
        projectTeam: [
          {
            nameSurname: "Mali Perica",
            email: "mail@gmail.com",
            thisProjectPercentage: 80,
            otherProjects: [
              {
                otherProjectName: "Projekt2",
                otherProjectPercentage: 30,
                _id: "66ba3745740a41bf28d34d99"
              }
            ],
            _id: "66ba3745740a41bf28d34d98"
          }
        ],
        pdfDocuments: {
          pdfs: []
        },
        state: "secondFormSubmitted",
        createdAt: 1723479877071,
        updatedAt: 1723981467366,
        __v: 0,
        consultantExpense: 1,
        consultantExpenseSource: "1",
        consultantServices: true,
        currentPersonnelExpense: 1,
        downPayment: 1,
        economicSubjectInvolvement: true,
        equipmentAmortizationExpense: 1,
        equipmentDescriptionAndExpense: "1",
        expectedProjectBeginning: 1724968800000,
        expectedProjectDurationInMonths: 1,
        expenseNote: "1",
        indirectExpenses: 3000,
        materialExpense: 1,
        mobilePhoneNumber: "1",
        newPersonnelExpense: 1,
        otherServicesExpense: 1,
        partnerExpense: 1,
        personalFinancingExpense: "1",
        projectType: "Infrastrukturni projekt",
        requestedFunding: 1,
        requiredDocumentationFESB: "1",
        sourceOfFunding: "Horizon Europe",
        teamLeaderNote: "1",
        travelRegistrationEducationExpense: 1,
        workTimeOtherPercentage: 1,
        workTimeThisPercentage: 1
      };
this.setState({ isLoading: true });

// Make a request to the server to generate the PDF
const response = await fetch("/api/generate-pdf", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ projectData: projectData }),
});

if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "project_info.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      this.setState({ isLoading: false });
    } catch (error) {
      console.error("Error generating PDF:", error);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF} disabled={this.state.isLoading}>
          {this.state.isLoading ? "Generating PDF..." : "Generate PDF"}
        </button>
      </div>
    );
  }
}

export default BackPDFtoEmail;
