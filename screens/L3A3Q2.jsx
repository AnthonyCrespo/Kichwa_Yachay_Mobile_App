import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet, Button,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


  
const L3A3Q2= ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
             <Text style={styles.Title}> Actividad 3/Rurana 3</Text>
            </View>
            
            <Text style={styles.subTitle}> Escuche y repita </Text>

            <View style={{ margin: 40 }}>
            <TouchableOpacity style={styles.buttonSolution}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Challwaka pukami kan</Text>
                <Icon name="volume-up" size={20} color="black"/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSolution}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Grabar audio</Text>
                <Icon name="microphone" size={20} color="black"/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSolution}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Maykan wiwata yana kan</Text>
                <Icon name="volume-up" size={20} color="black"/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSolution}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Grabar audio</Text>
                <Icon name="microphone" size={20} color="black"/>
                </View>
            </TouchableOpacity>
        </View>


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
      justifyContent: 'center',
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
  })

  export default L3A3Q2