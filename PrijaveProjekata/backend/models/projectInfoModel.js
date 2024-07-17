const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  filename: String, // ime file-a
  filepath: String, // lokacija file-a
});

const otherProjectInfo = new Schema({
  otherProjectName: {
    // imena ostalih projekata suradnika
    type: String,
  },
  otherProjectPercentage: {
    // postotci troška radnog vremena na ostalim projektima
    type: Number,
  },
});

const projectTeamMember = new Schema({
  nameSurname: {
    // ime i prezime suradnika na projektu
    type: String,
  },
  email: {
    // email suradnika na projektu
    type: String,
  },
  thisProjectPercentage: {
    // postotak radnog vremena u okviru predloženog projekta
    type: Number,
  },
  otherProjects: {
    // informacije o ostalim projektima na kojima sudjeluje suradnik
    type: [otherProjectInfo],
  },
});

const projectInfoSchema = new Schema(
  {
    userId: {
      // id usera koji je loginan
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    firstInputMarker: {
      // jeli ispunjena forma obrasca namjere
      type: Boolean,
      default: false,
    },
    secondInputMarker: {
      // jeli ispunjena forma traženja suglasnosti
      type: Boolean,
      default: false,
    },
    nameSurname: {
      // ime prezime voditelja projekta
      type: String,
      //    required: true
    },
    vocation: {
      // titula voditelja projekta
      type: String,
      //    required: true
    },
    department: {
      // odsjek voditelja projekta
      type: String,
      //    required: true
    },
    headOfDepartment: {
      // ime i prezime predstojnika zavoda
      type: String,
      //   required: true
    },
    email: {
      // email adresa voditelja projekta
      type: String,
      //    required: true
    },
    projectTitle: {
      // naslov projekta
      type: String,
      //    required: true
    },
    projectAcronym: {
      // akronim projekta
      type: String,
      //    required: true
    },
    applicationDeadline: {
      // rok prijave projekta
      type: Date,
      //    required: true
    },
    projectSummary: {
      // sažetak projekta
      type: String,
      //    required: true,
      maxlength: 500,
    },
    applicationURL: {
      // link na prijavu projekta
      type: String,
      //    required: true
    },
    projectApplicant: {
      // prijavitelj projekta
      type: String,
      //    required: true
    },
    projectPartners: {
      // ostali partneri na projektu
      type: String,
      //    required: true
    },
    totalValue: {
      // ukupna vrijednost projekta
      type: Number,
      //    required: true
    },
    fesbValuePart: {
      // dio proračuna koji pripada FESBU
      type: Number,
      //    required: true
    },
    newEmploymentBoolean: {
      // jesu li predviđena nova radna mjesta
      type: Boolean,
      //    required: true
    },
    projectTeam: {
      // članovi projektnog tima s FESB-a
      type: [projectTeamMember],
      //    requred: true
    },
    mobilePhoneNumber: {
      // broj mobitela voditelja projekta
      type: String,
      //    required: true
    },
    workTimeThisPercentage: {
      // postotak radnog vremena u okviru predloženog projekta
      type: Number,
      //    required: true
    },
    workTimeOtherPercentage: {
      // postotak radnog vremena u okviru ostalih projekata projekta
      type: Number,
      //    required: true
    },
    teamLeaderNote: {
      // napomena prijavitelja projektnog tima
      type: String,
      //    required: true
    },
    sourceOfFunding: {
      // izvor sredstava
      type: String,
      //    required: true
    },
    projectType: {
      // tip projekta
      type: String,
      //    required: true
    },
    expectedProjectBeginning: {
      // očekivani početak projekta
      type: Date,
      //    required: true
    },
    expectedProjectDurationInMonths: {
      // očekivano trajanje projekta u mjesecima
      type: Number,
      //    required: true
    },
    economicSubjectInvolvement: {
      // u projektu kao partner sudjeluje gospodarski subjekt
      type: Boolean,
      //    required: true
    },
    currentPersonnelExpense: {
      // trošak postojućeg osoblja
      type: Number,
      //    required: true
    },
    newPersonnelExpense: {
      // trošak novogzaposlenog osoblja
      type: Number,
      //    required: true
    },
    equipmentDescriptionAndExpense: {
      // trošak i opis opreme koja se nabavlja
      type: String,
      //    required: true
    },
    equipmentAmortizationExpense: {
      // trošak amortizacije opreme
      type: Number,
      //    required: true
    },
    otherServicesExpense: {
      // trošak vanjskih usluga
      type: Number,
      // required: true
    },
    materialExpense: {
      // trošak materijala i sitnog inventara
      type: Number,
      //    required: true
    },
    travelRegistrationEducationExpense: {
      // trošak puta, kotizacije i profesionalnog usavršavanja
      type: Number,
      //    required: true
    },
    expenseNote: {
      // napomena o ne navedenim stavkama proračuna
      type: String,
      //    required: true
    },
    partnerExpense: {
      // proračun za ostale partnere
      type: Number,
      //    required: true
    },
    requestedFunding: {
      // traženo financiranje
      type: Number,
      //    required: true
    },
    downPayment: {
      // predujam
      type: Number,
      //    required: true
    },
    personalFinancingExpense: {
      // kako se planira sufinancirati nefinancirani dio projekta
      type: String,
      //    required: true
    },
    consultantServices: {
      // planira li se koristiti konzultantska pomoć prijave projekta
      type: Boolean,
      //    required: true
    },
    consultantExpense: {
      // trošak na konzultanta
      type: Number,
    },
    consultantExpenseSource: {
      // izvor sredstava za trošak za konzultanta
      type: String,
    },
    requiredDocumentationFESB: {
      // opis dokumentacije FESB-a potrebne za prijavu projekta
      type: String,
      //    required: true
    },
    pdfDocuments: {
      // svi pdfovi koje user moze uploadati
      pdfs: [pdfSchema],
    },
    state: {
      // stanje projekta
      type: String,
      enum: [
        "firstFormSubmitted",
        "firstFormApproved",
        "secondFormSubmitted",
        "secondFormApproved",
        "projectRejected",
      ],
      default: "firstFormSubmitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectInfo", projectInfoSchema);
