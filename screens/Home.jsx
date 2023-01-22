import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, FlatList, Dimensions   } from 'react-native';


const Home = ({navigation}) => {
  const [units, setUnits] = useState([
    {
      id: 1,
      title: 'UNIDAD 1',
      lessons: [
        { id: 1, title: 'Lección 1' },
        { id: 2, title: 'Lección 2' },
        { id: 3, title: 'Lección 3' },
      ],
    },
    {
      id: 2,
      title: 'UNIDAD 2',
      lessons: [
        { id: 4, title: 'Lección 1' },
        { id: 5, title: 'Lección 2' },
        { id: 6, title: 'Lección 3' },
      ],
    },
  ]);
  const [currentUnit, setCurrentUnit] = useState(0);
  const { height, width } = Dimensions.get('window');
  const topPadding = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
    return (

    <View style={styles.container}>
      <View style={{ backgroundColor: '#383A45', width: '100%', height: 65, alignItems: 'center', justifyContent: 'center', paddingTop:topPadding}}>
        <Text style={{ color: 'white', fontSize:25, fontWeight: 'bold' }}>{units[currentUnit].title}</Text>
      </View>
      <FlatList
        data={units[currentUnit].lessons}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Lessons')
              }}
              style={{ width: 130, height: 130, borderRadius: 65, marginVertical:25, backgroundColor: '#00bfff', padding: 20, alignItems: 'center', justifyContent: 'center'  }}
            >
              <Text style={{ color: 'white', fontWeight:'bold',  fontSize:18 }}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

{/*----------------- Button for pass lesson -----------------*/}
{/*       <View style={{ alignItems: 'center', marginBottom:100 }}>
        <TouchableOpacity
          onPress={() => {
            if (currentUnit < units.length - 1) {
              setCurrentUnit(currentUnit + 1);
            }
          }}
          style={{ backgroundColor: '#00bfff', padding: 10 }}
        >
          <Text style={{ color: 'white' }}>Next Unit fgdgfdfdgdfg</Text>
        </TouchableOpacity>
      </View> */}


      {/* -----------Bottom Bar ---------------------------*/}
      <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image style={styles.icon} source={require('../assets/home_icon.png')} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image style={styles.icon} source={require('../assets/profile_icon.png')} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />   
    </View>
  )
}

const styles = StyleSheet.create({
    unitText: {
      fontSize: 18,
      color: '292D3E',
      alignSelf: "center"
    },

    container: {
      flex: 1,
      paddingTop: 50, 
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
    },

    subTitle: {
      fontSize: 20,
      color: 'gray'
    },
    textInput: {
      padding: 10,
      paddingStart: 30,
      width: '80%',
      height: 50,
      marginTop: '5%',
      borderRadius: 10,
      backgroundColor: '#fff'
    },
  
    buttonContainer: {
      backgroundColor: "#82C0CC",
      marginTop: 25,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 125
      },

    socialButtonsContainer: {
        marginTop: 100
      },
      
    messageContainer: {
      marginTop: 10,
      alignSelf: 'center'
    },
    
    buttonText: {
      fontSize: 18,
      color: "#fff",
      alignSelf: "center"
    },
    socialButton: {
      width: 300,
      height: 40,
      marginTop: 10, 
      marginHorizontal: 10,
      borderRadius: 5,
    },
    logoApp: {
      width: 200,
      height: 70,
      marginBottom: 40
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#292D3E',
        paddingHorizontal: 20,
      },
      icon: {
        width: 30,
        height: 30,
      }
  })

  export default Home