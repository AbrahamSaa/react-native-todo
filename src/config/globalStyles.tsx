
import {  StyleSheet } from 'react-native';

export const colors ={
    primary: '#3498db',
    danger: '#e74c3c',
}

const globalStyle = StyleSheet.create({
    globalContainer:{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
        backgroundColor: '#ecf0f1'
    },
    button:{
        backgroundColor: colors.primary,
        color:'white',
        padding: 10,
        borderRadius: 8,
    },
    buttonText:{
      color:'white',
      alignSelf: 'center',
      fontSize:14,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        gap: 10,
    },
    selectedFilter:{
        backgroundColor: colors.primary,
        color:'white',
    }
});

export default globalStyle;