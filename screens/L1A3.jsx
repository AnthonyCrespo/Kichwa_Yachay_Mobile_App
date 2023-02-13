import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  {text: 'Yana',
   audio: require('../assets/audios/yana.mp3')},
  {text: 'Puka',
   audio: require('../assets/audios/puka.mp3')},
  {text: 'Killu',
   audio: require('../assets/audios/killu.mp3')},
];

let options = shuffleArray(
  [['Yana',0],
   ['Puka',1],
   ['Killu',2]]);

let sound;
let answer;
let puntaje = 0;

const L1A3 = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const playAudio = async (path) => {
    if (sound) {
    sound.stopAsync();
    sound.unloadAsync();
    }
    sound = new Audio.Sound();
    try {
    await sound.loadAsync(path);
    await sound.playAsync();
    } catch (error) {
    console.log(error);
    }
  };
  
  const {text, audio} = questions[currentQuestionIndex];
/*   useEffect(() => {
    return () => sound.unloadAsync();
  }, []); */

  return (
    <View style= {styles.AppContainer}>

      <View style={styles.statementContainer}>
        <Text style={styles.statementText}>Escuche y seleccione</Text>
      </View>

      <View style={styles.audioContainer}> 
        <TouchableOpacity
          style={styles.audioButton} 
          onPress={() => {playAudio(audio)}}
        >
          <Icon name="volume-up" size={30} color="black"/>
          <Text style={{fontSize:25, marginLeft:20}}>{text}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>  
      
      <TouchableOpacity
        onPress={() => {
          setSelectedOption(0);
          answer = options[0][0];
        }}
      >
        <View style={options[0][1] === 0 ? styles.blacksquare :
                     options[0][1] === 1 ? styles.redsquare :
                     styles.yellowsquare}></View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{paddingRight:10,paddingLeft:10}}
        onPress={() => {
          setSelectedOption(1);
          answer = options[1][0];
        }}
      >
        <View style={options[1][1] === 0 ? styles.blacksquare :
                     options[1][1] === 1 ? styles.redsquare :
                     styles.yellowsquare}></View>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => {
          setSelectedOption(2);
          answer = options[2][0];
        }}
      >
        <View style={options[2][1] === 0 ? styles.blacksquare :
                     options[2][1] === 1 ? styles.redsquare :
                     styles.yellowsquare}></View>
      </TouchableOpacity>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
            setSelectedOption(null);
            options = shuffleArray(options);
            if (answer === questions[currentQuestionIndex]['text']) {
                puntaje = puntaje + 100/questions.length;
            }
            if (currentQuestionIndex === questions.length-1) {
                navigation.navigate("Result", {puntuation3: Math.round(puntaje)});
                puntaje = 0;
            } else{
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
            }}
        >
            <Text style={styles.continueText}>Continuar</Text>
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
    squareOption: {
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

