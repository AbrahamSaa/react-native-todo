import React, { useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { TodoItem } from '../ui/TodoItem'
import useTodo, { Filter, Todo } from '../store/todo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import globalStyle, { colors } from '../../config/globalStyles'
import { OrderList } from '../ui/OrderList'

export const TodoList = () => {

  const navigation = useNavigation<any>();

  const filter = useTodo((state) => state.filter);
  const todos = useTodo((state) => state.todos);
  const todosFilter = useTodo((state) => state.todosFilter);

  const loadTodos = useTodo((state) => state.loadTodos);

  useEffect(() => {
    loadTodos();

  },[]);

  return (
    <View style={globalStyle.globalContainer}>
      <Text style={styles.title}>{filter} Task</Text>
      <OrderList />
      <FlatList 
        data={filter == Filter.all ? todos: todosFilter} 
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => <TodoItem title={item.name} completed={item.completed} id={item.id}  />} />

      <Pressable onPress={() => navigation.navigate('AddTodo', {})} style={({pressed}) => [styles.fab, {opacity: pressed ? 0.8 : 1}]}>
          <Text style={styles.fabText}>Add new task</Text>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  fab:{
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,

    color:'white',
    padding: 10,
  },
  fabText:{
    color:'white',
    fontSize: 14,
  },
  title:{
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,

  }
});