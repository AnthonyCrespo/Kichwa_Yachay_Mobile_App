import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';


const gestureRootViewStyle = { flex: 1 };
let puntaje3 = 0
let currentButtonText = 'Verificar';
const L1A2Q3 = ({route, navigation}) => {

  const {puntuation2} = route.params;

  //let puntaje2 = puntuation1


  const draggableItemList = [
    {
      "id": 1,
      "name": "Blanco",
      "background_color": "cyan"
    },
    {
      "id": 2,
      "name": "Es",
      "background_color": "cyan"
    },
    {
      "id": 3,
      "name": "Amarillo",
      "background_color": "cyan"

    }

  ];
  const FirstReceivingItemList = [
    {
      "id": 4,
      "background_color": 'silver'
    },
    {
      "id": 5,
      "background_color": 'silver'
    }
  ];

  const [receivingItemList, setReceivedItemList] = React.useState(FirstReceivingItemList);
  const [dragItemMiddleList, setDragItemListMiddle] = React.useState(draggableItemList);

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
        <Text style={styles.textStyle}>{item.name}</Text>
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
              <Text style={styles.textStyle}>{item.name}</Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={(event) => {
          const draggedPayload = event.dragged.payload;
          const draggedItem = dragItemMiddleList[draggedPayload];
          let newReceivingItemList = [...receivingItemList];
          newReceivingItemList[index] = draggedItem;
          setReceivedItemList(newReceivingItemList);
  
          let newDragItemMiddleList = [...dragItemMiddleList];
          newDragItemMiddleList[draggedPayload] = item;
          setDragItemListMiddle(newDragItemMiddleList);
        }}
      />
    );
  }
  
  const FlatListItemSeparator = () => {
    return (<View style={styles.itemSeparator} />);
  }

  const resetLists = () => {
    setReceivedItemList(FirstReceivingItemList);
    setDragItemListMiddle(draggableItemList);
  }
  const verifyConcatenation = (receivingItemList, targetString) => {
    let concatenatedString = '';
    receivingItemList.forEach(item => {
      concatenatedString += item.name ;
    });
    return concatenatedString === targetString;
  }

  const result = () => {
  if (verifyConcatenation(receivingItemList,'EsAmarillo')){
      alert('Respuesta:\n'+'Correcto');
      resetLists();
      puntaje3 = puntuation2 +0.333333;
      //console.log(puntaje2)
  }
  else
  {
      alert('Respuesta:\n'+'Incorrecto');
      resetLists();
      puntaje3 = puntuation2;
  }
};
    return (
        <View style={styles.container}>
          
            <View style={{ margin: 20 }}>
             <Text style={styles.Title}> Actividad2/Rurana 2</Text>
            </View>
            
            <Text style={styles.subTitle}> Traduce la oracion </Text>

            
            <View style={{ flexDirection: 'row',margin: 60 }}>
              <Text style={styles.instructionText}> Yurakmi kan </Text>
              <TouchableOpacity >
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

            <View style={{ flexDirection: 'row' ,margin: 30}}>
            <TouchableOpacity
              style={styles.buttonContainer}
                  onPress={() => {
                    if (currentButtonText === 'Verificar'){
                      result();
                      currentButtonText = 'Continuar'
                    }
                    else if (currentButtonText === 'Continuar'){
                      navigation.navigate("Result", {puntuation3: puntaje3,lesson:1,subtitle:'Colores/Tullpukuna'});
                      currentButtonText = 'Verificar';
                    }
              }}>
              <Text style={styles.buttonText}>{currentButtonText}</Text>
            </TouchableOpacity>
            </View>          
          <StatusBar style="auto" />
        </View>
        
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '35%',
      height: 40,
      marginTop: '5%',
      borderRadius: 10,
      backgroundColor: '#B9B6B6',
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
      fontSize: 16
    }
  })

  export default L1A2Q3