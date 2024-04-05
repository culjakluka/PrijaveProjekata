import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { firstInputFormData } from './data.js';

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff"
    },
    section: {
        margin: 20,
        padding: 20,
        flexGrow: 1,
        alignSelf: "flex-start",
        fontSize : "15px"
    },
    documenttitle : {        
        color: '#A4A4A4',
        alignSelf: 'center',
        fontSize : '30px',
        marginBottom : '10px'
    },
    questio : {

    },
    label: {
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#B0355E",
        margin: 0,
    },
    value: {
        marginBottom: 10,
        fontWeight : "bold"
    }
});

const FirstInputFormPDF = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.documenttitle}>NAMJERA PRIJAVE</Text>

                    <Text style={styles.question}>{firstInputFormData[0].question}</Text>   
                    <Text style={styles.label}>{firstInputFormData[0].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[0].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[1].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[1].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[1].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[2].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[2].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[2].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[3].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[3].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[3].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[4].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[4].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[4].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[5].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[5].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[5].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[6].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[6].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[6].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[7].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[7].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[7].value}</Text>

                    <Text style={styles.question}>{firstInputFormData[8].question}</Text>
                    <Text style={styles.label}>{firstInputFormData[8].title}</Text>        
                    <Text style={styles.value}>{firstInputFormData[8].value}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default FirstInputFormPDF;
