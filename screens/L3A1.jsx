import React, { useState,  useEffect } from 'react';
import { Audio } from 'expo-av';
import { Modal, StyleSheet, StatusBar, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, listAll,  getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app'

let answer;
let puntaje = 0;
let respuesta_correcta;

const L3A1 = ({ navigation }) => {
  let audio_test = '../assets/audios/kuchika_pukami_kan.mp3'
  app = getApp(); 
  const db = getFirestore();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const [ imageUrls, setImageUrls ] = useState(null);
  const [ selectedOption, setSelectedOption ] = useState(null);



  const [modalVisible, setModalVisible] = useState(false);
  //const [answer, setAnswer] = useState("");




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
  let statement, options//, correctAnswer;
  
  if (questions === null | imageUrls === null) {
    return (
      <View style={styles.AppContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  } else {
    statement = questions[currentQuestionIndex].statement;
    options = questions[currentQuestionIndex].options;
    //correctAnswer = questions[currentQuestionIndex].correct_answer;
    //console.log(questions)
  }  


  const handleComprobarPress = () => {
    //setAnswer(options[selectedOption].text);
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
      /* sound.stopAsync(); */
      navigation.navigate("Result", {puntuation3: Math.round(puntaje), time_taken: 20, lesson:3, subtitle:' '});
      puntaje = 0;
    } else{
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
      <View >
          <TouchableOpacity
            //style={styles.continueButton}
            style={selectedOption === null ? styles.comprobarButton_Disabled : styles.comprobarButton_Enabled }
            disabled={selectedOption === null}
            onPress={handleComprobarPress}
          >
            <Text style={styles.comprobarText}>Comprobar</Text>
          </TouchableOpacity>
      </View>
      
            {/* Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          {/* <View style={styles.modalContent}> */}
            <Text style={respuesta_correcta? styles.modalTextCorrecto: styles.modalTextIncorrecto}>
            {respuesta_correcta ? "¡Excelente!" : "Incorrecto"}
            </Text>
{/*             <Text style = {{color:'white', paddingVertical:10, fontSize:17}}>
            {!respuesta_correcta? `Respuesta correcta: ${questions[currentQuestionIndex].correct_answer}`: ''}
            </Text> */}

            <Text style={{color: 'white', paddingVertical: 10, fontSize: 17, opacity: respuesta_correcta ? 0: 1}}>
              <Text style={{color: '#86D332'}}>Respuesta correcta: </Text>
              {!respuesta_correcta ? questions[currentQuestionIndex].correct_answer : ''}
            </Text>

            <TouchableOpacity onPress={handleContinuePress} style={respuesta_correcta? styles.continueButton_Correct: styles.continueButton_Incorrect}>
              <Text style = {styles.continueText}>Continuar</Text>
            </TouchableOpacity>

          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({

        ComprobarButton: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'red',

        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },

        AppContainer: {
          flex: 1,
          backgroundColor: '#fff',
          paddingTop:20,
          //paddingLeft:5,
          //paddingRight:5,
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
          color: '#3259A1',
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft:20,
          alignSelf: 'center'
        },


        // ------  Comprobar Button -----
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
          //opacity: 0
        },


        comprobarText:{
          color: '#fff',
          fontSize: 20
        },


        catImage:{
          width: 140,
          height: 80,
          alignSelf:'center'
        },


        /* ------- Modal --------- */
        modalContainer: {
          position: 'absolute',
          width:"100%",
          bottom: 0,
          backgroundColor: '#383A45',
          //borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          //margin: 40,
          marginHorizontal: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },


        /* ------ Texto Modal -------- */
        modalTextCorrecto:{
          color: '#86D332',
          fontWeight:'bold',
          fontSize: 20
        },

        modalTextIncorrecto:{
          color:'#EE5655',
          fontWeight:'bold',
          fontSize: 20,
          //marginBottom:5
        },
        
        /* ------ Button Continue -------- */
        continueButton_Correct:{
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#86D332",
          borderRadius: 20},
        


        continueButton_Incorrect:{
          width: 200,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#EE5655",
          borderRadius: 20},

        continueText:{
            color: '#fff',
            fontSize: 20
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