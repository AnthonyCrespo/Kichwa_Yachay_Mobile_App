import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const L1A1Q3 = ({navigation}) => {
    return (
      <View style={styles.AppContainer}>
  
        <View style={styles.statementContainer}>
          <Text style={styles.statementText}>¿Cuál es el color amarillo?</Text>
        </View>
        
        <View style={styles.optionsContainer}> 
  
        <View style={styles.optionContainer}>  
        <View style={styles.redsquare}></View>
        <TouchableOpacity
          style={styles.optionButton}>
          <Text style={styles.optionText}>Puka</Text>
        </TouchableOpacity>
        </View>
  
        <View style={styles.optionContainer}>  
        <View style={styles.yellowsquare}></View>
        <TouchableOpacity
          style={styles.optionButton}>
          <Text style={styles.optionText}>Killu</Text>
        </TouchableOpacity>
        </View>
  
        <View style={styles.optionContainer}>  
        <View style={styles.blacksquare}></View>
        <TouchableOpacity
          style={styles.optionButton}>
          <Text style={styles.optionText}>Yana</Text>
        </TouchableOpacity>
        </View>
        
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('L1A2 Pregunta 1')}
            style={styles.continueButton}>
            <Text style={styles.continueText}>Continuar</Text>
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
    optionsContainer: {
      flex: 5,
      justifyContent: 'flex-start',
    },
    optionContainer: {
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'space-between',
      paddingRight:50,
      paddingLeft:30,
      marginBottom:15,
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
    buttonContainer:{
      flex: 3,
      marginTop: 50,
      alignItems: 'center',
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
  
  export default L1A1Q3;
  
  