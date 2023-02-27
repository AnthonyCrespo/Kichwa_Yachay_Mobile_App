import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList, Dimensions   } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getApp } from 'firebase/app'
import { getFirestore,updateDoc,setDoc,  collection, getDocs,getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const Result = ({route, navigation}) => {
    const {puntuation3, time_taken, unit, lesson, activity, subtitle} = route.params;
    const app = getApp(); 
    //const db = getFirestore(app);
    const auth = getAuth(app);


    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
     useEffect(()=>{ 
    console.log(`El UID del usuario actual es: ${userId}`);
       },[])

    //const userDoc = doc(db, 'Users', userId )    console.log(userDoc.data())

    async function updateUserData(userId, unidad, leccion, actividad, score, tiempo, completado) {
      const db = getFirestore();
      const userDocRef = doc(db, 'Users', userId);
      const userDoc = await getDoc(userDocRef);
      
      // Si el documento no existe, lo creamos y agregamos la primera unidad
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { unidad: { unidad: { leccion: { leccion: { actividad: { actividad: { completado, score, tiempo } } } } } } });
        console.log('Documento creado con la primera unidad');
        return;
      }
      
      const userData = userDoc.data();
      
      // Si el campo "unidades" no existe, lo creamos y agregamos la primera unidad
      if (!userData.unidad) {
        await updateDoc(userDocRef, { unidad: { [unidad]: { leccion: { [leccion]: { actividad: { [actividad]: { completado, score, tiempo  } } } } } } });
        console.log('Campo "unidad" creado con la primera unidad');
        return;
      }
      
      // Si la unidad no existe, la creamos y agregamos la primera lección
      if (!userData.unidad[unidad]) {
        await updateDoc(userDocRef, { [`unidad.${unidad}`]: { leccion: { [leccion]: { actividad: { [actividad]: { completado, score, tiempo } } } } } });
        console.log(`Unidad ${unidad} creada con la primera lección`);
        return;
      }
      
      // Si la lección no existe, la creamos y agregamos la primera actividad
      if (!userData.unidad[unidad].leccion[leccion]) {
        await updateDoc(userDocRef, { [`unidad.${unidad}.leccion.${leccion}`]: { actividad: { [actividad]: { completado, score, tiempo  } } } });
        console.log(`Lección ${leccion} creada con la primera actividad`);
        return;
      }
      
      // Si la actividad no existe, la creamos
      if (!userData.unidad[unidad].leccion[leccion].actividad[actividad]) {
        await updateDoc(userDocRef, { [`unidad.${unidad}.leccion.${leccion}.actividad.${actividad}`]: { completado, score, tiempo  } });
        console.log(`Actividad ${actividad} creada`);
        return;
      }
      
      // Si la actividad ya existe, la actualizamos con los nuevos datos
      await updateDoc(userDocRef, { [`unidad.${unidad}.leccion.${leccion}.actividad.${actividad}`]: { completado, score, tiempo } });
      console.log(`Actividad ${actividad} actualizada`);
    }

    updateUserData(userId, unit, lesson, activity, puntuation3, time_taken, true);
    
    return (

    <View style={styles.container}>
      <Text style={{fontSize:40, fontWeight: 'bold'}}> Puntaje obtenido:  </Text>
      <Text style={{fontSize:80, marginTop:20, color: '#A43074',fontWeight: 'bold'}}> {puntuation3} </Text>
      <Text style={{fontSize:40, fontWeight: 'bold'}}> Tiempo total:  </Text>
      <Text style={{fontSize:80, marginTop:20, color: '#A43074',fontWeight: 'bold'}}> {time_taken}s </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Lessons', {lesson, subtitle} )}
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