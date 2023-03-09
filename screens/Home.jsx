import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut} from 'firebase/auth';
import { getApp} from 'firebase/app'
import { getFirestore,updateDoc,setDoc,  collection, getDocs,getDoc, doc } from 'firebase/firestore';
import LoadingScreen from './loadingScreen';
import CerrandoSesion from './cerrandoSesion'
import ProgressBar from 'react-native-progress/Bar';
import Constants from 'expo-constants';



const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;


const Home = ({navigation}) => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")

  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
 /*--------------------------------------------------------------------------------------------  */
  /*---------------------------------------- Database -----------------------------------------  */
  /*--------------------------------------------------------------------------------------------*/
  const [user_progress, set_user_progress] = useState(null);

 
  async function getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'Units_Lessons'));
    // Loop through the documents
    const docs = [];
    querySnapshot.forEach(doc => {
      // Get the document data
      const data = doc.data();
      // Add the document data to the array
      docs.push(data);
    });
    setUnits(docs);
  }

  async function getDocumentWithUserId() {
    const currentUser = auth.currentUser;
    const userId = currentUser.uid;
    const docRef = doc(getFirestore(), 'Users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      set_user_progress(docSnap.data);
      // Aquí puedes hacer lo que necesites con los datos del documento
    } else {
      console.log('No such document!');
    }
  }  

  
/*   async function getDocumentWithUserId() {
    const user = auth.currentUser;
    if (user !== null) {
      const userId = user.uid;
      console.log("HOLAAA")
      const docRef = doc(getFirestore(), 'Users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set_user_progress(docSnap)
        // Aquí puedes hacer lo que necesites con los datos del documento
      } else {
        console.log('No such document!');
      }
    } else {
      console.log('User is not authenticated!');
    }
  } */

  useEffect(() => {
    getDocuments();
  }, []);

  
/*   useEffect(() => {
    getDocumentWithUserId();
  }, []);
 */


  auth.onAuthStateChanged(async function(currentUser) {
    if (currentUser) {
      const userId = currentUser.uid;
      const userDocRef = doc(db, 'Users', userId);
  
      try {
        const userDoc = await getDoc(userDocRef);
        const username = userDoc.data().username;
        const name = userDoc.data().name;
/*         console.log('Username:', username);
        console.log('Name:', name); */
        setName(name)
        setUsername(username, username)
      } catch (error) {
        console.log('Error al obtener los datos del usuario:', error);
      }
    } else {
      //console.log('El usuario no ha iniciado sesión');
    }
  });


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Elimina la información de sesión del almacenamiento local
      await AsyncStorage.removeItem('usuario');
      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.navigate('Login');
      setSigninOut(1)
      setSubscreen(0)
      setSigninOut(0)   
     } catch (error) {
      console.log('Error al cerrar la sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  const [units, setUnits] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const handlePress = (unit, lesson,subtitle) => {
    setSelectedLesson(lesson);
    // navegar a la vista de actividades y pasar la lección seleccionada como parámetro
    navigation.navigate('Lessons', {unit, lesson, subtitle});
  };


  const [currentUnit, setCurrentUnit] = useState(0);
  const { height, width } = Dimensions.get('window');
  const [currentSubscreen, setSubscreen] = useState(0);
  const [signinOut,setSigninOut] = useState(0)

  if (units === null ) {
    return (
      <LoadingScreen/>
    );
  }
  if (signinOut  === 1) {
    return (
      <CerrandoSesion/>
    );}

  /* -----------------------------------------------------------------------------  */
  /* -------------------------------  Home ------------------------------------  */
  /* -----------------------------------------------------------------------------  */
    if (currentSubscreen===0)
    return (
      <View style={styles_home.container}>

      <View style={styles_perfil.title_container}>
        <Text style={styles_perfil.headerText}>Unidades</Text>
      </View>
        <View style={{ backgroundColor: '#89D630', 
                       marginVertical:20, 
                       height: 50,
                       width:"70%", 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       paddingTop:10,
                       borderRadius:20
                      }}>
                        
          <Text style={{ color: 'white', 
                         fontSize:20, 
                         fontWeight: 'bold' 
                         }}>
                          {units[currentUnit].title}
          </Text>
        </View>


        <FlatList
          data={units[currentUnit].lessons}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                   onPress={() => handlePress(units[currentUnit].id, item.id, item.subtitle)
                }
                style={styles_home.unit_button}
              >
                <Text style={{ color: 'white', 
                              fontWeight:'bold',  
                              fontSize:18 ,
                              }}>
                              {item.title}
                </Text>
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
  

  /* -----------------------------------------------------------------------------  */
  /* ------------------------------- Profile ------------------------------------  */
  /* -----------------------------------------------------------------------------  */
  if (currentSubscreen===1)
  console.log(user_progress)
  return (
    <View style={styles_perfil.container}>

      <View style={styles_perfil.title_container}>
        <Text style={styles_perfil.headerText}>Perfil</Text>
      </View>

      <View style={styles_perfil.profileContainer}>
        <View style={styles_perfil.textContainer}>
          <Text style={styles_perfil.nameText}>{name}</Text>
          <Text style={styles_perfil.usernameText}>{username}</Text>
        </View>

        <Image
          source={require('../assets/user_photo.png')}
          style={styles_perfil.profileImage}
        />
      </View>

    <View style={styles_perfil.progressContainer}>
      <Text style={styles_perfil.progressHeader}>Progreso</Text>
      <Text style={styles_perfil.unitName}>Unidad 1</Text>
      <ProgressBar progress={60/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginBottom:20}}
                    />
      <Text style={styles_perfil.unitName}>Unidad 2</Text>
      <ProgressBar progress={0/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginBottom:20}}
                    />
      <Text style={styles_perfil.unitName}>Unidad 3</Text>
      <ProgressBar progress={0/100} width={300} 
                   height={25} color={'#89D630'} unfilledColor={'#C8C8C8'}
                   borderWidth={0} style= {{borderRadius:25, marginBottom:20}}
                    />



    </View>

    <TouchableOpacity style = {styles_perfil.signout_button}
                        onPress={handleSignOut}>
      <Text style={styles_perfil.signout_text}> Cerrar Sesión </Text>
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
/* const ProgressBar = ({widthPct}) => {
  const finalWidth = (width * widthPct) / 10;
  return (
    <View style={styles_perfil.unitContainer}>
      <Text style={styles_perfil.unitText}>Unidad X</Text>
      <View style={[styles_perfil.progressBar, {width: finalWidth}]} />
    </View>
  );
}; */

const styles_home = StyleSheet.create({


    container: {
      flex: 1,
      marginTop: topMargin,
      backgroundColor: '#F5F5F8',
      alignItems: 'center',
      justifyContent: 'center',
    },

    unitText: {
      fontSize: 18,
      color: '292D3E',
      alignSelf: "center"
    },

    unit_button:  { 
      width: 150, 
      height: 150, 
      borderRadius: 100, 
      marginBottom:20, 
      backgroundColor: "#2196F3",//'#00bfff', 
      //padding: 20, 
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:0,
      borderColor:"black"  },

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

    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      marginTop: topMargin 
    },

    title_container:{
      backgroundColor: '#292D3E', 
      width: '100%',
      alignContent:"center",
      alignItems:"center",
      paddingVertical:20},

    headerText: {
      fontSize: 25,
      color:"white"
    },


    /*-------- Profile Container  ---------- */
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      marginTop: 0,
      marginBottom: 20,
      width:'100%',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      //borderColor: '#292D3E',
      padding: 30,
      //borderRadius: 15,
      backgroundColor: "#F1F1F1"
    },
    textContainer: {
      marginRight: 25,
    },
    nameText: {
      fontSize: 22,
    },
    usernameText: {
      fontSize: 15,
      color: 'gray',
      fontWeight:"bold"
    },
    profileImage: {
      width: 115,
      height: 130,
      borderRadius: 45
    },


    /* ---------- Progress Container ------- */
    progressContainer: {
      marginTop: 20,
      alignItems:"center",
      //justifyContent:"flex-start"
    },

    progressHeader: {
      fontSize: 25,
      marginVertical:15,
      fontWeight:"bold",
      color:"#383A45"

    },

    unitName: {
      fontSize: 20,
      //marginVertical:15
    },

    /* ------- Sign Out Button ------------ */
    signout_button:{
      backgroundColor:'#C33E5B',
      borderRadius:35,
      paddingVertical:12,
      paddingHorizontal:40,
      //marginBottom:100,
      position:"absolute",
      bottom: 80
    },

    signout_text:{
      color:'white', 
      fontSize:18
    },
    /*  ---------  Bottom Bar --------- */
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