import React, {  useEffect, useState } from 'react'
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import useTodo from '../store/todo';
import { useNavigation } from '@react-navigation/native';
import globalStyle, { colors } from '../../config/globalStyles';

export const AddTodo = () => {
  const navigation = useNavigation();
    const addTodo = useTodo((state) => state.addTodo);
    const todos = useTodo((state) => state.todos);
    const [task, setTask] = useState("");

    useEffect(() => {
      navigation.setOptions({
        title: 'Add new todo',
      })
    }, []);
    
    

    const handleAddTask = () => {

      if(task !== undefined && task !== null && task !== ""){
        
        addTodo(
          {
            id: todos.at(todos.length-1) === undefined ? 1 : (todos.at(todos.length-1)?.id??1) + 1,
            name: task.trimEnd(),
            completed: false,
            deleted: false
          }
        );
        navigation.goBack();
      }

    }


  return (
    <View style={globalStyle.globalContainer}>
        <TextInput
            style={styles.input}
            value={task}
            multiline={true}
            numberOfLines={3}
            onChangeText={(val) => setTask(val)} 
            placeholder="Task" />
        <View style={{flex: 1}} />

        <Pressable 
          
          style={({pressed}) => [globalStyle.button, {opacity: pressed ? 0.8 : 1}]} 
          onPress={() => handleAddTask()}>
            <Text style={globalStyle.buttonText}>Add todo</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
  },
});
