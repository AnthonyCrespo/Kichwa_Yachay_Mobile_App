import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import images from "./imagesL2A1";
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';

let puntaje = 0;
let answers = ['',''];
let currentButtonText = 'Verificar';

const L2A1 = ({ navigation }) => {
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
    const querySnapshot = await getDocs(collection(db, 'L2A1'));
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
      <ProgressBar progress={porcentaje/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25}}
                    />

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
            <Image 
              style={styles.imageContainer}
              resizeMode="contain"
              source={(images.find((image) => image.name === option['image'])).path}/>

          </View>
        
          <View style={styles.itemContainer}>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                if(showResult === false){
                answers[currentQuestionIndex] = option['text'];
                 setSelectedOption(index);
                }}}>
              <Text style={
                selectedOption === index ? styles.selected_optionText :
                styles.optionText}>
                {option['text']}</Text>
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
                puntaje = puntaje + 100/questions.length;
              }
              currentButtonText = 'Continuar';
            }
          }
          else if (currentButtonText === 'Continuar'){
            verifyAnswer();
            setSelectedOption(null);
            currentButtonText = 'Verificar'
            if (currentQuestionIndex === questions.length-1) {
              navigation.navigate("Result", {puntuation3: Math.round(puntaje), 
                                              time_taken: segundos, 
                                              unit:1, 
                                              lesson:2, 
                                              activity:1, 
                                              subtitle:'Animales/Wiwakuna'});
              puntaje = 0;
              answers = ['','']
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
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5,
    justifyContent:'space-around',
    alignItems: 'center',
  },
  statementText: {
    color: '#F18701',
    fontSize: 28,
    fontWeight: 'bold',
  },
  optionContainer:{
    flexDirection:'row',
    width:300,
    height:130,
    justifyContent:'space-between',
    borderRadius: 15,
  },
  optionButton:{
    flex:1,
    width: 100,
    height: 40,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#000',
    fontSize: 20,
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
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#82C0CC",
    borderRadius: 20,
  },
  continueText:{
    color: '#fff',
    fontSize: 24
  },
  itemContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    width:150,
    height:100,
  },
  catImage:{
    width:59,
    height:125,
  },
  cowImage:{
    width:146,
    height:117,
  },
  dogImage:{
    width:160,
    height:133,
  }
});

export default L2A1;
