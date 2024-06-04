import React, { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// image
import fesbStatementHeader from "../../../resources/fesb_statement_header.png";
import fesbStatementFooter from "../../../resources/fesb_statement_footer.png";

// font -> problem with č,ć,ž 
// Register Font
Font.register({
    family: "Roboto",
    fonts: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 600 }
    ]
  })



const styles = StyleSheet.create({
    page : {
        fontFamily: "Roboto",
        fontSize: 12,
    },
    pageContainer : {
        display: "flex",
        flexDirection: "column",
        paddingLeft: 50,
        paddingRight: 50,
    },
    documentTitle : {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
        fontWeight: "600",
    },
    applicantDataSection : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        marginBottom: 30,
    },
    applicantData : {
        alignSelf: "start",	
        marginBottom: 5
    },
    dataField : {
        border: "1px solid black",
        height: "20px",
        marginBottom: 20
    },
    statementTextSection : {
        alignSelf: "start",
    },
    statementText : {
        marginBottom: 20
    },
    signatureSectionContainer : {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    signatureSection : { 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 50
    },
    signatureTitle : {
        marginBottom: 30
    },
    signatureLine : {
        width: 210,
        borderBottom: "1px solid black",
    },
    documentFooter : {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 10
    }
    
});

const DepartmentHeadStatementPDF = ({ nameSurnameApplicant, nameSurnameDepartmentHead }) => {

    return(
        <Document> 
            <Page size="A4" style={styles.page}>
                <Image src={fesbStatementHeader}/>
                <View style={styles.pageContainer}>
                    <Text style={styles.documentTitle}>IZJAVA PREDSTOJNIKA ZAVODA</Text>
                    <View style={styles.applicantDataSection}>
                        <Text style={styles.applicantData}>Naziv zavoda</Text>
                        <View style={styles.dataField}></View>
                        <Text style={styles.applicantData}>Ime i prezime predstojnika zavoda</Text>
                        <View style={styles.dataField}></View>
                        <Text style={styles.applicantData}>Naziv projekta za čiju prijavu se traži suglasnost</Text>
                        <View style={styles.dataField}></View>
                        <Text style={styles.applicantData}>Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a</Text>
                        <View style={styles.dataField}></View>
                    </View>
                    <View>
                        <Text style={styles.statementText}>Zavod je upoznat s gore navedenim projektnim prijedlogom te se daje suglasnost za prijavu predmetnog Projekta.</Text>
                        <Text style={styles.statementText}>Zavod će osigurati radni prostor za novozaposlene osobe te prostor za smještaj opreme koja će biti nabavljena u sklopu navedenog projekta (ukoliko je primjenjivo).</Text>
                        <Text style={styles.statementText}>Ova Izjava je sastavni dio obrasca Traženje suglasnosti za prijavu projekta, ispunjenog od strane {nameSurnameApplicant}.</Text>
                    </View>
                    <View style={styles.signatureSectionContainer}>
                        <View style={styles.signatureSection}>
                            <Text style={styles.signatureTitle}>Predstojnik zavoda</Text>
                            <View style={styles.signatureLine}></View>
                            <Text>{nameSurnameDepartmentHead}</Text>
                        </View>
                    </View>
                </View>
                <Image style={styles.documentFooter} src={fesbStatementFooter}/>
            </Page>
        </Document>
    )
}

export default DepartmentHeadStatementPDF;