import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut} from 'firebase/auth';
import { getApp} from 'firebase/app'

import {  } from 'react-native';
const Home = ({navigation}) => {
  const app = getApp();
  const auth = getAuth(app);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Elimina la información de sesión del almacenamiento local
      await AsyncStorage.removeItem('usuario');
      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.navigate('Login');
      //setSubscreen(0)
    } catch (error) {
      console.log('Error al cerrar la sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const [units, setUnits] = useState([
    {
      id: 1,
      title: 'UNIDAD 1',
      lessons: [
        { id: 1, title: 'Lección 1', subtitle:'Colores/Tullpukuna' },
        { id: 2, title: 'Lección 2', subtitle:'Animales/Wiwakuna' },
        { id: 3, title: 'Lección 3' ,subtitle:' ' },
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

/*   const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
  
    return () => backHandler.remove();
  }, []);
 */

  /* const navigation = useNavigation(); */
  const [selectedLesson, setSelectedLesson] = useState(null);
  const handlePress = (lesson,subtitle) => {
    setSelectedLesson(lesson);
    // navegar a la vista de actividades y pasar la lección seleccionada como parámetro
    navigation.navigate('Lessons', {lesson, subtitle});
  };


  const [currentUnit, setCurrentUnit] = useState(0);
  const { height, width } = Dimensions.get('window');
  const topPadding = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;
  const [currentSubscreen, setSubscreen] = useState(0);
    if (currentSubscreen===0)
    return (
      <View style={styles_home.container}>
        <View style={{ backgroundColor: '#383A45', width: '100%', height: 65, alignItems: 'center', justifyContent: 'center', paddingTop:topPadding}}>
          <Text style={{ color: 'white', fontSize:25, fontWeight: 'bold' }}>{units[currentUnit].title}</Text>
        </View>
        <FlatList
          data={units[currentUnit].lessons}
          renderItem={({ item }) => (
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                   onPress={() => handlePress(item.id, item.subtitle)
                }
                style={{ width: 130, height: 130, borderRadius: 65, marginVertical:25, backgroundColor: '#00bfff', padding: 20, alignItems: 'center', justifyContent: 'center'  }}
              >
                <Text style={{ color: 'white', fontWeight:'bold',  fontSize:18 }}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
    
        {/* -----------Bottom Bar ---------------------------*/}
        <View style={styles_home.bottomBar}>
        <TouchableOpacity onPress={() => setSubscreen(0)}>
          <Image style={styles_home.icon} source={require('../assets/home_icon.png')} />
        </TouchableOpacity>
    
        <TouchableOpacity onPress={() => setSubscreen(1)}>
          <Image style={styles_home.icon} source={require('../assets/profile_icon.png')} />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />   
      </View>
    )
    
  return (
    <View style={styles_perfil.container}>
      <Text style={styles_perfil.headerText}>Perfil</Text>
      <View style={styles_perfil.profileContainer}>
        <View style={styles_perfil.textContainer}>
          <Text style={styles_perfil.nameText}>Nombre del usuario</Text>
          <Text style={styles_perfil.usernameText}>username</Text>
        </View>
        <Image
          source={require('../assets/user_photo.png')}
          style={styles_perfil.profileImage}
        />
      </View>
      <Text style={styles_perfil.progressHeader}>Progreso</Text>
      <FlatList styles_perfil = {styles_perfil.contentContainer}
        contentContainerStyle={styles_perfil.contentContainer}
        data={[2.5,5,5]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <ProgressBar widthPct={item} />}
      />

      <TouchableOpacity style = {{backgroundColor:'#C33E5B',borderRadius:25,paddingVertical:15,
                                  paddingHorizontal:80,marginBottom:60}}
                        onPress={handleSignOut}>
      <Text style={{color:'white', fontSize:15}}> Cerrar Sesión </Text>
      </TouchableOpacity>

    <View style={styles_perfil.bottomBar}>
      <TouchableOpacity onPress={() => setSubscreen(0)}>
        <Image style={styles_perfil.icon} source={require('../assets/home_icon.png')} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSubscreen(1)}>
        <Image style={styles_perfil.icon} source={require('../assets/profile_icon.png')} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />   
    </View>

  );

}
const {width} = Dimensions.get('screen');
const ProgressBar = ({widthPct}) => {
  const finalWidth = (width * widthPct) / 10;
  return (
    <View style={styles_perfil.unitContainer}>
      <Text style={styles_perfil.unitText}>Unidad X</Text>
      <View style={[styles_perfil.progressBar, {width: finalWidth}]} />
    </View>
  );
};

const styles_home = StyleSheet.create({
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

  const styles_perfil = StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 30,
    },
    barContainer: {
      padding: 40,
    },
    progressBar: {
      backgroundColor: '#B2C908',
      height: 30,
      borderRadius: 15,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    headerText: {
      fontSize: 20,
      marginTop: 30,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 40,
      borderRadius: 15
    },
    textContainer: {
      marginRight: 10,
    },
    nameText: {
      fontSize: 20,
    },
    usernameText: {
      fontSize: 15,
      color: 'gray',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    progressHeader: {
      fontSize: 20,
      marginTop: 20,
    },
    progressContainer: {
      marginTop: 10,
    },
    unitContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    unitText: {
      fontSize: 18,
      marginRight: 10,
    },
    progressText: {
      marginLeft: 10,
      fontSize: 18,
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
  });
  export default Home