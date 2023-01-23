import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet,Text, View,Image, TouchableOpacity } from 'react-native';
const L2A2Q4 = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
             <Text style={styles.Title}> Actividad 2/Rurana 2</Text>
            </View>
            
            <Text style={styles.subTitle}> Completa la oración </Text>

            
            <View style={{ flexDirection: 'row',margin: 40 }}>
              <Text style={styles.instructionText}> Amaru </Text>
              <Text style={styles.instructionText}> __________ </Text>
              <Text style={styles.instructionText}> puka </Text>
              <Text style={styles.instructionText}> __________ </Text>
              <Text style={styles.instructionText}> kan </Text>
            </View>

            <View style={{ flexDirection: 'row',margin: 40 }}>
              <Text style={styles.buttonSolution}>  ta </Text>
              <Text style={styles.buttonSolution}>  ka  </Text>
              <Text style={styles.buttonSolution}>  mi </Text>
            </View>

            <Image style={styles.imagen} source={require('../assets/serpiente_roja.png')} />

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}> Finalizar </Text> 
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
    },
    imagen: {
        width: 150,
        height: 150,
      }
  })

  export default L2A2Q4 