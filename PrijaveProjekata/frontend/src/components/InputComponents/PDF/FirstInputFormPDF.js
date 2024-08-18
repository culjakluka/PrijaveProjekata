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
        whiteSpace: "normal", // Allow text to wrap within the elementInfo container
    },
    memberInfoContainer : {
        display: "flex",
        flexDirection: "column",
        marginTop: "5px",
        borderBottom: "1px solid #cecece",
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
    },
    positionInfo : {
        display: "flex",
        flexDirection: "column",
        marginLeft: "5px",
        borderBottom: "1px solid #cecece",
        padding: "2px",
        width: "100%",
        marginBottom: "10px",
    }
});

// even the name is FirstInputFormPDF, this component is used to generate pdf for both input forms
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
                                    if (member.title === "PROJEKTNI TIM") {
                                        return (
                                            <View style={styles.elementInfoProjectTeam} key={index}> 
                                                {member.projectTeam.map((teamMember, teamIndex) => {
                                                    return (
                                                        <View style={styles.memberInfoContainer} key={teamIndex}>
                                                            <View style={styles.memberInfo}>
                                                                <Text style={{fontWeight: 'bold'}}>Ime člana:</Text>
                                                                <Text style={styles.memberNameSurname}> {teamMember.nameSurname}</Text>
                                                                <Text style={styles.memberProjectPercentage}>{teamMember.thisProjectPercentage}%</Text>
                                                            </View>
                                                            <Text style={{fontWeight: 'bold'}}>Ostali projekti:</Text>
                                                            {teamMember.otherProjects.map((otherProject, otherIndex) => {
                                                                return (
                                                                    <View style={styles.otherProjectContainer} key={otherIndex}>
                                                                        <Text style={styles.otherProjectName}>{otherProject.otherProjectName}</Text>
                                                                        <Text style={styles.otherProjectPercentage}>{otherProject.otherProjectPercentage}%</Text>
                                                                    </View>
                                                                );
                                                            })}
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        );
                                    } else if (member.title === "NOVA RADNA MJESTA") {
                                        return <View key={index}>
                                            <Text style={styles.label}>{member.title}</Text>
                                            {member.newEmploymentPositions.map((position, index) => {
                                                return <View style={styles.positionInfo}>
                                                    <View>
                                                        <Text style={{fontWeight: 'bold'}}>Ime radnog mjesta: </Text>
                                                        <Text>{position.positionName}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{fontWeight: 'bold'}}>Iznos brutto 2 plaće: </Text>
                                                        <Text>{position.positionSalary}€</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{fontWeight: 'bold'}}>Postotak radnog vremena: </Text>
                                                        <Text>{position.positionPercentage}%</Text>
                                                    </View>
                                                </View>;
                                            })}
                                        </View>;
                                    } else {
                                        return (
                                            <View style={styles.elementInfo} key={index}>
                                                <Text style={styles.label}> {member.title ? member.title + " : " : ""}</Text>
                                                <Text style={styles.value}>{member.value}</Text>
                                            </View>
                                        );
                                    }
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
