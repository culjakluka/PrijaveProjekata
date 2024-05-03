import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: "30px 20px 30px 20px",
        fontFamily : "Helvetica"
    },
    section: {
        margin: 20,
        flexGrow: 1,
        alignSelf: "flex-start",
        fontSize : "12px"
    },
    documentTitle : {        
        color: '#A4A4A4',
        alignSelf: 'center',
        fontSize : '30px',
        marginBottom : '10px'

    },
    question : {
        marginTop : "10px",
        marginBottom : "10px",
        color : "#6e6e6e",
        fontSize : "13px",
    },
    elementInfo : {
        display: "flex",
        flexDirection: "row",
        alignContent : "center"
    },
    label: {
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#B0355E",
        marginLeft : "10px"
    },
    value: {
        marginBottom: 10,
        fontWeight : "bold",
        underline : "true",
        marginLeft : "10px"
    }
});

const FirstInputFormPDF = ({data, title}) => {

    useEffect(() => {
        console.log(data); 
    }, [])
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.documentTitle}>{title}</Text>
                    {data.map((element, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.question}>{element.question}</Text>
                                {element.elements.map((element, index) => {
                                    return (
                                        <View style={styles.elementInfo} key={index}>
                                            <Text style={styles.label}> {element.title ? element.title + ":" : ""}</Text>
                                            <Text style={styles.value}>{element.value}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}

                </View>
            </Page>
        </Document>
    );
};

export default FirstInputFormPDF;
