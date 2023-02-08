import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';

const Register = ({navigation}) => {
    
    return (
        <View style={styles.container}>
        {/* <SvgTop/> */}
        <Image
                source={require('../assets/logo.png')} 
                style={styles.logoApp}
         />

        <Text style={styles.subTitle}> Regístrate </Text>
        {/* <Text style={styles.subTitle}>REGISTRO: Ingresa tus datos </Text> */}

        <TextInput style={styles.textInput}
        placeholder="Nombre"
        />

        <TextInput style={styles.textInput}
        placeholder="Correo"
        />

        <TextInput style={styles.textInput}
        placeholder="Nombre de usuario"
        />

        <TextInput style={styles.textInput}
        placeholder="Contraseña"
        secureTextEntry={true}
        />

        <TextInput style={styles.textInput}
        placeholder="Fecha de Nacimiento"
        />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>  Registrarse </Text>
        </TouchableOpacity>
  
        <View style={styles.messageContainer}>
          <Text style={{color:'gray'}}>Al registrarte en Kichwa Yachay, aceptas nuestros
            <Text
              style={{color: 'gray',fontWeight: 'bold'}}
              onPress={() => Linking.openURL('https://www.google.com')}
            >
            Términos y Política de privacidad.
            </Text>
          </Text>
          </View>

          <View style={styles.socialButtonsContainer}> 
            <TouchableOpacity>
              <Image
                source={require('../assets/login_facebook.png')}
                style={styles.socialButton}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../assets/login_google.png')} 
                style={styles.socialButton}
              />
            </TouchableOpacity>
          </View>

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
      fontWeight: 'bold'
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
      backgroundColor: "#721930",
      marginTop: 25,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 110     },

    socialButtonsContainer: {
        marginTop: 50
      },
      
    messageContainer: {
      marginTop: 10,
      marginLeft:35,
      marginRight:35,
      textAlign: 'center'
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
  })

  export default Register