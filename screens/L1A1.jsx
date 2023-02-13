import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

function getRandomItem(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function updataQuestion(){
  question_shown = questions.splice(0,1);
}

function updateOptions(){
  first_option = getRandomItem(options);
  left_options = options.filter((option) => option.word !== first_option.word);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let questions = 
{
  statements: [['¿Cuál es el color negro?', 'Yana'],
  ['¿Cuál es el color rojo?', 'Puka'],
  ['¿Cuál es el color amarillo?', 'Killu']],
  options: [['Yana',0], ['Puka',1], ['Killu',2]],
};

let options = shuffleArray(questions['options']);

let answer;
let puntaje = 0;

const L1A1 = ({navigation}) => {  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonPress = () => {
    updataQuestion();
    updateOptions();
    
    let question_view = returnView();
    setContent(question_view);
  };

  const statement = questions['statements'][currentQuestionIndex];

  return (
    <View style= {styles.AppContainer}>

      <Text style={styles.statementText}>{statement[0]}</Text>
      
      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>  
          <View style={styles.itemContainer}>
            <View style={option[1] === 0 ? styles.blacksquare :
                         option[1] === 1 ? styles.redsquare :
                         styles.yellowsquare}></View>
          </View> 

          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => {
                answer = option[0];
                 setSelectedOption(index);
                }}
              style={styles.optionButton}>
              <Text style={selectedOption === index ? styles.selected_optionText : styles.optionText}>
                {option[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          setSelectedOption(null);
          options = shuffleArray(options);
          if (answer === questions['statements'][currentQuestionIndex][1]) {
            puntaje = puntaje + 100/questions['statements'].length;
          }
          if (currentQuestionIndex === questions['statements'].length-1) {
            navigation.navigate("Result", {puntuation3: Math.round(puntaje)});
            puntaje = 0;
          } else{
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        }}
      >
        <Text style={styles.continueText}>Continuar</Text>
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
    justifyContent:'space-between',
    paddingRight:50,
    paddingLeft:30,
    marginBottom:15,
  },
  itemContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blacksquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: 'black'
  },
  redsquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#CB2626'
  },
  yellowsquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#FFDD00'
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
    fontSize: 20,
    marginLeft:20
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