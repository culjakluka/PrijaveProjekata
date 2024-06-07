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
    elementInfoProjectTeam : { 
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10px",
        whiteSpace: "normal", // Allow text to wrap within the elementInfo container
    },
    memberInfoContainer : {
        display: "flex",
        flexDirection: "column",
        marginTop: "5px",
    },
    memberInfo : {
        display: "flex",
        flexDirection: "row",
        marginBottom: "3px",
    },
    memberNameSurname : {
        marginLeft: "5px",
        fontWeight: "bold",
    },
    memberProjectPercentage : {
        marginLeft: "5px",
    },
    otherProjectContainer : {
        display: "flex",
        flexDirection: "row",
        paddingLeft: "10px",    
    },
    otherProjectName : {
        marginLeft: "5px",
    },
    otherProjectPercentage : {
        marginLeft: "5px",
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
                                {element.elements.map((member, index) => {
                                    return (
                                        member.title != "PROJEKTNI TIM" ? 
                                        <View style={styles.elementInfo} key={index}>
                                            <Text style={styles.label}> {member.title ? member.title + " : " : ""}</Text>
                                            <Text style={styles.value}>{member.value}</Text>
                                        </View>
                                        :
                                        <View style={styles.elementInfoProjectTeam} key={index}> 
                                            {member.projectTeam.map((member, index) => {
                                                return (
                                                    <View style={styles.memberInfoContainer} key={index}>
                                                        <View style={styles.memberInfo}>
                                                            <Text style={styles.memberNameSurname}> {member.nameSurname}</Text>
                                                            <Text style={styles.memberProjectPercentage}>{member.thisProjectPercentage}</Text>
                                                        </View>
                                                        {member.otherProjects.map((otherProject, index) => {
                                                            return (
                                                                <View style={styles.otherProjectContainer}>
                                                                    <Text style={styles.otherProjectName}>{otherProject.otherProjectName}</Text>
                                                                    <Text style={styles.otherProjectPercentage}>{otherProject.otherProjectPercentage}</Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                );
                                            })}
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
