import 'react-native-gesture-handler';


import React from 'react'
import { View } from 'react-native';
import { TodoList } from './presentation/screens/TodoList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddTodo } from './presentation/screens/AddTodo';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 
 * Entry point of the app
 */

export const TodoApp = () => {

  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Todos'>
            <Stack.Screen name='Todos' component={TodoList} options={{headerShown: false,}} /> 
            <Stack.Screen name='AddTodo' component={AddTodo} /> 
          </Stack.Navigator>
      </NavigationContainer>
  )
}
