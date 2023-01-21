import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'


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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack