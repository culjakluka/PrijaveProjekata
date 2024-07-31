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
        _id: "663bac755e9c439885b0e99a",
        applicationDeadline: "2024-06-11T00:00:00.000Z",
        applicationURL: "www.fesb.hr",
        consultantExpense: 1,
        consultantExpenseSource: "1",
        consultantServices: true,
        createdAt: "2024-05-08T16:46:45.581Z",
        currentPesonnelExpense: 12,
        department: "Zavod za elektroenergetiku",
        downPayment: 0,
        economicSubjectInvolvement: true,
        email: "miroljub.petrovic@gmail.com",
        equipmentAmortizationExpense: 23,
        equipmentDescriptionAndExpense: "22",
        expectedProjectBeginning: "2000-12-31T23:00:00.000Z",
        expectedProjectDurationInMonths: 1,
        expenseNote: "Nema napomene",
        fesbValuePart: 10073,
        firstInputMarker: true,
        materialExpense: 123,
        mobilePhoneNumber: 981399662,
        nameSurname: "Miroljub Petrović",
        newEmploymentBoolean: true,
        newPersonnelExpense: 23,
        otherServicesExpense: 123,
        partnerExpense: 31,
        personalFinancingExpense: "Nema",
        projectAcronym: "PoMaBa",
        projectApplicant: "Miroljub Petrović",
        projectPartners: "Nema ostalih partnera",
        projectSummary: "Ovo je dug sadrzaj",
        projectTeam: [
          {
            email: "la",
            nameSurname: "Miroljub Petrović",
            thisProjectPercentage: 10,
            otherProjects: [
              {
                otherProjectName: "Pod Mač Bato",
                otherProjectPercentage: 10,
              },
            ],
          },
        ],
        projectTitle: "Pod Mač Bato",
        projectType: "Međunarodni znanstveni kompetitivni",
        requestedFunding: 0,
        requiredDocumentationFESB: "213213",
        secondInputMarker: false,
        sourceOfFunding: "Nema",
        state: "firstFormSubmitted",
        teamLeaderNote: "Nema napomene",
        totalValue: 213,
        travelRegistrationEducationExpense: 21321,
        updatedAt: "2024-05-08T22:29:28.191Z",
        userId: "65a56e9b54fb67b1b39e706c",
        vocation: "Dr.",
        workTimeOtherPercentage: 10,
        workTimeThisPercentage: 10,
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
