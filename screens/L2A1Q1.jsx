import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

const L2A1Q1 = ({ navigation }) => {
  return (
    <View style= {styles.AppContainer}>
      
      <Text style={styles.statementText}>¿Cuál es el perro?</Text>

      <View style={styles.optionContainer}>  
        <Image style={styles.catImage} source={require('../assets/white-cat.jpeg')}/>

        <TouchableOpacity
          style={styles.optionButton}>
            <Text style={styles.optionText}>missi</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>  
        <Image style={styles.cowImage} source={require('../assets/cow-2.jpeg')}/>

        <TouchableOpacity
          style={styles.optionButton}>
            <Text style={styles.optionText}>wakra</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>  
        <Image style={styles.dogImage} source={require('../assets/yellow-dog.jpeg')}/>

        <TouchableOpacity
          style={styles.optionButton}>
            <Text style={styles.optionText}>allku</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        // onPress={() => navigation.navigate('L1A2 Pregunta 2')}
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
    justifyContent:'space_around',
    alignItems: 'center',
  },
  statementText: {
    color: '#F18701',
    fontSize: 28,
    fontWeight: 'bold',
  },
  optionContainer:{
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  optionButton: {
    width: 200,
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
    width:59,
    height:125,
  },
  cowImage:{
    width:146,
    height:117,
  },
  dogImage:{
    width:160,
    height:133,
  }
});

export default L2A1Q1;
