import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getApp} from 'firebase/app'
import { getFirestore, collection, getDocs} from 'firebase/firestore';
import LoadingScreen from './loadingScreen';
import Constants from 'expo-constants';



const topMargin = Platform.OS === 'ios' ? 0 : Constants.statusBarHeight;

const Lessons= ({route}) => {
    const {unit, lesson, subtitle, subtitle_esp} = route.params;
    const [activities, setActivities] = useState(null);
    const navigation = useNavigation();
    let filteredActivities
/*     const activities = [
        { id: 1, title: 'Seleccionar', lessonId: 1, name_screen: 'L1A1'},
        { id: 2, title: 'Traducir', lessonId: 1, name_screen: 'L1A2Q1'},
        { id: 3, title: 'Escuchar', lessonId: 1, name_screen: 'L1A3'},
        { id: 1, title: 'Seleccionar', lessonId: 2, name_screen: 'L2A1' },
        { id: 2, title: 'Completar', lessonId: 2, name_screen: 'L2A2Q1'},
        { id: 3, title: 'Ordenar', lessonId: 2, name_screen: 'L2A3Q1'},
        { id: 1, title: 'Seleccionar', lessonId: 3, name_screen: 'L3A1'},
        { id: 2, title: 'Completar', lessonId: 3, name_screen: 'L3A2Q1'},
        { id: 3, title: 'Relacionar', lessonId: 3 , name_screen: 'L3A3Q1'}
      ];
 */
    
 /*--------------------------------------------------------------------------------------------  */
  /*---------------------------------------- Database -----------------------------------------  */
  /*--------------------------------------------------------------------------------------------*/
  const app = getApp();
  const db = getFirestore(app);
  async function getDocuments() {
        const querySnapshot = await getDocs(collection(db, 'Lessons'));
        // Loop through the documents
        const docs = [];
        querySnapshot.forEach(doc => {
        // Get the document data
        const data = doc.data();
        // Add the document data to the array
        docs.push(data);
        });
        setActivities(docs);
    }

    useEffect(() => {
        getDocuments();
    }, []);

    if (activities === null) {
        return (
            <LoadingScreen/>
        );
      }
    else {//console.log(activities)

    filteredActivities = activities.filter((activity) => activity.lessonId === lesson && activity.unitId == unit);
    filteredActivities = filteredActivities[0].activities
   //console.log(filteredActivities)
    }
    return (
        <View  style={styles.container}>
            <View style={styles.header}>
{/*                 <Text style={styles.header_text}> 
                    Lección {lesson}: Actividades 
                </Text> */}
                <Text style={styles.subheader_text}> 
                {subtitle}
                </Text>
                <Text style={styles.subheader_text_esp}> 
                {subtitle_esp}
                </Text>
            </View>


            {filteredActivities.map((activity) => (            
                <View key={`${activity.id}-${activity.name_screen}`} style={{flexDirection: 'column'}}>
                    <TouchableOpacity   onPress={() => navigation.navigate(activity.name_screen)} >
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonTittle}> 
                                Actividad {activity.id}
                            </Text>
                            <Text style={styles.buttonText}>
                                {activity.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}

            
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
      marginTop: topMargin
    },


    /* ------- Titulo de la leccion -------------- */
    header:{
    position: 'absolute', 
    top:0,
    //alignContent:'center',
    alignItems:"center",
    marginVertical:20
    },
    /* Kichwa */
    subheader_text: {
        color: "#EF6639",//"#383A45",//'#F18701', 
        fontSize:30, 
        fontWeight: 'bold',
    },

    /* Español */
    subheader_text_esp: {
        color: "#5E6266",//'#F18701', 
        fontSize:25, 
        fontWeight: 'bold'
    },


    /* ----------   Botones de las Lecciones ---------- */
    buttonContainer: {
        backgroundColor: "#2E416B",
        marginVertical:40,
        borderRadius: 20, 
        paddingVertical: 30,
        paddingHorizontal: 50
        },
    
    buttonTittle: {
            fontSize: 22,
            color: "#B5E61D",
            fontWeight: 'bold',
            alignSelf: "center",
            marginHorizontal: 40
          },
    buttonText: {
        fontSize: 20,
        color: "#F8F8F8",
        fontWeight: 'center',
        alignSelf: "center",
        marginHorizontal: 40
      }
})
export default Lessons;