import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    fonts: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 600 }
    ]
})

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: "30px 50px 30px 50px",
        fontFamily: "Roboto",
        fontSize: 12,
    },
    section: {
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
        alignItems: "center",
        paddingRight: "10px",
        paddingLeft: "10px",
        flexWrap: "wrap", // Allow wrapping if value is longer than available width
        whiteSpace: "normal", // Allow text to wrap within the elementInfo container
    },
    label: {
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#B0355E",
        flexWrap : "wrap",
    },
    value: {
        marginBottom: 5,
        flexWrap : "wrap",
        marginLeft : "5px",
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
                                            <Text style={styles.label}> {element.title ? element.title + " : " : ""}</Text>
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
