import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const L1A1Q1 = ({route, navigation}) => {
  return (
    <View style= {styles.AppContainer}>

      <View style={styles.statementContainer}>
        <Text style={styles.statementText}>¿Cuál es el color negro?</Text>
      </View>

      <View style={styles.optionContainer}>  
        <View style={styles.itemContainer}>
            <View style={styles.blacksquare}></View>
        </View> 

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.optionButton}>
            <Text style={styles.optionText}>Yana</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}> 
        <View style={styles.itemContainer}>
          <View style={styles.redsquare}></View>
        </View> 

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {return ('Puka')}}
            style={styles.optionButton}>
            <Text style={styles.optionText}>Puka</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>  

        <View style={styles.itemContainer}>
          <View style={styles.yellowsquare}></View>
        </View> 

        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => {return ('Killu')}}
            style={styles.optionButton}>
            <Text style={styles.optionText}>Killu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('L1A1Q2')}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop:20,
    paddingLeft:5,
    paddingRight:5
  },
  statementContainer: {
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom:15,
    paddingTop:15
  },
  statementText: {
    color: '#F18701',
    fontSize: 28,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingRight:50,
    paddingLeft:30,
    marginBottom:15,
  },
  itemContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
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
  optionButton: {
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

export default L1A1Q1;