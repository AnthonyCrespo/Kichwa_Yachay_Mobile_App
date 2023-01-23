import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
const L1A2Q1 = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
             <Text style={styles.Title}> Actividad2/Rurana 2</Text>
            </View>
            
            <Text style={styles.subTitle}> Traduce la oracion </Text>

            
            <View style={{ flexDirection: 'row',margin: 60 }}>
              <Text style={styles.instructionText}> Yanami kan </Text>
              <Image style={styles.icon} source={require('../assets/sonido_icon.png')} />
            </View>
            
            <View style={{ flexDirection: 'row',margin: 60 }}>
              <TextInput style={styles. textSolution}/>
              <TextInput style={styles. textSolution}/>
            </View>

            <View style={{ flexDirection: 'row',margin: 40 }}>
              <Text style={styles.buttonSolution}>  Blanco </Text>
              <Text style={styles.buttonSolution}>  Negro  </Text>
              <Text style={styles.buttonSolution}>  es </Text>
              
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('L1A2Q2')}>
              <Text style={styles.buttonText}> Continuar </Text> 
            </TouchableOpacity>
           
          <StatusBar style="auto" />
        </View>
        
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Title: {
      fontSize: 30,
      color: 'gray',
      fontWeight: 'bold',
      translateX: 200,
      translateY: 10
    },
    subTitle: {
      fontSize: 25,
      color: '#F2570A',
      fontWeight: 'bold'
    },
    instructionText: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold'
    },
    
    textSolution: {
      padding: 10,
      paddingStart: 30,
      width: '35%',
      height: 40,
      marginTop: '5%',
      borderRadius: 10,
      backgroundColor: '#B9B6B6',
      marginRight: 20
    },
  
    buttonSolution: {
      backgroundColor: "#B9B6B6",
      marginTop: 25,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 9,
      marginRight: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
    buttonContainer: {
      backgroundColor: "#82C0CC",
      marginTop: 25,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 50
      },
    buttonText: {
      fontSize: 20,
      color: "white",
      alignSelf: "center",
      fontWeight: 'bold'
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
    }
  })

  export default L1A2Q1