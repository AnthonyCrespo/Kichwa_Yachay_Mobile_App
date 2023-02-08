import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Lessons from '../screens/Lessons'
import Result from '../screens/Result'


// L1A1
import L1A1Q1 from '../screens/L1A1Q1'
import L1A1Q2 from '../screens/L1A1Q2'
import L1A1Q3 from '../screens/L1A1Q3'
// L1A2 
import L1A2Q1 from '../screens/L1A2Q1'
import L1A2Q2 from '../screens/L1A2Q2'
import L1A2Q3 from '../screens/L1A2Q3'
// L1A3
import L1A3Q1 from '../screens/L1A3Q1'
import L1A3Q2 from '../screens/L1A3Q2'
import L1A3Q3 from '../screens/L1A3Q3'
// L2A1
import L2A1Q1 from '../screens/L2A1Q1'
import L2A1Q2 from '../screens/L2A1Q2'
/* L2A2*/
import L2A2Q1 from '../screens/L2A2Q1'
import L2A2Q2 from '../screens/L2A2Q2'
import L2A2Q3 from '../screens/L2A2Q3'
import L2A2Q4 from '../screens/L2A2Q4'
/* L2A3*/
import L2A3Q1 from '../screens/L2A3Q1'
import L2A3Q2 from '../screens/L2A3Q2'
import L2A3Q3 from '../screens/L2A3Q3'
import L2A3Q4 from '../screens/L2A3Q4'
// L3A1


import L3A1 from '../screens/L3A1'

import L3A1Q1 from '../screens/L3A1Q1'
import L3A1Q2 from '../screens/L3A1Q2'
import L3A1Q3 from '../screens/L3A1Q3'
import L3A1Q4 from '../screens/L3A1Q4'
/* L3A2*/
import L3A2Q1 from '../screens/L3A2Q1'
import L3A2Q2 from '../screens/L3A2Q2'
import L3A2Q3 from '../screens/L3A2Q3'
import L3A2Q4 from '../screens/L3A2Q4'




const Stack = createNativeStackNavigator()

const AppStack = () => {
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

                {/* L1A1*/}
                <Stack.Screen
                    name = 'L1A1Q1'
                    component = {L1A1Q1}/>
                <Stack.Screen
                    name = 'L1A1Q2'
                    component = {L1A1Q2}/>
                <Stack.Screen
                    name = 'L1A1Q3'
                    component = {L1A1Q3}/>

                {/* L1A2*/}
                <Stack.Screen
                    name = 'L1A2Q1'
                    component = {L1A2Q1}/>
                <Stack.Screen
                    name = 'L1A2Q2'
                    component = {L1A2Q2}/>
                <Stack.Screen
                    name = 'L1A2Q3'
                    component = {L1A2Q3}/>

                {/* L1A3*/}
                <Stack.Screen
                    name = 'L1A3Q1'
                    component = {L1A3Q1}/>
                <Stack.Screen
                    name = 'L1A3Q2'
                    component = {L1A3Q2}/>
                <Stack.Screen
                    name = 'L1A3Q3'
                    component = {L1A3Q3}/>

                {/* L2A1*/} 
                <Stack.Screen
                    name = 'L2A1Q1'
                    component = {L2A1Q1}/>
                <Stack.Screen
                    name = 'L2A1Q2'
                    component = {L2A1Q2}/>

                {/* L2A2*/}
                <Stack.Screen
                    name = 'L2A2Q1'
                    component = {L2A2Q1}/>
                <Stack.Screen
                    name = 'L2A2Q2'
                    component = {L2A2Q2}/>
                <Stack.Screen
                    name = 'L2A2Q3'
                    component = {L2A2Q3}/>
                <Stack.Screen
                    name = 'L2A2Q4'
                    component = {L2A2Q4}/>

                {/* L2A3*/}
                <Stack.Screen
                    name = 'L2A3Q1'
                    component = {L2A3Q1}/>
                <Stack.Screen
                    name = 'L2A3Q2'
                    component = {L2A3Q2}/>
                <Stack.Screen
                    name = 'L2A3Q3'
                    component = {L2A3Q3}/>
                <Stack.Screen
                    name = 'L2A3Q4'
                    component = {L2A3Q4}/>

                {/* L3A1*/}
                <Stack.Screen
                    name = 'L3A1'
                    component = {L3A1}/>

                <Stack.Screen
                    name = 'L3A1Q1'
                    component = {L3A1Q1}/>
                <Stack.Screen
                    name = 'L3A1Q2'
                    component = {L3A1Q2}/>
                <Stack.Screen
                    name = 'L3A1Q3'
                    component = {L3A1Q3}/>
                <Stack.Screen
                    name = 'L3A1Q4'
                    component = {L3A1Q4}/>

                {/* L3A2*/}
                <Stack.Screen
                    name = 'L3A2Q1'
                    component = {L3A2Q1}/>
                <Stack.Screen
                    name = 'L3A2Q2'
                    component = {L3A2Q2}/>
                <Stack.Screen
                    name = 'L3A2Q3'
                    component = {L3A2Q3}/>
                <Stack.Screen
                    name = 'L3A2Q4'
                    component = {L3A2Q4}/>

                <Stack.Screen
                    name = 'Result'
                    component = {Result}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack

/* import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainScreen from './screens/MainScreen';
import SecondScreen from './screens/SecondScreen';
import OtherScreen from './screens/OtherScreen';

const MainStack = createStackNavigator({
  Main: { screen: MainScreen },
});

const SecondStack = createStackNavigator({
  Second: { screen: SecondScreen },
  Other: { screen: OtherScreen },
});

const AppContainer = createAppContainer(createStackNavigator({
  MainStack: { screen: MainStack },
  SecondStack: { screen: SecondStack },
}, {
  initialRouteName: 'MainStack',
}));

export default AppContainer;

 */
