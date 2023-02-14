import React, { useState,  useEffect } from 'react';
import { Audio } from 'expo-av';
import { StyleSheet, StatusBar, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


import { getFirestore, collection, getDocs} from 'firebase/firestore';
import {getAuth,getReactNativePersistence,initializeAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {firebase, initializeApp, getApps, getApp} from 'firebase/app'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {firebaseConfig} from '../firebase-config'


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


const L3A1 = ({ navigation }) => {


  
let sound;
let answer;
let puntaje = 0;


    // Load Data From Firestore
/*     const [questions, setQuestions] = useState([]);
    const db = getFirestore();
    // Obtener datos de Firestore
    useEffect(() => {
      const fetchData = () => {
        const collectionRef = collection(db, "L3A1");
        const querySnapshot =  getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        setQuestions(data);
        console.log(data);
      };
      fetchData();
    }, []); */




  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { statement, options } = questions[currentQuestionIndex];


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



      



  return (
    <View style={styles.AppContainer}>
      <Text style={styles.statementText}>{statement}</Text>
  
      {options.map((option, index) => (
        <View key={index}>
          <Image style={styles.catImage} source={option.image} />
  
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              setSelectedOption(index);
              answer = option.text;
              playAudio(option.audio);
            }}
          >
            <Icon name="volume-up" size={20} color="black" />
            <Text style={selectedOption === index ? styles.selected_optionText : styles.optionText}>
              {option.text}
              </Text>
          </TouchableOpacity>
        </View>
      ))}
  
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          setSelectedOption(null);
          if (answer === questions[currentQuestionIndex].correct_answer) {
            puntaje = puntaje + 100/questions.length;
          }
          if (currentQuestionIndex === questions.length-1) {
            /* sound.stopAsync(); */
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
          marginLeft:20,
          fontWeight: 'bold'
        },
        selected_optionText: {
          color: '#63933D',
          fontWeight: 'bold',
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