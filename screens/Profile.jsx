import React  from 'react';
import {Dimensions, FlatList, View, StyleSheet, Text, Image, TouchableOpacity, StatusBar} from 'react-native';

const {width} = Dimensions.get('screen');

const Profile= ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Perfil</Text>
      <View style={styles.profileContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Nombre del usuario</Text>
          <Text style={styles.usernameText}>username</Text>
        </View>
        <Image
          source={require('../assets/user_photo.png')}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.progressHeader}>Progreso</Text>
      <FlatList styles = {styles.contentContainer}
        contentContainerStyle={styles.contentContainer}
        data={[2.5,5,6]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <ProgressBar widthPct={item} />}
      />

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





  );
};

const ProgressBar = ({widthPct}) => {
  const finalWidth = (width * widthPct) / 10;
  return (
    <View style={styles.unitContainer}>
      <Text style={styles.unitText}>Unidad X</Text>
      <View style={[styles.progressBar, {width: finalWidth}]} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Profile;
