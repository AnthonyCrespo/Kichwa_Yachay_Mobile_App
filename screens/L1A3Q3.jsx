import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


let sound;
const L1A3Q3 = ({navigation}) => {

  const playAudio = async () => {

    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('../assets/audios/killu.mp3'));
        await sound.playAsync();
    } catch (error) {
        console.log(error);
    }
} 

useEffect(() => {
return () => sound.unloadAsync();
}, []);

  return (
    <View style={styles.AppContainer}>

      <View style={styles.statementContainer}>
        <Text style={styles.statementText}>Escuche y seleccione</Text>
      </View>      

      <View style={styles.audioContainer}> 
      <TouchableOpacity
          style={styles.audioButton} onPress={playAudio}>
          <Icon name="volume-up" size={30} color="black"/>
          <Text style={{fontSize:25, marginLeft:20}}>
          Killu
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>  
      <View style={styles.blacksquare}></View>
      <View style={styles.redsquare}></View>
      <View style={styles.yellowsquare}></View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('L1 Resultados')}
          style={styles.continueButton}>
          <Text style={styles.continueText}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5
  },
  statementContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'center',
    paddingBottom:15,
    paddingTop:15
  },
  statementText: {
    color: '#F18701',
    fontSize: 28,
    fontWeight: 'bold',
  },
  audioContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignContent: 'space-around',
    paddingBottom:15,
    paddingTop:15
  },
  audioButton:{
    width: 300,
    height: 40,
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'center',
  },
  optionsContainer: {
    flex: 4,
    flexDirection: 'row',
    marginTop: 50,
    justifyContent:'space-around',
  },
  blacksquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: 'black'
  },
  redsquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#CB2626'
  },
  yellowsquare: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#FFDD00'
  },
  squareOption: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  continueButton: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#82C0CC",
    borderRadius: 20,
  },
  continueText:{
    color: '#fff',
    fontSize: 24
  }
});

export default L1A3Q3;

