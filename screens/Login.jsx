import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {getAuth,getReactNativePersistence,initializeAuth,signInWithEmailAndPassword} from 'firebase/auth'

import {initializeApp, getApps, getApp} from 'firebase/app'
import {firebaseConfig} from '../firebase-config'

const Login = ({navigation}) => {
  const [logged_user, setLoggedUser] = React.useState(1)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  let app;
  let auth;

  /* ----------- App Initialization ------------ */
  if (!getApps().length) {
    try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    })}
    
    catch (err) {
      /* console.log("Error initializing"); */
        }
      }
    else{
    app = getApp();
    auth = getAuth();}
  /* ----- Save session information to local storage -----*/
  const guardarSesion = async (usuario) => {
      try {
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
      } catch (error) {
        console.log('Error al guardar la información de sesión:', error);
      }
    };
  

  /* Function to check if there is a session started in local storage */
  const verificarSesion = async () => {
    try {
      const usuario = await AsyncStorage.getItem('usuario');
      return usuario != null ? JSON.parse(usuario) : null;
    } catch (error) {
      console.log('Error al verificar la información de sesión:', error);
      return null;
    }
  };

  useEffect(() => {
    verificarSesion().then((usuario) => {
      if (usuario) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
      else {setLoggedUser(0)}
    });
  }, []);

  /* ------- Function to sign in in the App ---------  */
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, "anthony.crespoy@gmail.com", '123456')
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log(user.uid);
        /* Save session information to local storage */
        guardarSesion(user.uid);
  
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  
  if (logged_user===0){
    return (
        <View style={styles.container}>
          {/*---------------- Kichwa Yachay Logo ----------------*/}
        <Image
                source={require('../assets/logo.png')} 
                style={styles.logoApp}
                resizeMode="contain"
         />
        {/*---------------- Login Form ----------------*/}
        <Text style={styles.subTitle}>Ingresa tus datos </Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setEmail(text)}
        placeholder="Usuario o correo" 
        />
        <TextInput style={styles.textInput} onChangeText={(text) => setPassword(text)}
        placeholder="Contraseña"
        secureTextEntry={true} 
        />
        {/*---------------- Ingresar Button ----------------*/}
        <TouchableOpacity style={styles.buttonContainer} onPress ={handleSignIn}>
          <Text style={styles.buttonText}> 
          Ingresar </Text> 
        </TouchableOpacity>
  
        <View style={styles.messageContainer}>
          <Text style={{color:'gray'}}>No tienes cuenta aún?⠀
            <Text
              style={{color: 'gray',fontWeight: 'bold'}}
              onPress={() => navigation.navigate('Registro')}
            >
            Regístrate
            </Text>
          </Text>
          </View>
      {/* ------Social Buttons to login with Fb and Gmail ----- */}
{/*           <View style={styles.socialButtonsContainer}> 
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
          </View> */}

        <StatusBar style="auto" />
      </View>     
  )

}
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
      marginTop: '6%',
      borderRadius: 10,
      backgroundColor: '#fff'
    },
  
    buttonContainer: {
      backgroundColor: "#721930",
      marginTop: 30,
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
      width: 240,
      height: 110,
      marginBottom: 40
    },
  })

  export default Login