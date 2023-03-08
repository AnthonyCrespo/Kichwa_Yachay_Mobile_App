import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { Alert, StyleSheet, Button,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
import useCronometro from './functions/cronometer';
import ProgressBar from 'react-native-progress/Bar';

let porcentaje = 0

const L3A3Q1= ({navigation}) => {

    const [leftItems, setLeftItems] = useState(['Perro', 'Cuál', 'Es', 'Negro', 'Blanco', 'Gato']);
    const [rightItems, setRightItems] = useState(['Allku','Maykan', 'Yana', 'Missi', 'Yurak', 'Kan']);
    const [selectedLeft, setSelectedLeft] = useState([]);
    const [selectedRight, setSelectedRight] = useState([]);
    const [Left, setLeft] = useState([]);
    const [Right, setRight] = useState([]);
    const [correctPairs, setCorrectPairs] = useState([]);
    const [incorrectPairs, setIncorrectPairs] = useState([]);

    const segundos = useCronometro();
    const [porcentaje, setPorcentaje] = useState(0);
  
    const handleContinuePress = () => {
      setPorcentaje(100)
      navigation.navigate("Result", {puntuation3: 100, 
                                       time_taken: segundos,
                                       unit:1, 
                                       lesson:3, 
                                       activity:3,
                                       subtitle:' '});
    }
    const handlePress = (type, item) => {
      if (type === 'left') {
        //setLeft([...Left, item])
        setSelectedLeft(item);
      } else {
        
        setSelectedRight(item);
      }
      if (selectedLeft && type === 'right') {

        if (selectedLeft === 'Perro' && item === 'Allku') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
          //Alert.alert('Respuesta correcta');

        }

        else if (selectedLeft === 'Cuál' && item === 'Maykan') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
          //Alert.alert('Respuesta correcta');
        } 
        else if (selectedLeft === 'Es' && item === 'Kan') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
          //Alert.alert('Respuesta correcta');
        }
        else if (selectedLeft === 'Gato' && item === 'Missi') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
          //Alert.alert('Respuesta correcta');
        }
        else if (selectedLeft === 'Negro' && item === 'Yana') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
          //Alert.alert('Respuesta correcta');
        }
        else if (selectedLeft === 'Blanco' && item === 'Yurak') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
          setLeft([...Left, selectedLeft]);
          setRight([...Right, item]);
          //Alert.alert('Respuesta correcta');
        }
        else {
            Alert.alert('Respuesta incorrecta');
            setIncorrectPairs([...incorrectPairs, { left: selectedLeft, right: item }]);
        }
      }
    };
    
    const resetActivity = () => {
      setLeftItems(['Perro', 'Cuál', 'Es', 'Negro', 'Blanco', 'Gato']);
      setRightItems(['Allku','Maykan', 'Yana', 'Missi', 'Yurak', 'Kan']);
      setSelectedLeft([]);
      setSelectedRight([]);
      setLeft([]);
      setRight([]);
      setCorrectPairs([]);
      setIncorrectPairs([]);
    };


    return (
      <View style={styles.container}>
{/*         <View style={{ margin: 20 }}>
          <Text style={styles.Title}>Actividad 3/Rurana 3</Text>
        </View> */}
        <Text style={styles.Title}>Relacione las palabras</Text>

        <ProgressBar progress={porcentaje/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25}}
                    />

        
        <View style={{ flexDirection: 'row', margin: 40 }}>

          
<View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap', alignContent:"center" }}>
  {leftItems.map((item, index) => {
    const isCorrect = correctPairs.find((pair) => pair.left === item);
    const isIncorrect = incorrectPairs.find((pair) => pair.left === item);
     return (
      <TouchableOpacity
        key={`left_${index}`}
        style={[
          styles.buttonSolution,
          //Left.includes(item)&& styles.alertCorrect,
          isCorrect && styles.correctSolution,
          //isIncorrect && styles.buttonSolution

      ]}
        onPress={() => {handlePress('left', item);         
                  }}
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
     //const isIncorrect = incorrectPairs.find((pair) => pair.right === item);
     return (
      <TouchableOpacity
        key={`right_${index}`}
        style={[
          styles.buttonSolution,
          //Right.includes(item)  && styles.alertCorrect,
          isCorrect && styles.correctSolution,

        ]}
        onPress={() => {
          handlePress('right', item);
        }}
        disabled={ Right.includes(item)}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>{item}</Text>
      </TouchableOpacity>
    );
  })}
</View>

  </View>

        
{/*           <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={resetActivity} >
              <Text style={styles.buttonText}> Reset </Text> 
            </TouchableOpacity>
            </View> */}


            {/* <View style={styles.buttonContainer}> */}
            <TouchableOpacity
            style={correctPairs.length !== 6 ? styles.continuarButton_Disabled  : styles.continuarButton_Enabled }
            disabled={correctPairs.length !== 6}
            onPress={handleContinuePress}
          >
            <Text style={styles.continuarText}>Continuar</Text>
          </TouchableOpacity>
           {/*  </View> */}

  
        <StatusBar style="auto" />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Title: {
      fontSize: 30,
      color: '#F2570A',
      fontWeight: 'bold',
      //translateX: 200,
      //translateY: 10
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

    buttonSolution: {
      backgroundColor: '#383A45',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray',
      width: '70%',
      height: 50,
    },
    correctSolution: {
      backgroundColor: '#89D630',
    },
    incorrectSolution: {
      backgroundColor:'#EE5655',
    }, 
    alertCorrect: { 
      backgroundColor: 'blue' 
    },
    alerIncorrect:{
      backgroundColor: 'red'
    },


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

