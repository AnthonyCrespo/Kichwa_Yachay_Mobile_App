import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Draggable from 'react-native-draggable';
const initialPosition = { x: 70, y: 500 };
const L1A2Q1 = ({navigation}) => {

  const [position, setPosition] = useState(initialPosition);
  const [buttonPosition, setButtonPosition] = useState({ x: -150, y: -50 });
  const handlePress = () => {
    setButtonPosition({ x: -110, y: -135 });
  };
  const [buttonPosition2, setButtonPosition2] = useState({ x: -60, y: -50 });
  const handlePress2 = () => {
    setButtonPosition2({ x: -170, y: -135 });
  };
    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>
             <Text style={styles.Title}> Actividad2/Rurana 2</Text>
            </View>
            
            <Text style={styles.subTitle}> Traduce la oracion </Text>

            
            <View style={{ flexDirection: 'row',margin: 60 }}>
              <Text style={styles.instructionText}> Yanami kan </Text>
              <TouchableOpacity >
              <Icon name="volume-up" size={30} color="black"/>
              </TouchableOpacity>
              
            </View>
            
            <View style={{ flexDirection: 'row',margin: 60 }}>
              <Text style={styles.instructionText}> ______________________________ </Text>

            </View>


            <Draggable x={90} y={500}>
              <Text style={styles.buttonSolution}>Negro</Text>
            </Draggable>
            <Draggable x={170} y={500}>
              <Text style={styles.buttonSolution}>Blanco</Text>
            </Draggable>
            <Draggable x={260} y={500}>
              <Text style={styles.buttonSolution}>es</Text>
            </Draggable>
            
            
            
            
            {/* <Draggable
            x={position.x}
            y={position.y}
            onDragRelease={(gestureState) => {
            // Si la posición del texto supera cierto límite, regresa a su posición inicial
            if (gestureState.moveX > 200 || gestureState.moveY > 375) {
                setPosition(initialPosition);
              }
            }}
            >
          <Text style={styles.buttonSolution}>Negro</Text>
          </Draggable> */}
            



            <View style={{ flexDirection: 'row' ,margin: 70}}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('L1A2Q2')}>
              <Text style={styles.buttonText}> Continuar </Text> 
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
      paddingHorizontal: 50
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
    }
  })

  export default L1A2Q1