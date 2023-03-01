import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const LoadingScreen = () => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../assets/logo.png')}
        />
        <Text style={styles.loadingText}>
          Cargando...
        </Text>
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
        with:250,
        height:75
    },
    loadingText:{
        //margin:20,
        fontSize:20,
        //fontWeight:'bold',
    }
})
export default LoadingScreen