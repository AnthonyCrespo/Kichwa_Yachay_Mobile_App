import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

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

function returnView() {
  console.log(question_shown);
  return (
    <View>
      <View style={styles.statementContainer}>
        <Text style={styles.statementText}> {question_shown} </Text>
      </View>

      <View style={styles.optionContainer}>  
        {first_option.view}

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {answer = first_option.word}}
            style={styles.optionButton}>
            <Text style={styles.optionText}>{first_option.word}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}> 
        {left_options[0].view}

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {answer = left_options[0].word}}
            style={styles.optionButton}>
            <Text style={styles.optionText}>{left_options[0].word}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>  
        {left_options[1].view}

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {answer = left_options[1].word}}
            style={styles.optionButton}>
            <Text style={styles.optionText}>{left_options[1].word}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
}

let questions = ['¿Cuál es el color negro?', '¿Cuál es el color rojo?', '¿Cuál es el color amarillo?'];
questions = shuffleArray(questions);
let question_shown = questions.splice(0,1);
let options = [{view: (<View style={styles.itemContainer}>
                        <View style={styles.blacksquare}></View>
                        </View>) , word: 'Yana'},
                {view: (<View style={styles.itemContainer}>
                        <View style={styles.redsquare}></View>
                        </View>) , word: 'Puka'},
                {view: (<View style={styles.itemContainer}>
                        <View style={styles.yellowsquare}></View>
                        </View>) , word: 'Killu'}];
let first_option = getRandomItem(options);
let left_options = options.filter((option) => option.word !== first_option.word);

let question_view = returnView()

const L1A1 = ({route, navigation}) => {
  let answer;
  
  const [content, setContent] = useState(question_view);

  const handleButtonPress = () => {
    updataQuestion();
    updateOptions();
    
    let question_view = returnView();
    setContent(question_view);
  };

  return (
    <View style= {styles.AppContainer}>
      
      {content}

      <TouchableOpacity
        onPress={handleButtonPress}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
  );
}

export default L1A1;