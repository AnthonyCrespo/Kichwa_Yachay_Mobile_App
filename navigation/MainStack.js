import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Profile from '../screens/Profile'


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
                    name = 'Perfil'
                    component = {Profile}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack