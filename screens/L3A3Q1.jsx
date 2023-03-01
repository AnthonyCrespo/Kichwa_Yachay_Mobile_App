import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet, Button,Text, View, TextInput,Image, TouchableOpacity, Linking } from 'react-native';
  
const L3A3Q1= ({navigation}) => {

    const [leftItems, setLeftItems] = useState(['Perro', 'Cuál', 'Es', 'Negro', 'Blanco', 'Gato']);
    const [rightItems, setRightItems] = useState(['Allku','Maykan', 'Yana', 'Missi', 'Yurak', 'Kan']);
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [selectedRight, setSelectedRight] = useState(null);
    const [correctPairs, setCorrectPairs] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [incorrectPairs, setIncorrectPairs] = useState([]);
/*     const [selectedPair, setSelectedPair] = useState({ left: null, right: null });
 */
 /*    const checkPair = (left, right) => {
      return correctPairs.some((pair) => pair.left === left && pair.right === right);
    }; */
  
    const handlePress = (type, item) => {
      if (type === 'left') {
        setSelectedLeft(item);
      } else {
        setSelectedRight(item);
      }
      if (selectedLeft && type === 'right') {

        if (selectedLeft === 'Perro' && item === 'Allku') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
        } else if (selectedLeft === 'Cuál' && item === 'Maykan') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
        } 
        else if (selectedLeft === 'Es' && item === 'Kan') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
        }
        else if (selectedLeft === 'Gato' && item === 'Missi') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
        }
        else if (selectedLeft === 'Negro' && item === 'Yana') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
        }
        else if (selectedLeft === 'Blanco' && item === 'Yurak') {
          setCorrectPairs([...correctPairs, { left: selectedLeft, right: item }]);
        }
        else {
          setIncorrectPairs([...incorrectPairs, { left: selectedLeft, right: item }]);
        }
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    };
    
    //--------------
    let numCorrect = 0;
    let numIncorrect = 0;
    //--------------
    const handleCheckAnswers = () => {
      const correctAnswers = [
                              { left: 'Perro', right: 'Allku' }, 
                              { left: 'Cuál', right: 'Maykan' },
                              { left: 'Es', right: 'Kan' }, 
                              { left: 'Gato', right: 'Missi' }, 
                              { left: 'Negro', right: 'Yana' },
                              { left: 'Blanco', right: 'Yurak' }, 
                            ];
      let isCorrect = true;
      correctAnswers.forEach(answer=> {
        if (!correctPairs.some(pair => pair.left === answer.left && pair.right === answer.right)) {
          isCorrect = false;
          numIncorrect += 1;
          incorrectPairs.push(answer);
        } else{numCorrect += 1;}
      });
      setShowResults(true);
      
      
        /* 'Resultados', */
        isCorrect ? '¡Felicidades, todas tus respuestas son correctas!' : 'Una o más respuestas son incorrectas'
        [
          {
/*             text: 'OK',
 */            onPress: () => setShowResults(false)
          }
        ]
    
    };

    const resetActivity = () => {
      setLeftItems(['Perro', 'Cuál', 'Es', 'Negro', 'Blanco', 'Gato']);
      setRightItems(['Allku','Maykan', 'Yana', 'Missi', 'Yurak', 'Kan']);
      setSelectedLeft(null);
      setSelectedRight(null);
      setCorrectPairs([]);
      setIncorrectPairs([]);
      setShowResults(false);
    };


    return (
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <Text style={styles.Title}>Actividad 3/Rurana 3</Text>
        </View>
  
        <Text style={styles.subTitle}>Relacione las palabras</Text>

        
        <View style={{ flexDirection: 'row', margin: 40 }}>

          
<View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
  {leftItems.map((item, index) => {
    const isCorrect = correctPairs.find((pair) => pair.left === item);
    const isIncorrect = incorrectPairs.find((pair) => pair.left === item);
     return (
      <TouchableOpacity
        key={`left_${index}`}
        style={[
          styles.buttonSolution,
          isCorrect && styles.correctSolution,
          isIncorrect && styles.incorrectSolution,
      ]}
        onPress={() => {handlePress('left', item);
                      console.log(selectedLeft)
          
                  }}
        disabled={ /* correctPairs.find((pair) => pair.left === item) || incorrectPairs.find((pair) => pair.right === item)  &&*/ selectedLeft !== null}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item}</Text>
      </TouchableOpacity>
    );
  })}
</View>

<View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
  {rightItems.map((item, index) => {
     const isCorrect = correctPairs.find((pair) => pair.right === item);
     const isIncorrect = incorrectPairs.find((pair) => pair.right === item);
     return (
      <TouchableOpacity
        key={`right_${index}`}
        style={[
          styles.buttonSolution,
          isCorrect && styles.correctSolution,
          isIncorrect && styles.incorrectSolution ,
        ]}
        onPress={() => {
          handlePress('right', item);
        }}
        disabled={/* correctPairs.find((pair) => pair.right === item) && incorrectPairs.find((pair) => pair.left === item) && */ selectedRight !== null}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item}</Text>
      </TouchableOpacity>
    );
  })}
</View>

  </View>

        
          <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={resetActivity} >
              <Text style={styles.buttonText}> Reset </Text> 
            </TouchableOpacity>
            </View>


            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.checkButton}
                onPress={() => {
                  handleCheckAnswers();
                  alert(numCorrect + " respuestas correctas, " + numIncorrect + " respuestas incorrectas");
                  resetActivity();
                }}
              >
                <Text style={styles.buttonText}>Verificar</Text>
              </TouchableOpacity>
            </View>

  
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
    buttonContainer: {
      backgroundColor: '#82C0CC',
      padding: 10,
      borderRadius: 10,
      marginTop: 30,
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
    buttonSolution: {
      backgroundColor: 'lightgray',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray',
      width: '50%',
      height: 50,
    },
    correctSolution: {
      backgroundColor: 'green',
    },
    incorrectSolution: {
      backgroundColor:'red',
    }, 
   /*  Answer: {
      backgroundColor: '#48d1cc',
    },  */
  });
  export default L3A3Q1
