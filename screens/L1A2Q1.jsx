import { StatusBar } from 'expo-status-bar';
import React,  { useState, useEffect } from 'react';
import { playAudio, stopAudio } from './functions/playAudio';
import { StyleSheet,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';
import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';
import audios from './soundsL1A2';

const gestureRootViewStyle = { flex: 1 };
let puntaje = 0;
let currentButtonText = 'Verificar';

const L1A2Q1 = ({navigation}) => {
  app = getApp(); 
  const db = getFirestore();
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ questions, setQuestions ] = useState(null);
  const segundos = useCronometro();

  const DragUIComponent = ({ item, index }) => {
    return (
      <DraxView
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
        onReceiveDragDrop={(event) => {
          const draggedPayload = event.dragged.payload;
          const draggedItem = dragItemMiddleList[draggedPayload];
          let newReceivingItemList = [...receivingItemList];
          newReceivingItemList[index] = draggedItem;
          setReceivingItemList(newReceivingItemList);
  
          let newDragItemMiddleList = [...dragItemMiddleList];
          newDragItemMiddleList[draggedPayload] = item;
          setDragItemMiddleList(newDragItemMiddleList);
        }}
      />
    );
  }
  
  const FlatListItemSeparator = () => {
    return (<View style={styles.itemSeparator} />);
  }

  const resetLists = () => {
    setReceivingItemList(FirstReceivingItemList);
    setDragItemMiddleList(InitialDraggableItemList);
  }
  const verifyConcatenation = (receivingItemList, targetString) => {
    let concatenatedString = '';
    receivingItemList.forEach(item => {
      concatenatedString += item.text ;
    });
    return concatenatedString === targetString;
  }

  const result = () => {
  if (verifyConcatenation(receivingItemList,correct_answer)){
      alert('Respuesta:\n'+'Correcto');
      resetLists();
      puntaje = puntaje + 100/3;
      
  } else {
      alert('Respuesta:\n'+'Incorrecto');
      resetLists();
      puntaje = puntaje
  }};
  let statement, InitialDraggableItemList, correct_answer,retrieved_audio;
  let FirstReceivingItemList = [
    {
      "id": 4,
      "background_color": 'silver'
    },
    {
      "id": 5,
      "background_color": 'silver'
    }
  ];
    
  let [ receivingItemList, setReceivingItemList ]= useState(FirstReceivingItemList);
  let [ dragItemMiddleList, setDragItemMiddleList ] = useState(null);

  async function getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'L1A2'));
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
      <View style={styles.AppContainer}>
        <Text>Loading...</Text>
      </View>
    );
  } else{
    statement = questions[currentQuestionIndex].statement;
    InitialDraggableItemList = questions[currentQuestionIndex].options;
    correct_answer = questions[currentQuestionIndex].correct_answer;
    retrieved_audio = questions[currentQuestionIndex].audio;
  }
  
  return (
    <View style={styles.container}>

      <View style={{ margin: 20 }}>
          <Text style={styles.Title}> Actividad2/Rurana 2</Text>
        </View>

        <View>
        <Text style={styles.subTitle}> Traduce la oracion </Text>
        </View>
        
        <View style={{ flexDirection: 'row',margin: 60}}>
          <Text style={styles.instructionText}> {statement}</Text>
          <TouchableOpacity onPress={() => {
            let audioPath = (audios.find((audio) => audio.name === retrieved_audio)).path
            playAudio(audioPath);
          }} >
          <Icon name="volume-up" size={30} color="black"/>
          </TouchableOpacity>
          
        </View>
          
      <GestureHandlerRootView style={gestureRootViewStyle}>
        <DraxProvider>
          <View style={styles.container}>
            <View style={styles.receivingContainer}>
              {receivingItemList.map((item, index) => ReceivingZoneUIComponent({ item, index }))}
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


        <TouchableOpacity style={styles.buttonContainer} onPress={resetLists} >
          <Text style={styles.buttonText}> Reset </Text> 
        </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row',margin: 30}}>

        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (currentButtonText === 'Verificar'){
              result();
              stopAudio()
              /* puntaje = puntaje + 100/3; */
              currentButtonText = 'Continuar';
          }
          else if (currentButtonText === 'Continuar'){
            resetLists();
            currentButtonText = 'Verificar'
            if (currentQuestionIndex === questions.length-1) {
              navigation.navigate("Result", {puntuation3: Math.round(puntaje), time_taken: segundos, lesson:1, subtitle:'Colores/Tullpukuna'});
              puntaje = 0;
            } else{
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetLists();
            }
          }
        }}
      >
        <Text style={styles.buttonText}>{currentButtonText}</Text>
      </TouchableOpacity>
        </View> 
        
      <StatusBar style="auto" />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AppContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5
  },
  Title: {
    fontSize: 30,
    color: 'gray',
    fontWeight: 'bold',
    translateX: 200,
    translateY: 10
  },
  subTitle: {
    fontSize: 25,
    color: '#F2570A',
    fontWeight: 'bold'
  },
  instructionText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  
  textSolution: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 60,
    marginTop: '5%',
    borderRadius: 10,
    backgroundColor: '#D0C0C0',
    marginRight: 20
  },

  buttonSolution: {
    backgroundColor: "#B9B6B6",
    marginTop: 25,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 9,
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: "#82C0CC",
    marginTop: 25,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40
    },
    buttonContainerBotton: {
      backgroundColor: "#82C0CC",
      marginTop: 25,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 50
      },
  buttonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontWeight: 'bold'
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#292D3E',
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  receivingZone: {
    height: 60,//(Dimensions.get('window').width / 4) - 12,
    borderRadius: 10,
    width: 60,//(Dimensions.get('window').width / 4) - 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  receiving: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  draggableBox: {
    width: 60,//(Dimensions.get('window').width / 4) - 12,
    height:60,// (Dimensions.get('window').width / 4) - 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 70
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
  }
})

  export default L1A2Q1;