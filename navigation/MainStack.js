import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Lessons from '../screens/Lessons'
import Lesson1_Activity2_Q1 from '../screens/Lesson1_Activity2_Q1'
import Lesson2_Activity2_Q1 from '../screens/Lesson2_Activity2_Q1'
import Lesson2_Activity3_Q1 from '../screens/Lesson2_Activity3_Q1'
import Lesson3_Activity2_Q1 from '../screens/Lesson3_Activity2_Q1'


const Stack = createNativeStackNavigator()

const MainStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name = 'Login'
                    component = {Login}/>         
                <Stack.Screen
                    name = 'Registro'
                    component = {Register}/>
                <Stack.Screen
                    name = 'Home'
                    component = {Home}/>
                <Stack.Screen
                    name = 'Lessons'
                    component = {Lessons}/>
                <Stack.Screen
                    name = 'Perfil'
                    component = {Profile}/>
                <Stack.Screen
                    name = 'Lesson1_Activity2_Q1'
                    component = {Lesson1_Activity2_Q1}/>
                <Stack.Screen
                    name = 'Lesson2_Activity2_Q1'
                    component = {Lesson2_Activity2_Q1}/>
                <Stack.Screen
                    name = 'Lesson2_Activity3_Q1'
                    component = {Lesson2_Activity3_Q1}/>
                <Stack.Screen
                    name = 'Lesson3_Activity2_Q1'
                    component = {Lesson3_Activity2_Q1}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack