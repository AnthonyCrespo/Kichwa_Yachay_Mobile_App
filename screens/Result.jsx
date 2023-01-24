import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList, Dimensions   } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Result = ({route, navigation}) => {
    const {puntuation3} = route.params;
    return (

    <View style={styles.container}>
      <Text style={{fontSize:40, fontWeight: 'bold'}}> Puntaje obtenido:  </Text>
      <Text style={{fontSize:80, marginTop:20, color: '#A43074',fontWeight: 'bold'}}> {puntuation3} </Text>


      <TouchableOpacity
        onPress={() => navigation.navigate('Lessons', {lesson:1,subtitle:'Colores/Tullpukuna'}  )}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>


      <StatusBar style="auto" />   
    </View>
  )
}

const styles = StyleSheet.create({
    unitText: {
      fontSize: 18,
      color: '292D3E',
      alignSelf: "center"
    },

    container: {
      flex: 1,
      paddingTop: 50, 
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
    },

    subTitle: {
      fontSize: 20,
      color: 'gray'
    },
    textInput: {
      padding: 10,
      paddingStart: 30,
      width: '80%',
      height: 50,
      marginTop: '5%',
      borderRadius: 10,
      backgroundColor: '#fff'
    },
  
    buttonContainer: {
      backgroundColor: "#82C0CC",
      marginTop: 25,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 125
      },

    socialButtonsContainer: {
        marginTop: 100
      },
      
    messageContainer: {
      marginTop: 10,
      alignSelf: 'center'
    },
    
    buttonText: {
      fontSize: 18,
      color: "#fff",
      alignSelf: "center"
    },
    socialButton: {
      width: 300,
      height: 40,
      marginTop: 10, 
      marginHorizontal: 10,
      borderRadius: 5,
    },
    logoApp: {
      width: 200,
      height: 70,
      marginBottom: 40
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#292D3E',
        paddingHorizontal: 20,
      },
      icon: {
        width: 30,
        height: 30,
      },
      continueButton: {
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#82C0CC",
        marginTop:80,
        borderRadius: 20,
      },
      continueText:{
        color: '#fff',
        fontSize: 24
      }
  })

  export default Result