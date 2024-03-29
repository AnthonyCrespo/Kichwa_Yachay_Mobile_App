import React, { useState,  useEffect } from 'react';
import { Modal, StyleSheet, StatusBar, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import useCronometro from './functions/cronometer';
import {playAudio, stopAudio} from './functions/playAudio';
import images from './imagesL3A1'
import audios from './soundsL3A1';
import ProgressBar from 'react-native-progress/Bar';
import { getAuth } from 'firebase/auth';
import LoadingScreen from './loadingScreen';
import soundsAnswers from './soundsAnswers';
import Constants from 'expo-constants';


let answer;
let puntaje = 0;
let respuesta_correcta;
let audioPath = null;
const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;

const L3A1 = ({ navigation }) => {

  const app = getApp(); 
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ imageUrls, setImageUrls ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // ----- Timer -------
  const segundos = useCronometro();

  // ----- Progress Bar  ------

  const [porcentaje, setPorcentaje] = useState(0);

  
  /*--------------------------------------------------------------------------------------------  */
  /*---------------------------------------- Modal -----------------------------------------  */
  /*--------------------------------------------------------------------------------------------*/
  const handleComprobarPress = async () => {
    await stopAudio(); // waits the previous audio to stop
    setPorcentaje(porcentaje+100/questions.length);
    respuesta_correcta = answer === questions[currentQuestionIndex].correct_answer;
    let p;
    
    if (respuesta_correcta) {
      p = soundsAnswers[0].path;
      puntaje = puntaje + 100/questions.length;
    }
    else {
      p = soundsAnswers[1].path;
    }
    
    setModalVisible(true);
   //await playAudio(p);
  };


  const handleContinuePress = () => {
    setModalVisible(false);
    setSelectedOption(null);

    if (currentQuestionIndex === questions.length-1) {
      navigation.navigate("Result", {puntuation3: Math.round(puntaje), 
                                     time_taken: segundos,
                                     unit:1, 
                                     lesson:3, 
                                     activity:1,
                                     subtitle:'Tullkupuna/Wiwakuna',
                                     subtitle_esp:'Colores/Animales'});
      puntaje = 0;
    } else{
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }


  /*--------------------------------------------------------------------------------------------  */
  /*---------------------------------------- Database -----------------------------------------  */
  /*--------------------------------------------------------------------------------------------*/


 
  async function getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'L3A1'));
    // Loop through the documents
    const docs = [];
    querySnapshot.forEach(doc => {
      // Get the document data
      const data = doc.data();
      // Add the document data to the array
      docs.push(data);
    });
    setQuestions(docs);
  }

  useEffect(() => {
    getDocuments();
  }, []);

  let statement, options 
  /* If questions are not loaded yet show Loading Screen */
  if (questions === null) {
    return (
      <LoadingScreen/>
    );
  }
  statement = questions[currentQuestionIndex].statement;
  statement_esp = questions[currentQuestionIndex].statement_esp;
  options = questions[currentQuestionIndex].options;
  return (
    <View style={styles.AppContainer}>

      {/* --------- Percentage bar --------- */}
      <ProgressBar progress={porcentaje/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginVertical:20}}
                    />
      {/* --------- Statement in Kichwa --------- */}
      <Text style={styles.statementText}>{statement}</Text>
      {/* --------- Statement in Spanish --------- */}
      <Text style={styles.statementText && {fontSize:20, color:"#3259A1", fontWeight:"bold"}}>{statement_esp}</Text>

      {options.map((option, index) => (
        <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedOption(index);
          answer = option.text;
        }}
        >
          <View 
            style={selectedOption === index ? styles.selectedOptionContainer : styles.optionContainer}>  

              <View style={[styles.itemContainer, {flex:6}]}>
                {/* --------- Option Image --------- */}
                <Image 
                  style={styles.imageContainer}
                  resizeMode="contain"
                  source={(images.find((image) => image.name === option['image'])).path}/>

                 {/* --------- Option Text --------- */}
                <View style={styles.audio_textContainer}>
                    <Text style={styles.optionText}>
                      {option.text}
                    </Text>
                </View>
              </View>

              <View style={[styles.itemContainer, {flex:2}]}>
                {/* --------- Option Icon --------- */}
                <TouchableOpacity
                        style={styles.optionIcon}
                        onPress={() => {
                          audioPath = (audios.find((audio) => audio.name === option.audio)).path
                          playAudio(audioPath);
                        }}
                        >
                  <Icon name="volume-up" size={30} color="black" />
                </TouchableOpacity>
              </View>
          </View>
        </TouchableOpacity>
    ))}
      {/* --------- Comprobar Button --------- */}
      <View >
          <TouchableOpacity
            style={selectedOption === null ? styles.comprobarButton_Disabled : styles.comprobarButton_Enabled }
            disabled={selectedOption === null}
            onPress={handleComprobarPress}
          >
            <Text style={styles.comprobarText}>Comprobar</Text>
          </TouchableOpacity>
      </View>

      {/* --------- Modal after touch Comprobar button  --------- */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>

        <View style={styles.modalContainer}>

            <Text style={respuesta_correcta? styles.modalTextCorrecto: styles.modalTextIncorrecto}>
            {respuesta_correcta ? "¡Excelente!" : "Incorrecto"}
            </Text>

            <Text style={{color: 'white', paddingVertical: 10, fontSize: 17, opacity: respuesta_correcta ? 0: 1}}>
              <Text style={{color: '#86D332'}}>Respuesta correcta: </Text>
              {!respuesta_correcta ? questions[currentQuestionIndex].correct_answer : ''}
            </Text>

            <TouchableOpacity onPress={handleContinuePress} style={respuesta_correcta? styles.continueButton_Correct: styles.continueButton_Incorrect}>
              <Text style = {styles.continueText}>Continuar</Text>
            </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({

        ComprobarButton: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'red',

        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },

        AppContainer: {
          marginTop:30,
          flex: 1,
          backgroundColor: '#fff',
          marginTop:topMargin,
          justifyContent:'space-around',
          alignItems: 'center',
          alignContent: 'center'
        },
        statementText: {
          color: '#F18701',
          fontSize: 28,
          fontWeight: 'bold',
        },
        // ------  Options -----
        optionContainer: {
          flexDirection:'row',
          width:300,
          height:160,
          marginBottom:15,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        },
        selectedOptionContainer: {
          flexDirection:'row',
          width:300,
          height:160,
          marginBottom:15,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth:2,
          backgroundColor:'#CCEBFF',
          borderColor: '#006BB3',
        },
        itemContainer:{
          alignItems: 'center',
          justifyContent: 'center',
        },

        imageContainer:{
          alignItems: 'center',
          alignContent: 'center',
          width:140,
          height:100,
        },
        audio_textContainer:{
          flexDirection:'row',
          justifyContent:'space-between',
        },

        optionText: {
          color: '#000',
          fontSize: 20,
          marginLeft:20,
          fontWeight: 'bold',
          alignSelf: 'center'
        },

        // ------  Comprobar Button -----
        comprobarButton_Enabled: {
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#82C0CC",
          borderRadius: 20,
        },
        comprobarButton_Disabled: {
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#C3C3C3",
          borderRadius: 20,
        },

        comprobarText:{
          color: '#fff',
          fontSize: 20
        },

        /* ------- Modal --------- */
        modalContainer: {
          position: 'absolute',
          width:"100%",
          bottom: 0,
          backgroundColor: '#383A45',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          marginHorizontal: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },


        /* ------ Texto Modal -------- */
        modalTextCorrecto:{
          color: '#86D332',
          fontWeight:'bold',
          fontSize: 20
        },

        modalTextIncorrecto:{
          color:'#EE5655',
          fontWeight:'bold',
          fontSize: 20,
          //marginBottom:5
        },
        
        /* ------ Button Continue -------- */
        continueButton_Correct:{
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#86D332",
          borderRadius: 20},

        continueButton_Incorrect:{
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#EE5655",
          borderRadius: 20},

        continueText:{
            color: '#fff',
            fontSize: 20
          },

      });
      
export default L3A1;
