import { Audio } from 'expo-av';

let sound = null;

export  const playAudio = async (path) => {
  if (sound) {
  sound.stopAsync();
  sound.unloadAsync();
  }
  sound = new Audio.Sound();
  try {
  await sound.loadAsync(path);
  await sound.playAsync();
  } catch (error) {
  console.log(error);
  }
};

export default playAudio;