import React, { useState } from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import useTodo from '../store/todo';
import globalStyle, { colors } from '../../config/globalStyles';

interface Props {
    title: string;
    completed?: boolean;
    id: number;
}

export const TodoItem = ({title, completed, id}: Props) => {

    const completeTodo = useTodo((state) => state.completeTodo);
    const deleteTodo = useTodo((state) => state.deleteTodo);
  return (
    <View style={style.container}>
        <Text style={{...style.taskTitle, textDecorationLine: completed ? 'line-through' : 'none'}}>{title}</Text>
        <View style={style.statusTask}>
            <Text>Completed</Text>
            <Switch 
                value={completed}
                onValueChange={(val) => completeTodo(id, val)} />
        </View>
        <Pressable onPress={()=> deleteTodo(id)} style={({pressed} ) => [globalStyle.button, {backgroundColor: colors.danger, opacity: pressed ? 0.8 : 1,} ]}>
            <Text style={globalStyle.buttonText}>
                Delete
            </Text>
        </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor:'white',
        padding:10,
        alignItems:'center',
    },
    taskTitle:{
        fontSize: 16, 
        fontWeight:'500',
        flex: 1,
    },
    statusTask:{
        flexDirection: 'row',
        alignItems:'center',
        gap:5,
    }
});
