import React from 'react'
import globalStyle, { colors } from '../../config/globalStyles'
import { Pressable, Text, View } from 'react-native'
import useTodo, { Filter } from '../store/todo';

export const OrderList = () => {
    const filter = useTodo((state) => state.filter);
    const changeFilter = useTodo((state) => state.changeFilter);


  return (
    <View style={{...globalStyle.row,  marginBottom: 10,}}>
    <OrderButton
      filter={Filter.all}
      selectedFilter={filter}
      onPress={(filter) => changeFilter(filter)}
      text='All' />
      <OrderButton
        filter={Filter.todo}
        selectedFilter={filter}
        onPress={(filter) => changeFilter(filter)}
        text='Todo' />
      <OrderButton
        filter={Filter.completed}
        selectedFilter={filter}
        onPress={(filter) => changeFilter(filter)}
        text='Completed' />
    </View>
  )
}

interface Props {
    filter: Filter;
    selectedFilter: Filter;
    text: string;
    onPress: (filter:Filter) => void;
}

export const OrderButton = ({filter, selectedFilter, text, onPress}: Props) => {
  return (
    
    <Pressable onPress={() => onPress(filter)} style={({pressed}) => [
        globalStyle.button,
        {
            opacity: pressed ? 0.8 : 1,
            flex: 1,
            backgroundColor: filter == selectedFilter ? colors.primary: 'transparent',
        }
        
      ]}>
        <Text style={{...globalStyle.buttonText,color:  filter == selectedFilter ? 'white': 'black'}}>{text}</Text>
      </Pressable>
  )
}
