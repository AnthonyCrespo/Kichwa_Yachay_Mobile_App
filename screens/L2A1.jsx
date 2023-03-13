import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import images from "./imagesL2A1";
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';
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
let puntaje = 0;
let answer;
let respuesta_correcta;

/* -------------------------------------------------------
   Function that returns the activities corresponding to
   Lesson #2/ Activity #1 */
const L2A1 = ({ navigation }) => {
  app = getApp(); 
  const db = getFirestore();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ modalVisible, setModalVisible ] = useState(false);
  
  /* -------------------------------------------------------
     Starts timer when the view is presented*/
  const segundos = useCronometro();
  
  /* -------------------------------------------------------
     Progress Bar percentage variable and function to update
     it */
  const [porcentaje, setPorcentaje] = useState(0);

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
                                     lesson:2, 
                                     activity:1,
                                     subtitle:'Wiwakuna',
                                     subtitle_esp:'Animales'});
      puntaje = 0;
    } else{
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  /* -------------------------------------------------------
     Fuction that retrieves the questions data from the 
     database */
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

  useEffect(() => {
    getDocuments();
  }, []);

  /* -------------------------------------------------------
     Variables to store the statement and options of 
     a question */
  let statement, options;

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
      <Text style={styles.statementText}>{statement}</Text>

      {/*Mapping each option statement and audio of a question to
         a specific component*/}
      {options.map((option, index) => (

          /* -------------------------------------------------------
             Each option is wrapped into a Touchable Opacity 
             component. When an option is pressed the answer
             variable defined previously is set to the corresponding
             option text. */
          <TouchableOpacity
          key={index} 
          onPress={() => {
              answer = option['text'];
              setSelectedOption(index);}
          }>
            {/*Container of the option's image and text. When the option
               is selected the background and border color changes*/}
            <View 
              style={selectedOption === index ? styles.selectedOptionContainer : styles.optionContainer}>  
              
              {/*Image Container*/}
              <View style={styles.itemContainer}>
                <Image 
                  style={styles.imageContainer}
                  resizeMode="contain"
                  source={(images.find((image) => image.name === option['image'])).path}/>
              </View>
              
              {/*Text Container*/}
              <View style={styles.itemContainer}>
                  <Text style={styles.optionText}>
                    {option['text']}
                  </Text>
              </View>

            </View>
          </TouchableOpacity>
      ))}

      {/*Comprobar button
         When pressed the handleComprobarPress function is called*/}
      <View >
          <TouchableOpacity
            style={selectedOption === null ? styles.comprobarButton_Disabled : styles.comprobarButton_Enabled }
            disabled={selectedOption === null}
            onPress={handleComprobarPress}
          >
            <Text style={styles.comprobarText}>Comprobar</Text>
          </TouchableOpacity>
      </View>
      
      {/*Modal that gives feedback to the user regarding if the
         option selected is correct or not. After viewing the
         feedback the user needs to press the Continue button.
         When pressed the handleContinuePress function is called*/}
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

      <StatusBar style="auto" />
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
  optionContainer: {
    flexDirection:'row',
    width:300,
    height:120,
    justifyContent:'space-between',
    marginBottom:15,
    borderRadius: 15,
  },
  selectedOptionContainer: {
    flexDirection:'row',
    width:300,
    height:120,
    justifyContent:'space-between',
    marginBottom:15,
    borderRadius: 20,
    borderWidth:2,
    backgroundColor:'#CCEBFF',
    borderColor: '#006BB3',
  },
  optionText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    width:130,
    height:100,
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

export default L2A1;
