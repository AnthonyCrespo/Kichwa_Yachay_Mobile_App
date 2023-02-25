//import { firebase } from '../config'
import { View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import { getStorage, ref, listAll,  getDownloadURL } from 'firebase/storage';

import { getApp } from 'firebase/app'

const ListPictures = () => {
    app = getApp(); 
const [sampleImage, setSampleImage] = useState([]); 

const getSampleImage = async () => {
    const storage = getStorage();
    const imageRefs = ref(storage, 'images/');
    console.log(imageRefs)
    //const urls = await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL()));
    //setSampleImage(urls);
}
useEffect(()=>{
getSampleImage()
},[])

{ sampleImage.length!=0 && sampleImage.map(url => (
    <View style={{ justifyContent: 'center' }} key={imageRef.id}>
        <Image source={{ uri: url }} style={{ width: 350, height: 350 }} /> 
    </View>
))}
 }

export default ListPictures;