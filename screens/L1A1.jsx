import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';
import LoadingScreen from './loadingScreen';

let puntaje = 0;
let answer;
let respuesta_correcta;

const L1A1 = ({navigation}) => {  
  app = getApp(); 
  const db = getFirestore();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ modalVisible, setModalVisible ] = useState(false);
  const segundos = useCronometro();

  // ----- Barra de progreso ------
  const [porcentaje, setPorcentaje] = useState(0);
  const ancho = 300

  const handleComprobarPress = () => {
    setPorcentaje(porcentaje+100/questions.length)
    respuesta_correcta = answer === questions[currentQuestionIndex].correct_answer
    if (respuesta_correcta) {
      puntaje = puntaje + 100/questions.length;
    }
    setModalVisible(true);
  };

  const handleContinuePress = () => {
    setModalVisible(false);
    setSelectedOption(null);

    if (currentQuestionIndex === questions.length-1) {
      navigation.navigate("Result", {puntuation3: Math.round(puntaje), 
                                     time_taken: segundos,
                                     unit:1, 
                                     lesson:1, 
                                     activity:1,
                                     subtitle:'Colores/Tullpukuna'});
      puntaje = 0;
    } else{
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

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

  useEffect(() => {
    getDocuments();
  }, []);

  let statement, options;
 
  if (questions === null) {
    return (
      <View style={styles.AppContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  statement = questions[currentQuestionIndex].statement;
  options = questions[currentQuestionIndex].options;
  
  return (
    <View style= {styles.AppContainer}>

      <Text style={styles.statementText}>{statement}</Text>
      <ProgressBar progress={porcentaje/100} width={ancho} height={20} color={'#89D630'} style ={{borderColor: "#383A45"}} />

      {options.map((option, index) => (

        <TouchableOpacity
          key={index} 
          onPress={() => {
              answer = option['text'];
              setSelectedOption(index);}
          }>

          <View 
              style={selectedOption === index ? styles.selectedOptionContainer : styles.optionContainer}>  

            <View style={styles.itemContainer}>
              <View style={[styles.colorSquare, {backgroundColor: option['color']}]}></View>
            </View> 

            <View style={styles.itemContainer}>
                <Text style={styles.optionText}>
                  {option['text']}
                </Text>
            </View>

          </View>
        </TouchableOpacity>
      ))}

      <View >
          <TouchableOpacity
            style={selectedOption === null ? styles.comprobarButton_Disabled : styles.comprobarButton_Enabled }
            disabled={selectedOption === null}
            onPress={handleComprobarPress}
          >
            <Text style={styles.comprobarText}>Comprobar</Text>
          </TouchableOpacity>
      </View>

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
  selectedOptionContainer: {
    flexDirection:'row',
    width:300,
    height:120,
    justifyContent:'space-between',
    paddingRight:50,
    paddingLeft:30,
    marginBottom:15,
    borderRadius: 20,
    backgroundColor:'#4DB8FF'
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
  optionText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
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

export default L1A1;