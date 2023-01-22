import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity  } from 'react-native';


const Lessons= ({route}) => {
    const { lesson, subtitle } = route.params;
    const activities = [
        { id: 1, title: 'Seleccionar', lessonId: 1 },
        { id: 2, title: 'Traducir', lessonId: 1 },
        { id: 3, title: 'Escuchar', lessonId: 1 },
        { id: 4, title: 'Seleccionar', lessonId: 2 },
        { id: 5, title: 'Completar', lessonId: 2 },
        { id: 6, title: 'Ordenar', lessonId: 2 },
        { id: 7, title: 'Seleccionar', lessonId: 3 },
        { id: 8, title: 'Completar', lessonId: 3 },
        { id: 9, title: 'Relacionar', lessonId: 3 }
      ];
      const filteredActivities = activities.filter((activity) => activity.lessonId === lesson);


    return (
        <View  style={styles.container}>
            <View style={{position: 'absolute', top: 60, alignContent:'center'}}>
                <Text style={{fontSize:20, fontWeight: 'bold',marginBottom:10, alignSelf:'center'}}> 
                    Lección {lesson}: Actividades 
                </Text>
                <Text style={{color: '#F18701', fontSize:30, fontWeight: 'bold'}}> 
                {subtitle}
                </Text>
            </View>

            {filteredActivities.map((activity) => (            
            <View key={activity.id} style={{flexDirection: 'column'}}>
                <TouchableOpacity /*  onPress={() => navigation.navigate('Home')} */> 
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonTittle}> 
                            Actividad {(activity.id-1)%3+1}
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
    },
    buttonContainer: {
        backgroundColor: "#666BCA",
        marginVertical:40,
        borderRadius: 10, 
        paddingVertical: 30,
        paddingHorizontal: 70
        },
    
    buttonTittle: {
            fontSize: 20,
            color: "#fff",
            fontWeight: 'bold',
            alignSelf: "center",
            marginHorizontal: 40
          },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 'center',
        alignSelf: "center",
        marginHorizontal: 40
      }
})
export default Lessons;