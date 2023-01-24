import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'



let sound;
const L3A1Q1 = ({navigation}) => {

  const playAudio = async (path) => {
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(path);
        await sound.playAsync();
    } catch (error) {
        console.log(error);
        }
    } 

    useEffect(() => {
    return () => sound.unloadAsync();
    }, []);


  return (
    <View style= {styles.AppContainer}>

    <Text style={styles.statementText}>Maykan wiwata yana kan</Text>

    <Image style={styles.catImage} source={require('../assets/black-cat.jpeg')}/>

    <TouchableOpacity
        style={styles.optionButton} 
        onPress={() => {
          playAudio(require('../assets/audios/missika_yanami_kan.mp3'));
        }}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Missika yanami kan</Text>
    </TouchableOpacity>

    <Image style={styles.serpentImage} source={require('../assets/serpent.jpeg')} />

    <TouchableOpacity
        style={styles.optionButton}
        onPress={() => {
          playAudio(require('../assets/audios/amaruka_killumi_kan.mp3'));
        }}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Amaruka killumi kan</Text>
    </TouchableOpacity>

    <Image style={styles.serpentImage} source={require('../assets/pig.jpeg')} />

    <TouchableOpacity
        style={styles.optionButton}
        onPress={() => {
          playAudio(require('../assets/audios/kuchika_pukami_kan.mp3'));
        }}
        >
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Kuchika pukami kan</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate('L3A1Q2')}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
    </TouchableOpacity>

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
    paddingRight:5,
    justifyContent:'space-around',
    alignItems: 'center',
  },
  statementText: {
    color: '#F18701',
    fontSize: 28,
    fontWeight: 'bold',
  },
  optionButton: {
    width: 400,
    height: 40,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  optionText: {
    color: '#000',
    fontSize: 20,
    marginLeft:20
  },
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
    width: 184,
    height: 100,
  },
  serpentImage:{
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
  },
});

export default L3A1Q1;