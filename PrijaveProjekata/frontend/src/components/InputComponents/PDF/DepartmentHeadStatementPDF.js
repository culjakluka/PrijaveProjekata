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
    applicantDataSection : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        marginTop: 30,
        marginBottom: 30,
    },
    applicantData : {
        alignSelf: "start",	
        marginBottom: 5
    },
    dataField : {
        display: "flex",
        flexDirection: "row",
        border: "none", 
        borderBottom: "1px solid black",
        height: "20px",
        marginBottom: 20,
        paddingLeft: 5,
        justifyContent: "end"
    },
    statementTextSection : {
        alignSelf: "start",
    },
    statementText : {
        marginBottom: 20
    },
    signatureSectionContainer : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
    },
    documentInfoContainer : {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        marginTop: 30
    },
    documentInfoLine : {
        borderTop: "1px solid black",
        width: "70px",
        marginBottom: 10
    },
    documentInfo : {
        fontSize: 11,
        alignSelf: "center"
    },
    header : {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20
    },
    documentTitle : {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
        fontWeight: "600",
    }
    
});

const DepartmentHeadStatementPDF = ({ nameSurnameApplicant, departmentName, nameSurnameDepartmentHead, projectName, deanName }) => {

    return(
        <Document> 
            <Page size="A4" style={styles.page}>
                <Image src={fesbStatementHeader}/>
                <View style={styles.pageContainer}>
                    <View style={styles.header}>
                        <View style={styles.documentInfoContainer}>
                            <View style={styles.documentInfoLine}>
                                <Text style={styles.documentInfo}>Klasa</Text>
                            </View>
                            <View style={styles.documentInfoLine}>
                                <Text style={styles.documentInfo}>Ur. broj</Text>
                            </View>
                        </View>
                        <Text style={styles.documentTitle}>IZJAVA PREDSTOJNIKA ZAVODA</Text>
                    </View>

                    
                    <View style={styles.applicantDataSection}>
                        <Text style={styles.applicantData}>Naziv zavoda</Text>
                            <View style={styles.dataField}>
                                <Text>{departmentName}</Text>
                            </View>
                        <Text style={styles.applicantData}>Ime i prezime predstojnika zavoda</Text>
                            <View style={styles.dataField}>
                                <Text>{nameSurnameDepartmentHead}TEST</Text>
                            </View>
                        <Text style={styles.applicantData}>Naziv projekta za čiju prijavu se traži suglasnost</Text>
                            <View style={styles.dataField}>
                                <Text>{projectName}</Text>
                            </View>
                        <Text style={styles.applicantData}>Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a</Text>
                            <View style={styles.dataField}>
                                <Text>{nameSurnameApplicant}</Text>
                            </View>
                    </View>
                    <View>
                        <Text style={styles.statementText}>Zavod je upoznat s gore navedenim projektnim prijedlogom te se daje suglasnost za prijavu predmetnog Projekta.</Text>
                        <Text style={styles.statementText}>Zavod će osigurati radni prostor za novozaposlene osobe te prostor za smještaj opreme koja će biti nabavljena u sklopu navedenog projekta (ukoliko je primjenjivo).</Text>
                        <Text style={styles.statementText}>Ova Izjava je sastavni dio obrasca Traženje suglasnosti za prijavu projekta, ispunjenog od strane {nameSurnameApplicant}.</Text>
                    </View>
                    <View style={styles.signatureSectionContainer}>
                        <View style={styles.signatureSection}>
                            <Text style={styles.signatureTitle}>Dekan</Text>
                            <View style={styles.signatureLine}></View>
                            <Text>{deanName}</Text>
                        </View> 
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