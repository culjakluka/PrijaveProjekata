// this data is shaped in the way that it corresponds to the structure of the PDF document
// firstInputFormData for first form and secondInputFormData for second form

const firstInputFormData = [
  {
    "question" : "1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a",
    "elements" : [
      {
        "title" : "IME I PREZIME",
        "value" : "Pero Peric"
      },
      {
        "title" : "TITULA",
        "value" : "Dr.sc."
      },
      {
        "title" : "ZAVOD",
        "value" : "Zavod za elektrotehniku i racunarstvo"
      },
      {
        "title" : "E-MAIL",
        "value" : "peroperic@gmail.com"
      }
    ]
  },
  {
    "question" : "2. Naziv, akronim i rok za prijavu",
    "elements" : [
      {
        "title" : "NAZIV PROJEKTA",
        "value" : "PrijaveProjekata"
      },
      {
        "title" : "AKRONIM",
        "value" : "PriProj"
      },
      {
        "title" : "ROK ZA PRIJAVU",
        "value" : "01.01.2025."
      }
    ]
  },
  {
    "question" : "3. Sažetak projekta (do 200 znakova)",
    "elements" : [
      {
        "title" : "SAŽETAK PROJEKTA",
        "value" : "t is a long established fact that a reader will" + 
        "be distracted by the readable content of a page when looking" + 
        "at its layout. The point of using Lorem Ipsum is that it has a" +  
        "more-or-less normal distribution of letters, as opposed to using " + 
        "'Content here, content here', making it look like readable English." + 
        "Many desktop publishing packages and web page editors now use Lorem" + 
        "Ipsum as their default model text, and a search for 'lorem ipsum' will" + 
        "uncover many web sites still in their infancy. Various versions have evolved" + 
        "over the years, sometimes by accident, sometimes on purpose (injected humour and" + 
        " the like)."
      }
    ]
  },
  {
    "question" : "4. Poveznica na natječaj",
    "elements" : [
      {
        "title" : "LINK NA STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA ",
        "value" : "https://www.index.hr/vijesti/clanak/francuska-demonstrira-moc-rusi-nas-cekaju-u-mediteranu-mi-gledamo-njih-a-oni-nas/2571237.aspx?index_ref=naslovnica_vijesti_prva_d"
      }
    ]
  },
  {
    "question" : "5. Ostali partneri na projektu",
    "elements" : [
      {
        "title" : "PRIJAVITELJ PROJEKTA/VODECI PARTNER (INSTITUCIJA, TVRTKA...) ",
        "value" : "FESB"
      }
    ]
  },
  {
    "question" : "6. Ostali partneri na projektu",
    "elements" : [ 
      {
        "title" : "OSTALI PARTNERI NA PROJEKTU",
        "value" : "Nema ostalih partnera na projektu"
      }
    ]
  },
  {
    "question" : "7. Proracun projekta",
    "elements" : [
      {
        "title" : "UKUPNA VRIJEDNOST",
        "value" : "100%"
      },
      {
        "title" : "DIO PRORACUNA KOJI PRIPADA FESB-U",
        "value" : "100%"
      }
    ]
  },
  {
    "question" : "8. Jesu li u okviru projekta planirana nova radna mjesta",
    "elements" : [
      {
        "title" : "",
        "value" : "Da"
      }
    ]
  },
  {
    "question" : "9. Projektni tim",
    "elements" : [
      {
        "title" : "PROJEKTNI TIM",
        "projectTeam" : [
          {
            "nameSurname" : "Pero Peric",
            "thisProjectPercentage" : "100%",
            "otherProjects" : [
              {
                "otherProjectName" : "Projekt 1",
                "otherProjectPercentage" : "54%"
              },
              {
                "otherProjectName" : "Projekt 2",
                "otherProjectPercentage" : "34%"
              }
            ]
          },
          {
            "nameSurname" : "Ivo Ivic",
            "thisProjectPercentage" : "100%",
            "otherProjects" : [
              {
                "otherProjectName" : "Projekt 1",
                "otherProjectPercentage" : "54%"
              },
              {
                "otherProjectName" : "Projekt 2",
                "otherProjectPercentage" : "34%"
              },
              {
                "otherProjectName" : "Projekt 3",
                "otherProjectPercentage" : "12%"
              }
            ]
          }
        ] 
      }
    ]
  }
]

const secondInputFormData = [
  {
    "question" : "1. Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a",
    "elements" : [
      {
        "title" : "IME I PREZIME",
        "value" : "Pero Peric"
      },
      {
        "title" : "TITULA",
        "value" : "Dr.sc."
      },
      {
        "title" : "ZAVOD",
        "value" : "Zavod za elektrotehniku i racunarstvo"
      },
      {
        "title" : "E-MAIL",
        "value" : "peroperic@gmail.com"
      },
      {
        "title" : "MOBITEL",
        "value" : "091 123 4567"
      },
      {
        "title" : "POSTOTAK RADNOG VREMENA U OKVIRU PREDLOŽENOG PROJEKTA",
        "value" : "100%"
      },
      {
        "title" : "POSTOTAK RADNOG VREMENA U OKVIRU OSTALIH PROJEKATA U PROVEDBI",
        "value" : "0%"
      },
      {
        "title" : "NAPOMENA",
        "value" : "Nema napomene"
      }
    ]
  },
  {
    "question" : "2. Naziv, akronim i rok za prijavu",
    "elements" : [
      {
        "title" : "NAZIV PROJEKTA",
        "value" : "PrijaveProjekata"
      },
      {
        "title" : "AKRONIM",
        "value" : "PriProj"
      },
      {
        "title" : "ROK ZA PRIJAVU",
        "value" : "01.01.2025."
      }
    ]
  },
  {
    "question" : "3. Sažetak projekta (do 200 znakova)",
    "elements" : [
      {
        "title" : "SAŽETAK PROJEKTA",
        "value" : "t is a long established fact that a reader will" + 
        "be distracted by the readable content of a page when looking" + 
        "at its layout. The point of using Lorem Ipsum is that it has a" +  
        "more-or-less normal distribution of letters, as opposed to using " + 
        "'Content here, content here', making it look like readable English." + 
        "Many desktop publishing packages and web page editors now use Lorem" + 
        "Ipsum as their default model text, and a search for 'lorem ipsum' will" + 
        "uncover many web sites still in their infancy. Various versions have evolved" + 
        "over the years, sometimes by accident, sometimes on purpose (injected humour and" + 
        " the like)."
      }
    ]
  },
  {
    "question" : "4. Poveznica na natjecaj",
    "elements" : [
      {
        "title" : "LINK NA STRANICU",
        "value" : "www.fesb.hr"
      }
    ]
  },
  {
    "question" : "5. Izvor financiranja",
    "elements" : [
      {
        "title" : "",
        "value" : "HZZO"
      }
    ]
  },
  {
    "question" : "6. Vrsta projekta",
    "elements" : [
      {
        "title" : "",
        "value" : "ZNANSTEVNI PROJEKT"
      }
    ]
  },
  {
    "question" : "7. Ocekivani pocetak projekta",
    "elements" : [
      {
        "title" : "",
        "value" : "01.01.2025."
      }
    ]
  },
  {
    "question" : "8. Ocekivano trajanje projekta u mjesecima",
    "elements" : [
      {
        "title" : "",
        "value" : "12"
      }
    ]
  },
  {
    "question" : "9. Koordinator projekta",
    "elements" : [
      {
        "title" : "PRIJAVITELJ PROJEKTA/VODECI PARTNER (INSTITUCIJA, TVRTKA...)",
        "value" : "FESB"
      }
    ]
  },
  {
    "question" : "10. Ostali partneri na projektu",
    "elements" : [
      {
        "title" : "OSTALI PARTNERI NA PROJEKTU",
        "value" : "Nema ostalih partnera na projektu"
      }
    ]
  },
  {
    "question" : "11. U projektu kao partner sudjeluju gospodarski subjekti",
    "elements" : [ 
      {
        "title" : "",
        "value" : "Da"
      }
    ]
  },
  {
    "question" : "12. Ukupna vrijednost projekta",
    "elements" : [
      {
        "title" : "",
        "value" : "1.000.000,00 $"
      }
    ]
  },
  {
    "question" : "13. Proracun projekta",
    "elements" : [
      {
        "title" : "DIO PRORACUNA KOJI PRIPADA FESB-U",
        "value" : "12%"
      },
      {
        "title" : "TROŠAK POSTOJECEG OSOBLJA",
        "value" : "2323"
      },
      {
        "title" : "TROŠAK NOVOZAPOSLENOG OSOBOLJA",
        "value" : "32432"
      },
      {
        "title" : "NEIZRANI TROŠKOVI",
        "value" : "15%"
      },
      {
        "title" : "TROŠAK I POPIS OPREME KOJA SE NABAVLJA",
        "value" : "23312"
      },
      {
        "title" : "TROŠAK AMORTIZACIJE OPREME",
        "value" : "3423"
      },
      {
        "title" : "TROŠAK VANJSKIH USLUGA",
        "value" : "3423"
      },
      {
        "title" : "PUTNI TROŠAK/TROŠAK KOTIZACIJA/STRUCNOG USAVRŠAVANJA",
        "value" : "232"
      },
      {
        "title" : "NAPOMENA",
        "value" : "NEMA NAPOMENE"
      },
    ]
  },
  {
    "question" : "14. Proracun za ostale partenere",
    "elements" : [
      {
        "title" : "", 
        "value" : "1223"
      }
    ]
  },
  {
    "question" : "15. Traženo financiranje",
    "elements" : [
      {
        "title" : "", 
        "value" : "1223"
      }
    ]
  },
  {
    "question" : "16. Predujam(iznos ili postotak)",
    "elements" : [
      {
        "title" : "", 
        "value" : "1223"
      }
    ]
  },
  {
    "question" : "17. Iznos vlastitog sufinanciranja projekta",
    "elements" : [
      {
        "title" : "", 
        "value" : "1234"
      }
    ]
  },
  {
    "question" : "18. Jesu li u projektu planirana nova radna mjesta",
    "elements" : [
      {
        "title" : "", 
        "value" : "Da"
      }
    ]
  },
  {
    "question" : "19. Projektni tim",
    "elements" : [
      {
        "title" : "PROJEKTNI TIM",
        "projectTeam" : [
          {
            "nameSurname" : "Pero Peric",
            "thisProjectPercentage" : "100%",
            "otherProjects" : [
              {
                "otherProjectName" : "Projekt 1",
                "otherProjectPercentage" : "54%"
              },
              {
                "otherProjectName" : "Projekt 2",
                "otherProjectPercentage" : "34%"
              }
            ]
          },
          {
            "nameSurname" : "Ivo Ivic",
            "thisProjectPercentage" : "100%",
            "otherProjects" : [
              {
                "otherProjectName" : "Projekt 1",
                "otherProjectPercentage" : "54%"
              },
              {
                "otherProjectName" : "Projekt 2",
                "otherProjectPercentage" : "34%"
              },
              {
                "otherProjectName" : "Projekt 3",
                "otherProjectPercentage" : "12%"
              }
            ]
          }
        ] 
      }
    ]
  },
  {
    "question" : "20. Planirate li koristiti konzultantsku pomoc",
    "elements" : [
      {
        "title" : "", 
        "value" : "Da"
      }
    ]
  },  
]
  export { firstInputFormData, secondInputFormData }