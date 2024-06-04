import React, { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// image
import fesbStatementHeader from "../../../resources/fesb_statement_header.png";

// font -> problem with č,ć,ž 
// Register Font
Font.register({
    family: "Roboto",
    fonts: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 }
    ]
  })

const DepartmentHeadStatementPDF = ({data, title}) => {

    const styles = StyleSheet.create({
        page : {
            fontFamily: "Roboto",
            fontSize: 12,
        },
        pageContainer : {
            paddingLeft: 50,
            paddingRight: 50,
            alignItems: "center"
        },
        documentTitle : {
            marginTop: 20,
            marginBottom: 20
        },
        applicantInfoSection : {
            marginBottom: "50"
        },
        applicantData : {
            alignSelf: "start",	
        },
        statementTextSection : {

        },
        statementText : {
            alignSelf: "start",
        },
        signatureSection : {

        },
        
    });

    return(
        <Document> 
            <Page size="A4" style={styles.page}>
            <Image src={fesbStatementHeader}/>
                <View style={styles.pageContainer}>
                    <Text style={styles.documentTitle}>IZJAVA PREDSTOJNIKA ZAVODA</Text>
                    <View >
                        <Text>Naziv zavoda</Text>
                        <View></View>
                        <Text>Ime i prezime predstojnika zavoda</Text>
                        <View></View>
                        <Text>Naziv projekta za čiju prijavu se traži suglasnost</Text>
                        <View></View>
                        <Text>Prijavitelj projekta/voditelj projektnog tima sa strane FESB-a</Text>
                        <View></View>
                    </View>
                    <View>
                        <Text style={styles.statementText}>Zavod je upoznat s gore navedenim projektnim prijedlogom te se daje suglasnost za prijavu predmetnog Projekta.</Text>
                        <Text style={styles.statementText}>Zavod će osigurati radni prostor za novozaposlene osobe te prostor za smještaj opreme koja će biti nabavljena u sklopu navedenog projekta (ukoliko je primjenjivo).</Text>
                        <Text style={styles.statementText}>Ova Izjava je sastavni dio obrasca Traženje suglasnosti za prijavu projekta, ispunjenog od strane ime i prezime prijavitelja projekta.</Text>
                    </View>
                    <View>
                        <Text>Predstojnik zavoda</Text>
                        <View></View>
                        <Text>titula ime prezime predstojnika zavoda</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default DepartmentHeadStatementPDF;