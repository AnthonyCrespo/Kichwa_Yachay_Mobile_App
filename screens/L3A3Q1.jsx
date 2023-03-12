import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { Alert, StyleSheet, Button,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';
import Constants from 'expo-constants';


/* Check if current platform is iOS or not  */
const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;



const L3A3Q1= ({navigation}) => {
    
    /* Start States and lists (Right and Left) */
    const [leftItems, setLeftItems] = useState(['Perro', 'Cuál', 'Es', 'Negro', 'Blanco', 'Gato']);
    const [rightItems, setRightItems] = useState(['Allku','Maykan', 'Yana', 'Missi', 'Yurak', 'Kan']);
    const [selectedLeft, setSelectedLeft] = useState([]);
    const [selectedRight, setSelectedRight] = useState([]);
    const [Left, setLeft] = useState([]);
    const [Right, setRight] = useState([]);
    const [correctPairs, setCorrectPairs] = useState([]);
    const [incorrectPairs, setIncorrectPairs] = useState([]);

    /* Set time */
    const segundos = useCronometro();
    const [porcentaje, setPorcentaje] = useState(0);
  
  
    /* Create Handler Press function for 'Continuar' botton */
    const handleContinuePress = () => {
      setPorcentaje(100)
      navigation.navigate("Result", {puntuation3: 100, 
                                     time_taken: segundos,
                                     unit:1, 
                                     lesson:3, 
                                     activity:1,
                                     subtitle:'Tullkupuna/Wiwakuna',
                                     subtitle_esp:'Colores/Animales'});
    }

 /* Create Handler Press function for left-hand side and right-hand side  buttons */
     const handlePress = (type, item) => {
      if (type === 'left') {
      
        setSelectedLeft(item);
      } else {
        
        setSelectedRight(item);
      }
      /* Check if a button is selected in the Left hand-side */
      if (selectedLeft && type === 'right') {   
        
        /* Check the correct pairs selected */
        if (selectedLeft === 'Perro' && item === 'Allku') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);

        }

        else if (selectedLeft === 'Cuál' && item === 'Maykan') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
        } 
        else if (selectedLeft === 'Es' && item === 'Kan') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
        }
        else if (selectedLeft === 'Gato' && item === 'Missi') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
        }
        else if (selectedLeft === 'Negro' && item === 'Yana') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
        }
        else if (selectedLeft === 'Blanco' && item === 'Yurak') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
        }
        else {
            setIncorrectPairs([...incorrectPairs, { left: selectedLeft, right: item }]);
        }
      }
    };

    return (
      <View style={styles.container}>
      {/* Progress bar */}
        <ProgressBar progress={porcentaje/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginVertical:20}}
                    />
        {/* Title */}
        <Text style={styles.Title}>Relacione las palabras</Text>
        
        <View style={{ flexDirection: 'row', margin: 40 }}>

{/* Left hand-side and right hand-side buttons */}
<View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap', alignContent:"center" }}>
  {leftItems.map((item, index) => {
    const isCorrect = correctPairs.find((pair) => pair.left === item);
     return (
      <TouchableOpacity
        key={`left_${index}`}
        style={[
          styles.buttonSolution,
          isCorrect && styles.correctSolution,

      ]}
        onPress={() => {handlePress('left', item);         
                  }}
        /* Disable the left selected button */
        disabled={Left.includes(item)}     
      >
        <Text style={{ fontSize: 18, color:"#fff" }}>{item}</Text>
      </TouchableOpacity>
    );
  })}
</View>

<View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
  {rightItems.map((item, index) => {
     const isCorrect = correctPairs.find((pair) => pair.right === item);
     return (
      <TouchableOpacity
        key={`right_${index}`}
        style={[
          styles.buttonSolution,
          isCorrect && styles.correctSolution,

        ]}
        onPress={() => {
          handlePress('right', item);
        }}
        /* Disable the right selected button */
        disabled={ Right.includes(item)}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>{item}</Text>
      </TouchableOpacity>
    );
  })}
</View>

  </View>
            {/* Button Continue*/}
            <TouchableOpacity
            style={correctPairs.length !== 6 ? styles.continuarButton_Disabled  : styles.continuarButton_Enabled }
            disabled={correctPairs.length !== 6}
            onPress={handleContinuePress}
          >
            <Text style={styles.continuarText}>Continuar</Text>
          </TouchableOpacity>
  
        <StatusBar style="auto" />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: topMargin,
    },
    Title: {
      fontSize: 30,
      color: '#F2570A',
      fontWeight: 'bold',
      marginBottom:30
    },
    subTitle: {
      fontSize: 25,
      color: '#F2570A',
      fontWeight: 'bold'
    },
    buttonContainer: {
      backgroundColor: '#82C0CC',
      padding: 10,
      borderRadius: 10,
      marginTop: 30,
      justifyContent: 'center'
    },

    /* -----Buttons Solution */
    buttonSolution: {
      backgroundColor: '#4063A4',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height: 50,
    },
    correctSolution: {
      backgroundColor: '#89D630',
    }, 

       /* ------ Button Continue -------- */
    continuarButton_Enabled: {
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#82C0CC",
      borderRadius: 20,
    },
    continuarText:{
      color: '#fff',
      fontSize: 20
    },
    continuarButton_Disabled: {
      width: 200,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#C3C3C3",
      borderRadius: 20,
    }

  });
  export default L3A3Q1

