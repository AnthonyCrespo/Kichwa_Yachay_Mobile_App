import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

const L2A1Q1 = ({ navigation }) => {
  return (
    <View style= {styles.AppContainer}>
      
      <Text style={styles.statementText}>¿Cuál es el perro?</Text>

      <View style={styles.optionContainer}>

        <View style={styles.itemContainer}>
          <Image style={styles.catImage} source={require('../assets/white-cat.jpeg')}/>
        </View>

        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.optionButton}>
              <Text style={styles.optionText}>missi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>  

        <View style={styles.itemContainer}>
          <Image style={styles.cowImage} source={require('../assets/cow-2.jpeg')}/>
        </View>

        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.optionButton}>
              <Text style={styles.optionText}>wakra</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>  
        <View style={styles.itemContainer}>
          <Image style={styles.dogImage} source={require('../assets/yellow-dog.jpeg')}/>
        </View>

        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.optionButton}>
              <Text style={styles.optionText}>allku</Text>
          </TouchableOpacity>
        </View>
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
  optionContainer:{
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionButton:{
    flex:1,
    width: 100,
    height: 40,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#000',
    fontSize: 20,
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
  itemContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
