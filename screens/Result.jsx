import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getApp } from 'firebase/app'
import { getFirestore,updateDoc,setDoc,  collection, getDocs,getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';



const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;


const Result = ({route, navigation}) => {
    const {puntuation3, time_taken, unit, lesson, activity, subtitle, subtitle_esp} = route.params;
    const app = getApp(); 
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
/*      useEffect(()=>{ 
    console.log(`El UID del usuario actual es: ${userId}`);
       },[])
 */
    /* ---------------------------------------------------- -------------------------- */ 
    /* -------------------------- Save Data in Firebase --------------------------- */
    /* ---------------------------------------------------- -------------------------- */ 
    async function updateUserData(userId, unidad, leccion, actividad, score, tiempo) {
      const db = getFirestore();
      const userDocRef = doc(db, 'Users', userId);
      const userDoc = await getDoc(userDocRef);
      let question_status
      /* If the document does not exist, we create it and add the first unit  */
      question_status = score > 50 ? "Aprobado": "Reprobado"
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { unidad: { unidad: { leccion: { leccion: { actividad: { actividad: { question_status , score, tiempo } } } } } } });
        console.log('Documento creado con la primera unidad');
        return;
      }
      
      const userData = userDoc.data();
      
      /* If the "units" field does not exist, we create it and add the first unit  */
      if (!userData.unidad) {
        await updateDoc(userDocRef, { unidad: { [unidad]: { leccion: { [leccion]: { actividad: { [actividad]: { question_status , score, tiempo  } } } } } } });
        console.log('Campo "unidad" creado con la primera unidad');
        return;
      }
      
      /* If the unit does not exist, we create it and add the first lesson */
      if (!userData.unidad[unidad]) {
        await updateDoc(userDocRef, { [`unidad.${unidad}`]: { leccion: { [leccion]: { actividad: { [actividad]: { question_status , score, tiempo } } } } } });
        console.log(`Unidad ${unidad} creada con la primera lección`);
        return;
      }
      
      /* If the lesson does not exist, we create it and add the first activity */ 
      if (!userData.unidad[unidad].leccion[leccion]) {
        await updateDoc(userDocRef, { [`unidad.${unidad}.leccion.${leccion}`]: { actividad: { [actividad]: { question_status , score, tiempo  } } } });
        console.log(`Lección ${leccion} creada con la primera actividad`);
        return;
      }
      
      /* If the activity does not exist, create it */
      if (!userData.unidad[unidad].leccion[leccion].actividad[actividad]) {
        await updateDoc(userDocRef, { [`unidad.${unidad}.leccion.${leccion}.actividad.${actividad}`]: { question_status , score, tiempo  } });
        console.log(`Actividad ${actividad} creada`);
        return;
      }
      
      /* If the activity already exists, we update it with the new data */
      question_status = userData.unidad[unidad].leccion[leccion].actividad[actividad].question_status;
      //console.log(question_status)
      question_status = question_status === "Aprobado" ? "Aprobado": 
                         (score > 50 ? "Aprobado": "Reprobado")
              
      previous_score = userData.unidad[unidad].leccion[leccion].actividad[actividad].score; 
      previous_time = userData.unidad[unidad].leccion[leccion].actividad[actividad].tiempo; 
      score = previous_score >= score ? previous_score: score  
      tiempo =  previous_score >= score ? previous_time: tiempo  

      await updateDoc(userDocRef, { [`unidad.${unidad}.leccion.${leccion}.actividad.${actividad}`]: { question_status, score, tiempo } });
      console.log(`Actividad ${actividad} actualizada`);
    }

    updateUserData(userId, unit, lesson, activity, puntuation3, time_taken, true);
    
    return (

    <View style={styles.container}>
      <Image
        style={{height:200, width:200, position:"absolute",top:30}}
        resizeMode="contain"
        source={require("../assets/results.png")}></Image>
      <View style={{   height: 70,
                       width:"70%", 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       marginVertical:10,
                       borderRadius:20
                      }}>
      <Text style={{fontSize:50,
         fontWeight: 'bold', 
         color:"#56AD5C"}}> Puntaje:  </Text>
      </View >


      <Text style={{fontSize:70, 
                    color: "black",
                    fontWeight: 'bold'
                    }}> {puntuation3} </Text>
      <Text style={{fontSize:55, 
                    fontWeight: 'bold',
                    color:"#2E7BB0"}}> Tiempo total:  </Text>

      <Text style={{fontSize:80, 
      color: "black",
      fontWeight: 'bold'
      }}> {time_taken}s </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Lessons', {unit, lesson, subtitle,subtitle_esp} )}
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
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: topMargin,
      backgroundColor:"#fff"
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
      paddingHorizontal: 125,
      
      },

      title_container:{
        backgroundColor: '#292D3E', 
        width: '100%',
        alignContent:"center",
        alignItems:"center",
        paddingVertical:20,
        position:"absolute",
        top:0
        
      },
  
      continueButton: {
        width: 300,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#A92A7B",
        marginTop:80,
        borderRadius: 50,
        position:"absolute",
        bottom:50
      },
      continueText:{
        color: '#fff',
        fontSize: 24
      }
  })

  export default Result