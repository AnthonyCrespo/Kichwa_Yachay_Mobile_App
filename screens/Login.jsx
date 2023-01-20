import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity  } from 'react-native';


const Login = () => {
    return (
        <View style={styles.container}>
        {/* <SvgTop/> */}
        <Image
                source={require('../assets/logo.png')} 
                style={styles.logoApp}
         />

        <Text style={styles.subTitle}>Ingresa tus datos </Text>
        <TextInput style={styles.textInput}
        placeholder="Usuario o correo" 
        />
        <TextInput style={styles.textInput}
        placeholder="Contraseña"
        secureTextEntry={true} 
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}> Ingresar </Text>
        </TouchableOpacity>
  
        <View style={styles.messageContainer}>
          <Text style={{color:'gray'}}>No tienes cuenta aún?⠀
            <Text
              style={{color: 'gray',fontWeight: 'bold'}}
              onPress={() => navigation.navigate('Register')}
            >
            Regístrate
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
  })

  export default Login