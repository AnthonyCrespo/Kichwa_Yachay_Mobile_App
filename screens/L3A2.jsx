import { StatusBar } from 'expo-status-bar';
import React,  { useState, useEffect } from 'react';
import { playAudio, stopAudio } from './functions/playAudio';
import { Modal, StyleSheet,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';
import LoadingScreen from './loadingScreen';
import soundsAnswers from './soundsAnswers';
import Constants from 'expo-constants';

/* Check if current platform is iOS or not  */
const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;

/* Initialize components and variables */
const gestureRootViewStyle = { flex: 1 };

let puntaje = 0;
let currentQuestionIndex = 0
let respuesta_correcta;

let answer_state = 0; 

/* Start Dynamic View */
const L3A2 = ({navigation}) => {
    app = getApp(); 
    const db = getFirestore();
    /* starting states */
    const [ questions, setQuestions ] = useState(null);
    const segundos = useCronometro();
    const [porcentaje, setPorcentaje] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

  /*--------------------------------------------------------------------------------------------  */
  /*---------------------------------------- Modal -----------------------------------------  */
  /*--------------------------------------------------------------------------------------------*/
    
  /* Create Handler Press function for 'Comprobar' botton */
  const handleComprobarPress = async() => {
    await stopAudio(); // wait for the previous audio to stop
    setPorcentaje(porcentaje+100/questions.length)
    respuesta_correcta = verifyConcatenation(receivingItemList) 
    let p;
    
    if (respuesta_correcta) {
      p = soundsAnswers[0].path;
      puntaje = puntaje + 100/questions.length;     //Update score
    }
    else {
      p = soundsAnswers[1].path;
    }
    
    setModalVisible(true);
    //await playAudio(p); // wait for the new audio to complete playing
  };

    /* Create Handler Press function for 'Continuar' button */
  const handleContinuePress = () => {
    setModalVisible(false)
    if (currentQuestionIndex === questions.length-1) {
        navigation.navigate("Result", {puntuation3: Math.round(puntaje), 
                                     time_taken: segundos,
                                     unit:1, 
                                     lesson:3, 
                                     activity:1,
                                     subtitle:'Tullkupuna/Wiwakuna',
                                     subtitle_esp:'Colores/Animales'});
        puntaje = 0;
        currentQuestionIndex = 0
      } else{
        currentQuestionIndex = currentQuestionIndex + 1
        //console.log(currentQuestionIndex)
        InitialDraggableItemList = questions[currentQuestionIndex].options;
        resetLists()
      }
    }


    /* Create a function for rendering a draggable box with some text inside it. */
    const DragUIComponent = ({ item, index }) => {
      return (
        <DraxView   // Draggable and droppable container
          style={[styles.centeredContent, styles.draggableBox, { backgroundColor: item.background_color }]}
          draggingStyle={styles.dragging}
          dragReleasedStyle={styles.dragging}
          hoverDraggingStyle={styles.hoverDragging}
          dragPayload={index}
          longPressDelay={0}
          key={index}
        >
          <Text style={styles.textStyle}>{item.text}</Text>
          
        </DraxView>
      );
    }

    /* Create a function thet represents a receiving zone 
    where dragged elements can be dropped */
    const ReceivingZoneUIComponent = ({ item, index }) => {
      return (
        <DraxView
          style={[styles.centeredContent, styles.receivingZone, { backgroundColor: item.background_color }]}
          receivingStyle={styles.receiving}
          renderContent={({ viewState }) => {
            const receivingDrag = viewState && viewState.receivingDrag;
            const payload = receivingDrag && receivingDrag.payload;
            return (
              <View>
                <Text style={styles.textStyle}> {item.text}</Text>
              </View>
            );
          }}
          key={index}
          /*Handle the event when the dragged element is released */
          onReceiveDragDrop={(event) => {
            const draggedPayload = event.dragged.payload;
            const draggedItem = dragItemMiddleList[draggedPayload];
            let newReceivingItemList = [...receivingItemList];
            newReceivingItemList[index] = draggedItem;
            setReceivingItemList(newReceivingItemList);
            answer_state = 1;
            let newDragItemMiddleList = [...dragItemMiddleList];
            newDragItemMiddleList[draggedPayload] = item;
            setDragItemMiddleList(newDragItemMiddleList);
          }}
        />
      );
    }
    
    /* Function to separate the flat list components */
    const FlatListItemSeparator = () => {
      return (<View style={styles.itemSeparator} />);
    }
  
    /* Function to reset all components */
    const resetLists = () => {
      setReceivingItemList(FirstReceivingItemList);
      setDragItemMiddleList(InitialDraggableItemList);
      answer_state = 0
    }
  
  /* Function to verify the answer */
  const verifyConcatenation = (receivingItemList) => {
    let concatenatedString = '';
    let itemCount = 0;
    receivingItemList.forEach(item => {
      concatenatedString += item.text;
      itemCount++;
  
      if (itemCount < receivingItemList.length) {
        concatenatedString += ' ';
      }
    });
  
    return concatenatedString === questions[currentQuestionIndex].correct_answer;
  }
  
  
    /* Initialize the components for drag and drop  */
    let statement1,statement2, InitialDraggableItemList,correct_answer,complete_answer;
    let FirstReceivingItemList = [
      {
        "id": 5,
        "background_color": 'silver'
      },
      {
        "id": 6,
        "background_color": 'silver'
      }
    ];
      
    let [ receivingItemList, setReceivingItemList ]= useState(FirstReceivingItemList);
    let [ dragItemMiddleList, setDragItemMiddleList ] = useState(null);
  
    /* Get data from database */
    async function getDocuments() {
      const querySnapshot = await getDocs(collection(db, 'L3A2'));
      // Loop through the documents
      const docs = [];
      querySnapshot.forEach(doc => {
        // Get the document data
        const data = doc.data();
        // Add the document data to the array
        docs.push(data);
      });
      setQuestions(docs);
      setDragItemMiddleList(docs[currentQuestionIndex].options);
    }
  
    useEffect(() => {
      getDocuments();
    }, []);
    
  
  
    if (questions === null) {
      return (
        <LoadingScreen/>
      );
    } else {
      statement1 = questions[currentQuestionIndex].statement1;
      statement2 = questions[currentQuestionIndex].statement2;
      InitialDraggableItemList = questions[currentQuestionIndex].options;
      correct_answer = questions[currentQuestionIndex].correct_answer;
      complete_answer = questions[currentQuestionIndex].complete_answer;
      
    }
    return (
        <View style={styles.AppContainer}>
          {/* Progress bar */}
            <ProgressBar progress={porcentaje/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginVertical:20}}
                    />
      
            <View>
              {/* Title */}
              <Text style={styles.statementText}> Ordene la pregunta </Text>
            </View>
  
  {/* Start Drag and drop zone */}
  <GestureHandlerRootView style={gestureRootViewStyle}>
            <DraxProvider>
              <View style={styles.AppContainer}>
                
                  <View style={styles.receivingContainer}> 
                  {/* Receiving boxes positions */} 
                      <Text style={[styles.instructionText, {position: 'absolute', top: 30, left: -130 }]}> {statement1} </Text> 
                      <Text style={[styles.instructionText, {position: 'absolute', top: 30, left: 25 }]}> {statement2} </Text>                  
                    <View style={{ position: 'absolute', top: -10, left: -80 }}>
                      <ReceivingZoneUIComponent item={receivingItemList[0]} index={0} />
                    </View>
                    <View style={{ position: 'absolute', top: -10, left: 50 }}>
                      <ReceivingZoneUIComponent item={receivingItemList[1]} index={1} />
                    </View>
                  </View>
                

                <View style={styles.draxListContainer}>
                  <DraxList
                    data={dragItemMiddleList}
                    renderItemContent={DragUIComponent}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    scrollEnabled={true}
                  />
                </View>
              </View>
            </DraxProvider>
          </GestureHandlerRootView>
            
          <View>
            {/* Reset all components */}
          <TouchableOpacity style={styles.buttonContainer} onPress={resetLists} >
          <Text style={styles.buttonText}> Reiniciar </Text> 
        </TouchableOpacity>
      </View>

{/* Comprobar Button */}
<View style={{ flexDirection: 'row',margin: 30}} >
          <TouchableOpacity
            style={answer_state === 0 ? styles.comprobarButton_Disabled : styles.comprobarButton_Enabled }
            disabled={answer_state === 0}
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

            <Text style={{color: 'white', paddingVertical: 10, fontSize: 17, opacity: respuesta_correcta ? 0: 1}}>
              <Text style={{color: '#86D332'}}>Respuesta correcta: </Text>
              {!respuesta_correcta ? questions[currentQuestionIndex].complete_answer : ''}
            </Text>

            <TouchableOpacity onPress={handleContinuePress} style={respuesta_correcta? styles.continueButton_Correct: styles.continueButton_Incorrect}>
              <Text style = {styles.continueText}>Continuar</Text>
            </TouchableOpacity>
        </View>
      </Modal>
          <StatusBar style="auto" />
        </View>
        
    )
  
  }
  const styles = StyleSheet.create({
      AppContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:topMargin,
        paddingLeft:5,
        paddingRight:5
      },

      statementText: {
        color: '#F18701',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop:20,
        marginBottom:20
      },
      instructionText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
      },
      
      buttonContainer: {
        backgroundColor: "#666BCA",
        marginTop: 25,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 50
        },
      buttonText: {
        fontSize: 20,
        color: "white",
        alignSelf: "center"
      },

      /* ----Drag and Drop Zone-----  */
        receivingZone: {
          height: 50,//(Dimensions.get('window').width / 4) - 12,
          borderRadius: 10,
          width: 70,//(Dimensions.get('window').width / 4) - 12,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 30
        },
        receiving: {
          borderColor: 'blue',
          borderWidth: 0,
        },
        draggableBox: {
          width: 70,//(Dimensions.get('window').width / 4) - 12,
          height:50,// (Dimensions.get('window').width / 4) - 12,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5
        },
        dragging: {
          opacity: 0.2,
        },
        hoverDragging: {
          borderColor: 'cyan',
          borderWidth: 0,
        },
        receivingContainer: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 70,
          marginHorizontal: 50,
          marginLeft: 10,
          marginRight: 50
        },
        itemSeparator: {
          height: 15
        },
        draxListContainer: {
          padding: 5,
          height: 200
        },
        receivingZoneContainer: {
          padding: 5,
          height: 100,
          margin: 70
        },
        textStyle: {
          fontSize: 18
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
         height: 100,
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
         }
     })
  
    export default L3A2;
