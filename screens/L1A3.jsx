import React, { useState, useEffect } from 'react';
import { playAudio, stopAudio } from './functions/playAudio';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ProgressBar from 'react-native-progress/Bar';
import useCronometro from './functions/cronometer';
import Icon from 'react-native-vector-icons/FontAwesome'
import audios from './soundsL1A3';

let answers = ['','',''];
let puntaje = 0;
let currentButtonText = 'Verificar';

const L1A3 = ({ navigation }) => {
  app = getApp(); 
  const db = getFirestore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const segundos = useCronometro();

  // ----- Barra de progreso ------
  const [porcentaje, setPorcentaje] = useState(0);
  const ancho = 300

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
 
  const verifyAnswer = () => {
    showResult === false ? setShowResult(true) : setShowResult(false);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  let statement, retrieved_audio, options;
 
  if (questions === null) {
    return (
      <View style={styles.AppContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  statement = questions[currentQuestionIndex].statement;
  retrieved_audio = questions[currentQuestionIndex].audio;
  options = questions[currentQuestionIndex].options;
  
  return (
    <View style= {styles.AppContainer}>

      <View style={styles.statementContainer}>
        <Text style={styles.statementText}>Escuche y seleccione</Text>
      </View>

      <ProgressBar progress={porcentaje/100} width={ancho} height={20} color={'#89D630'} style ={{borderColor: "#383A45"}} />

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

      <View style={styles.optionsContainer}>  

      {options.map((option, index) =>(
        <View key = {index}
              style = {[styles.colorContainer,
              showResult &&
              option['text'] === statement &&
              selectedOption === index &&
              styles.correctAnswer,
              showResult &&
              option['text'] !== statement &&
              selectedOption === index &&
              styles.wrongAnswer,
              showResult &&
              option['text'] === statement &&
              selectedOption !== index &&
              styles.correctAnswer,
              showResult &&
              option['text'] !== statement &&
              selectedOption !== index &&
              styles.colorContainer,
         ]}>
          <TouchableOpacity
            style = {(showResult === false && selectedOption === index) ? styles.selectedTouchOption : styles.touchOption}
            onPress={() => {
              if(showResult === false){
                setSelectedOption(index);
                answers[currentQuestionIndex] = option['text'];
              }
            }}
          >
            <View style = {[styles.colorSquare, {backgroundColor: option['color']}]}></View>

          </TouchableOpacity>
        </View>
      ))}

      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (currentButtonText === 'Verificar'){
            if (selectedOption !== null){
              stopAudio()
              verifyAnswer();
              setPorcentaje(porcentaje+100/questions.length)
              if (answers[currentQuestionIndex] === statement){
                puntaje = puntaje + 100/questions.length;
              }
              currentButtonText = 'Continuar'
            }
          }
          else if (currentButtonText === 'Continuar'){
            verifyAnswer();
            setSelectedOption(null);
            currentButtonText = 'Verificar'
            if (currentQuestionIndex === questions.length-1) {
              navigation.navigate("Result", {puntuation3: Math.round(puntaje), time_taken: segundos, lesson:1, subtitle:'Colores/Tullpukuna'});
              puntaje = 0;
              answers = ['','','']
            } else{
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }
        }}
      >
        <Text style={styles.continueText}>{currentButtonText}</Text>
      </TouchableOpacity>

      </View>

      <StatusBar style="auto"/>

    </View>
  );
}

const styles = StyleSheet.create({
    AppContainer: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:20,
      paddingLeft:5,
      paddingRight:5,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    statementContainer: {
      flex:1,
      flexDirection: 'column',
      justifyContent:'flex-start',
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
      flex:1,
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
    correctAnswer: {
      borderRadius: 15,
      backgroundColor: '#AAF0D1',
    },
    wrongAnswer: {
      borderRadius: 15,
      backgroundColor: '#FEC8D8',
    },
    buttonContainer:{
      flex:2,
      alignItems: 'center',
    },
    continueButton: {
      width: 300,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#82C0CC",
      borderRadius: 20,
    },
    continueText:{
      color: '#fff',
      fontSize: 24
    }
  });

export default L1A3;

