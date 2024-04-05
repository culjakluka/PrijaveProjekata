import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { firstInputFormData } from './data.js';

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        
    },
    section: {
        margin: 20,
        padding: 20,
        flexGrow: 1,
        alignSelf: "flex-start",
        fontSize : "15px"
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
        color : "#6e6e6e"
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

const FirstInputFormPDF = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.documentTitle}>NAMJERA PRIJAVE</Text>
                    {firstInputFormData.map((element, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.question}>{element.question}</Text>
                                {element.elements.map((element, index) => {
                                    return (
                                        <View style={styles.elementInfo} key={index}>
                                            <Text style={styles.label}>{element.title} :</Text>
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
