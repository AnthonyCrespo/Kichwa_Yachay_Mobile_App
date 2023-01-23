import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

function A1Pregunta1({navigation}) {
  return (
    <View style= {styles.AppContainer}>

    <Text style={styles.statementText}>Maykan wiwata yana kan</Text>

    <Image style={styles.catImage} source={require('../assets/black-cat.jpeg')}/>

    <TouchableOpacity
        style={styles.optionButton}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Missika yanami kan</Text>
    </TouchableOpacity>

    <Image style={styles.serpentImage} source={require('../assets/serpent.jpeg')} />

    <TouchableOpacity
        style={styles.optionButton}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Amaruka killumi kan</Text>
    </TouchableOpacity>

    <Image style={styles.serpentImage} source={require('../assets/pig.jpeg')} />

    <TouchableOpacity
        style={styles.optionButton}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Kuchika pukami kan</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate('L3A1 Pregunta 2')}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
    </TouchableOpacity>

    <StatusBar style="auto" />

    </View>
  );
}

function A1Pregunta2({navigation}) {
  return (
    <View style={styles.AppContainer}>
      
    <Text style={styles.statementText}>Maykan wiwata yurak kan</Text>

    <Image style={styles.catImage} source={require('../assets/yellow-fish.jpeg')}/>

    <TouchableOpacity
    style={styles.optionButton}>
      <Icon name="volume-up" size={20} color="black"/>
      <Text style={styles.optionText}>Challwaka killumi kan</Text>
    </TouchableOpacity>

    <Image style={styles.bullImage} source={require('../assets/bull.jpeg')}/>

    <TouchableOpacity
    style={styles.optionButton}>
      <Icon name="volume-up" size={20} color="black"/>
      <Text style={styles.optionText}>Wakraka pukami kan </Text>
    </TouchableOpacity>

    <Image style={styles.whitedogImage} source={require('../assets/white-dog.jpeg')}/>

    <TouchableOpacity
    style={styles.optionButton}>
      <Icon name="volume-up" size={20} color="black"/>
      <Text style={styles.optionText}>Allkuka yurakmi kan</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate('L3A1 Pregunta 3')}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
    </TouchableOpacity>

    <StatusBar style="auto" />

    </View>
  );
}

function A1Pregunta3({navigation}) {
  return (
    <View style={styles.AppContainer}>

    <Text style={styles.statementText}>Maykan wiwata puka kan</Text>

    <Image style={styles.henImage} source={require('../assets/hen.jpeg')}/>

    <TouchableOpacity
        style={styles.optionButton}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Atallpaka yanami kan</Text>
    </TouchableOpacity>

    <Image style={styles.redfishImage} source={require('../assets/red-fish.jpeg')}/>

    <TouchableOpacity
        style={styles.optionButton}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Challwaka pukammi kan</Text>
    </TouchableOpacity>

    <Image style={styles.catImage} source={require('../assets/black-cat.jpeg')}/>

    <TouchableOpacity
        style={styles.optionButton}>
        <Icon name="volume-up" size={20} color="black"/>
        <Text style={styles.optionText}>Challwaka pukammi kan</Text>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => navigation.navigate('L3A1 Pregunta 4')}
        style={styles.continueButton}>
        <Text style={styles.continueText}>Continuar</Text>
    </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
  );
}

function A1Pregunta4({navigation}) {
    return (
      <View style={styles.AppContainer}>
  
        <Text style={styles.statementText}>Maykan wiwata killu kan</Text>

        <Image style={styles.blackdogImage} source={require('../assets/black-dog.jpeg')}/>

        <TouchableOpacity
            style={styles.optionButton}>
            <Icon name="volume-up" size={20} color="black"/>
            <Text style={styles.optionText}>Allkuka yanami kan</Text>
        </TouchableOpacity>

        <Image style={styles.cowImage} source={require('../assets/cow-1.jpeg')}/>

        <TouchableOpacity
            style={styles.optionButton}>
            <Icon name="volume-up" size={20} color="black"/>
            <Text style={styles.optionText}>Wakrakra yurakmi kan</Text>
        </TouchableOpacity>

        <Image style={styles.serpentImage} source={require('../assets/serpent.jpeg')}/>

        <TouchableOpacity
            style={styles.optionButton}>
            <Icon name="volume-up" size={20} color="black"/>
            <Text style={styles.optionText}>Amaruka killumi kan</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('L3A1 Pregunta 4')}
            style={styles.continueButton}>
            <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
  
      </View>
    );
  }

const styles = StyleSheet.create({
  AppContainer: {
    backgroundColor: '#fff',
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5,
    justifyContent:'flex-start',
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

export {A1Pregunta1, A1Pregunta2, A1Pregunta3, A1Pregunta4};

