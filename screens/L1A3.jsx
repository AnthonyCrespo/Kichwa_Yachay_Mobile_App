import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Modal, TouchableOpacity, View, Text } from 'react-native';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ProgressBar from 'react-native-progress/Bar';
import useCronometro from './functions/cronometer';
import Icon from 'react-native-vector-icons/FontAwesome'
import audios from './soundsL1A3';
import LoadingScreen from './loadingScreen';
import { playAudio } from './functions/playAudio';
import soundsAnswers from './soundsAnswers';
import Constants from 'expo-constants';

/* -------------------------------------------------------
   Variable that stores the top margin parameter according 
   to the device OS */
const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;

/* -------------------------------------------------------
   Variables that store question related data */
let answer = '';
let puntaje = 0;
let respuesta_correcta;

/* -------------------------------------------------------
   Function that returns the activities corresponding to
   Lesson #1/ Activity #3 */
const L1A3 = ({ navigation }) => {
  app = getApp(); 
  const db = getFirestore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ showResult, setShowResult ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  
  /* -------------------------------------------------------
     Starts timer when the view is presented*/
  const segundos = useCronometro();

  /* -------------------------------------------------------
     Progress Bar percentage variable and function to update
     it */
  const [porcentaje, setPorcentaje] = useState(0);
  const ancho = 300

  /* -------------------------------------------------------
     Function that checks if the anwser of a question is 
     correct or not */
  const handleComprobarPress = async () => {
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
    await playAudio(p);
  };

  /* -------------------------------------------------------
     Function with two purposes: updates the question index
     to be presented in the view, or navigate to the results
     view to present the score and time of the activity */
  const handleContinuePress = () => {
    setModalVisible(false);
    setSelectedOption(null);

    if (currentQuestionIndex === questions.length-1) {
      navigation.navigate("Result", {puntuation3: Math.round(puntaje), 
                                     time_taken: segundos,
                                     unit:1, 
                                     lesson:1, 
                                     activity:1,
                                     subtitle:'Tullpukuna',
                                     subtitle_esp:'Colores'});
      puntaje = 0;
    } else{
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  /* -------------------------------------------------------
     Fuction that retrieves the questions data from the 
     database */
  async function getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'L1A3'));
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

  /* -------------------------------------------------------
     Variables to store the statement and options of 
     a question */
  let statement, retrieved_audio, options;
 
  /* -------------------------------------------------------
     A loading screen is presented in case the questions
     data is still being downloaded */
  if (questions === null) {
    return (
      <LoadingScreen/>
    );
  }

  /* -------------------------------------------------------
     Loading the statement and options of a question based
     on the current index and only after the questions have
     been download */
  statement = questions[currentQuestionIndex].statement;
  retrieved_audio = questions[currentQuestionIndex].audio;
  options = questions[currentQuestionIndex].options;
  
  return (
    /* -------------------------------------------------------
       Main View */
    <View style= {styles.AppContainer}>

      {/*Progress Bar*/}
      <ProgressBar progress={porcentaje/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginVertical:20}}
                    />

      {/*Question statement*/}
      <View style={styles.statementContainer}>
        <Text style={styles.statementText}>Escuche y seleccione</Text>
      </View>
      
      {/*Question audio*/}
      <View style={styles.audioContainer}> 
        <TouchableOpacity
          style={styles.audioButton} 
          onPress={() => {
            let audioPath = (audios.find((audio) => audio.name === retrieved_audio)).path
            playAudio(audioPath);
          }}
        >
          <Icon name="volume-up" size={30} color="black"/>
          <Text style={{fontSize:25, marginLeft:20}}>{statement}</Text>
        </TouchableOpacity>
      </View>
      

      {/*Container of the color square options*/}
      <View style={styles.optionsContainer}>  

      {/*Mapping of each color option to a color square*/}
      {options.map((option, index) =>(

        /* -------------------------------------------------------
          Container for each color square. When the option
           is selected the background and border color changes */
        <View key = {index}
              style = {selectedOption === index ? styles.colorContainer : styles.colorContainer}>

          {/*Each color square option is wrapped into a Touchable Opacity 
             component. When a color square option is pressed the answer
             variable defined in the beggining is set to the corresponding
             color option text.*/}
          <TouchableOpacity
            style = {(showResult === false && selectedOption === index) ? styles.selectedTouchOption : styles.touchOption}
            onPress={() => {
              if(showResult === false){
                setSelectedOption(index);
                answer = option['text'];
              }
            }}
          >
            <View style = {[styles.colorSquare, {backgroundColor: option['color']}]}></View>

          </TouchableOpacity>
        </View>
      ))}

      </View>

      {/*Comprobar button
         When pressed the handleComprobarPress function is called*/}
      <View style={{flex:1}}>
          <TouchableOpacity
            style={selectedOption === null ? styles.comprobarButton_Disabled : styles.comprobarButton_Enabled }
            disabled={selectedOption === null}
            onPress={handleComprobarPress}
          >
            <Text style={styles.comprobarText}>Comprobar</Text>
          </TouchableOpacity>
      </View>
      
      {/*Modal that gives feedback to the user regarding if the
         option selected is correct or not*/}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>

            <Text style={respuesta_correcta? styles.modalTextCorrecto: styles.modalTextIncorrecto}>
            {respuesta_correcta ? "¡Excelente!" : "Incorrecto"}
            </Text>

            <Text style={{color: 'white', paddingVertical: 10, fontSize: 17, opacity: respuesta_correcta ? 0: 1}}>
              <Text style={{color: '#86D332'}}>Respuesta correcta: </Text>
              {!respuesta_correcta ? questions[currentQuestionIndex].correct_answer : ''}
            </Text>

            {/* Continue Button */}
            <TouchableOpacity onPress={handleContinuePress} style={respuesta_correcta? styles.continueButton_Correct: styles.continueButton_Incorrect}>
              <Text style = {styles.continueText}>Continuar</Text>
            </TouchableOpacity>

        </View>
      </Modal>

      <StatusBar style="auto"/>

    </View>
  );
}

/* -------------------------------------------------------
   Styles used by the components */
const styles = StyleSheet.create({
    AppContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop:topMargin,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    statementContainer: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      paddingBottom:15,
      paddingTop:15
    },
    statementText: {
      color: '#F18701',
      fontSize: 28,
      fontWeight: 'bold',
    },
    audioContainer:{
      flexDirection: 'row',
      justifyContent:'center',
      alignContent: 'space-around',
      paddingBottom:15,
      paddingTop:15
    },
    audioButton:{
      width: 300,
      height: 40,
      flexDirection: 'row',
      alignContent: 'space-around',
      justifyContent: 'center',
    },
    optionsContainer: {
      flex: 4,
      width: 350,
      height: 150,
      flexDirection: 'row',
      marginTop: 50,
      justifyContent:'space-around',
    },
    colorContainer: {
      width: 115,
      height: 115,
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchOption: {
      width: 110,
      height: 110,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedTouchOption: {
      width: 110,
      height: 110,
      borderRadius: 15,
      backgroundColor: '#B4CBF0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorSquare: {
      width: 95,
      height: 95,
      borderRadius: 15,
    },
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
    modalTextCorrecto:{
      color: '#86D332',
      fontWeight:'bold',
      fontSize: 20
    },
    modalTextIncorrecto:{
      color:'#EE5655',
      fontWeight:'bold',
      fontSize: 20,
    },
    continueButton_Correct:{
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#86D332",
      borderRadius: 20
    },
    continueButton_Incorrect:{
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#EE5655",
      borderRadius: 20
    },
    continueText:{
        color: '#fff',
        fontSize: 20
    },
  });

export default L1A3;

