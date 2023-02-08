import React, { useState } from 'react';
import { Audio } from 'expo-av';
import {  StyleSheet, StatusBar, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const questions = [
  {
    statement: 'Maykan wiwata yana kan',
    correct_answer: 'Missika yanami kan',
    options: [
      {
        text: 'Missika yanami kan',
        image: require('../assets/black-cat.jpeg'),
        audio: require('../assets/audios/missika_yanami_kan.mp3')
      },
      {
        text: 'Amaruka killumi kan',
        image: require('../assets/serpent.jpeg'),
        audio: require('../assets/audios/amaruka_killumi_kan.mp3')
      },
      {
        text: 'Kuchika pukami kan',
        image: require('../assets/pig.jpeg'),
        audio: require('../assets/audios/kuchika_pukami_kan.mp3')
      }
    ]
  },
  {
    statement: 'Maykan wiwata yurak kan',
    correct_answer: 'Wakraka pukami kan',
    options: [
      {
        text: 'Challwaka killumi kan',
        image: require('../assets/yellow-fish.jpeg'),
        audio: require('../assets/audios/missika_yanami_kan.mp3')
      },
      {
        text: 'Wakraka pukami kan',
        image: require('../assets/bull.jpeg'),
        audio: require('../assets/audios/amaruka_killumi_kan.mp3')
      },
      {
        text: 'Allkuka yurakmi kan',
        image: require('../assets/white-dog.jpeg'),
        audio: require('../assets/audios/kuchika_pukami_kan.mp3')
      }
    ]
  },
  {
    statement: 'Maykan wiwata puka kan',
    correct_answer: 'Challwaka pukammi kan',
    options: [
      {
        text: 'Atallpaka yanami kan',
        image: require('../assets/hen.jpeg'),
        audio: require('../assets/audios/missika_yanami_kan.mp3')
      },
      {
        text: 'Atallpaka yanami kan',
        image: require('../assets/red-fish.jpeg'),
        audio: require('../assets/audios/amaruka_killumi_kan.mp3')
      },
      {
        text: 'Challwaka pukammi kan',
        image: require('../assets/black-cat.jpeg'),
        audio: require('../assets/audios/kuchika_pukami_kan.mp3')
      }
    ]
  },
  {
    statement: 'Maykan wiwata killu kan',
    correct_answer: 'Allkuka yanami kan',
    options: [
      {
        text: 'Allkuka yanami kan',
        image: require('../assets/black-dog.jpeg'),
        audio: require('../assets/audios/missika_yanami_kan.mp3')
      },
      {
        text: 'Wakrakra yurakmi kan',
        image: require('../assets/cow-1.jpeg'),
        audio: require('../assets/audios/amaruka_killumi_kan.mp3')
      },
      {
        text: 'Amaruka killumi kan',
        image: require('../assets/serpent.jpeg'),
        audio: require('../assets/audios/kuchika_pukami_kan.mp3')
      }
    ]
  }
  // ... agregar más preguntas aquí
];

let sound;
const L3A1 = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const playAudio = async (path) => {
    sound = new Audio.Sound();
    try {
      await sound.loadAsync(path);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const { statement, options } = questions[currentQuestionIndex];

  return (
    <View style={styles.AppContainer}>
      <Text style={styles.statementText}>{statement}</Text>
  
      {options.map((option, index) => (
        <View key={index}>
          <Image style={styles.catImage} source={option.image} />
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              playAudio(option.audio);
            }}
          >
            <Icon name="volume-up" size={20} color="black" />
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        </View>
      ))}
  
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (currentQuestionIndex === questions.length-1) {
            navigation.navigate("Result", {puntuation3:100});
          } else{
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        }}
      >
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>
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
          alignContent: 'center'
        },
        statementText: {
          color: '#F18701',
          fontSize: 28,
          fontWeight: 'bold',
        },
        optionButton: {
          width: 400,
          height: 40,
          flexDirection: 'row',
          alignContent: 'space-between',
          justifyContent: 'center',
        },
        optionText: {
          color: '#000',
          fontSize: 20,
          marginLeft:20
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
        catImage:{
          width: 140,
          height: 80,
          alignSelf:'center'
        },
        serpentImage:{
          width: 137,
          height: 140,
        },
        pigImage:{
          width: 107,
          height: 102,
        },
        yellowfishImage:{
          width: 150,
          height: 101,
        },
        redfishImage:{
          width: 175,
          height: 83,
        },
        bullImage:{
          width: 159,
          height: 123,
        },
        whitedogImage:{
          width: 139,
          height: 106,
        },
        blackdogImage:{
          width: 150,
          height: 144,
        },
        henImage:{
          width: 116,
          height: 109,
        },
        cowImage:{
          width: 159,
          height: 112,
        },
      });
      
      export default L3A1;