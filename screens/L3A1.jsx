import React, { useState,  useEffect } from 'react';
import { Audio } from 'expo-av';
import { StyleSheet, StatusBar, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, listAll,  getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app'

let answer;
let puntaje = 0;

const L3A1 = ({ navigation }) => {
  let audio_test = '../assets/audios/kuchika_pukami_kan.mp3'
  app = getApp(); 
  const db = getFirestore();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ imageUrls, setImageUrls ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);

  async function getDocuments() {

    const querySnapshot = await getDocs(collection(db, 'L3A1'));

    // Loop through the documents
    const docs = [];
    querySnapshot.forEach(doc => {
      // Get the document data
      const data = doc.data();
      // Add the document data to the array
      docs.push(data);
    });

    // Update the state variable with the documents
    setQuestions(docs);
  }

  useEffect(() => {
    // Initialize the Firebase app and get the storage reference
    const storage = getStorage();
    const imagesRef = ref(storage, 'images/');

    // Filter the list of items to download
    const imagesToDownload = ['black-cat.jpeg', 'serpent.jpeg', 'pig.jpeg'];
    //const imagesToDownload = options.map((option) => option['image'])

    // Get the download URLs of the selected images in the storage bucket
    listAll(imagesRef).then((result) => {
      const urls = result.items
        .filter((item) => imagesToDownload.includes(item.name))
        .map((item) => getDownloadURL(item));
      Promise.all(urls).then((downloadUrls) => setImageUrls(downloadUrls));
    })

    getDocuments();
  }, []);

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

  let sound;
  let statement, options;
  
  if (questions === null | imageUrls === null) {
    return (
      <View style={styles.AppContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  } else {
    statement = questions[currentQuestionIndex].statement;
    options = questions[currentQuestionIndex].options;
    //console.log(questions)
  }  


  return (
    <View style={styles.AppContainer}>
      <Text style={styles.statementText}>{statement}</Text>
  
      {options.map((option, index) => (
        
        <View key={index}>
          {/*  ---- Option Image ---- */}
          <Image style={styles.catImage} source={{uri: imageUrls[index]}} />


          {/*  ---- Option Icon-Text ---- */}
          <View style={styles.optionContainer}>
            {/* -------- Icon -------- */}
              <TouchableOpacity
                    style={styles.optionIcon}
                    onPress={() => {
                      //playAudio(option.audio);
                      //layAudio(require(audio_test))
                      console.log(option.audio)
                      playAudio(option.audio)
                    }}
                  >
                    <Icon name="volume-up" size={20} color="black" />
              </TouchableOpacity>
              {/* --------  Text -------- */}
              <TouchableOpacity
                    onPress={() => {
                      setSelectedOption(index);
                      answer = option.text;
                    }}
                >

                  <Text style={selectedOption === index ? styles.selected_optionText : styles.optionText}>
                    {option.text}
                  </Text>

              </TouchableOpacity>
          </View>

        </View>
    ))}
  
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          setSelectedOption(null);
          console.log(answer)
          console.log(questions[currentQuestionIndex].correct_answer)
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


        // ------  Options -----
        optionContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
        },



        optionButton: {
          flexDirection: 'row',
          //alignContent: 'space-between',
        },

        optionText: {
          color: '#000',
          fontSize: 20,
          marginLeft:20,
          fontWeight: 'bold',
          alignSelf: 'center'
        },

        selected_optionText: {
          color: '#63933D',
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft:20,
          alignSelf: 'center'
        },

        // ------  Continue Button -----
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
/*         serpentImage:{
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
        }, */
      });
      
export default L3A1;