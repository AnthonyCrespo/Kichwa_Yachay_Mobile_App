import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity  } from 'react-native';


const Lessons= ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', top: 60, alignContent:'center'}}>
                <Text style={{fontSize:20, fontWeight: 'bold',marginBottom:10, alignSelf:'center'}}> 
                    Lección 1: Actividades 
                </Text>
                <Text style={{color: '#F18701', fontSize:30, fontWeight: 'bold'}}> 
                Colores/Tullpukuna 
                </Text>
            </View>

            <View style={{flexDirection: 'column'}}>
            <TouchableOpacity /* onPress={() => navigation.navigate('Home')} */>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}> 
                        Actividad 1 - Seleccionar 
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity /* onPress={() => navigation.navigate('Home')} */>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}> 
                        Actividad 2 - Traducir 
                    </Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.buttonContainer} /* onPress={() => navigation.navigate('Home')} */>
                    <Text style={styles.buttonText}> 
                        Actividad 3 - Escuchar
                    </Text> 
                </View>
            </TouchableOpacity>
            </View>


        <StatusBar style="auto" />
        </View>
      );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: "#666BCA",
        marginVertical:40,
        borderRadius: 10, 
        paddingVertical: 40,
        paddingHorizontal: 20 
        },

    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 'center',
        alignSelf: "center",
        marginHorizontal: 40
      }
})
export default Lessons