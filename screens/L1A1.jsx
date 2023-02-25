import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';

let puntaje = 0;
let answers = ['','',''];
let currentButtonText = 'Verificar';

const L1A1 = ({navigation}) => {  
  app = getApp(); 
  const db = getFirestore();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ showResult, setShowResult ] = useState(false);
  const segundos = useCronometro();

  // ----- Barra de progreso ------
  const [porcentaje, setPorcentaje] = useState(0);
  const ancho = 300

  async function getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'L1A1'));
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

  let statement, correct_answer, options;
 
  if (questions === null) {
    return (
      <View style={styles.AppContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  statement = questions[currentQuestionIndex].statement;
  correct_answer = questions[currentQuestionIndex].correct_answer;
  options = questions[currentQuestionIndex].options;
  
  return (
    <View style= {styles.AppContainer}>

      <Text style={styles.statementText}>{statement}</Text>
      <ProgressBar progress={porcentaje/100} width={ancho} height={20} color={'#89D630'} style ={{borderColor: "#383A45"}} />

      {options.map((option, index) => (

        <View key={index} 
              style={[styles.optionContainer,
                     showResult &&
                     option['text'] === correct_answer &&
                     selectedOption === index &&
                     styles.correctAnswer,
                     showResult &&
                     option['text'] !== correct_answer &&
                     selectedOption === index &&
                     styles.wrongAnswer,
                     showResult &&
                     option['text'] === correct_answer &&
                     selectedOption !== index &&
                     styles.correctAnswer,
                     showResult &&
                     option['text'] !== correct_answer &&
                     selectedOption !== index &&
                     styles.optionContainer,
                    ]}>  

          <View style={styles.itemContainer}>
            <View style={[styles.colorSquare, {backgroundColor: option['color']}]}></View>
          </View> 

          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => {
                if(showResult === false){
                answers[currentQuestionIndex] = option['text'];
                 setSelectedOption(index);
                }}}
              style={styles.optionButton}>
              <Text style={selectedOption === index ? styles.selected_optionText :
                           styles.optionText}>
                {option['text']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (currentButtonText === 'Verificar'){
            if (selectedOption !== null){
              verifyAnswer();
              setPorcentaje(porcentaje+100/questions.length)
              if (answers[currentQuestionIndex] === correct_answer){
                puntaje = puntaje + 100/3;
              }
              currentButtonText = 'Continuar';
            }
          }
          else if (currentButtonText === 'Continuar'){
            verifyAnswer();
            setSelectedOption(null);
            currentButtonText = 'Verificar'
            if (currentQuestionIndex === 2) {
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

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5
  },
  statementContainer: {
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
  optionContainer: {
    flexDirection:'row',
    width:300,
    height:120,
    justifyContent:'space-between',
    paddingRight:50,
    paddingLeft:30,
    marginBottom:15,
    borderRadius: 15,
  },
  itemContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  optionButton: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  selected_optionText: {
    color: '#63933D',
    fontWeight: 'bold',
    fontSize: 24,
  },
  correctAnswer: {
    borderRadius: 20,
    backgroundColor: '#AAF0D1',
  },
  wrongAnswer: {
    borderRadius: 20,
    backgroundColor: '#FEC8D8',
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

export default L1A1;