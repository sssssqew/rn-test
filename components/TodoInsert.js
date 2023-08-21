import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

function TodoInsert(){
  const [todoText, setTodoText] = useState('')
  console.log(todoText)
  return (
    <View style={styles.container}> 
      <TextInput 
        placeholder='할일을 작성해주세요!' 
        placeholderTextColor='#a8c8ffff'  // 안내문구 색상
        selectionColor={'#d6e3ffff'}  // 커서색상
        style={styles.input}
        value={todoText}
        onChangeText={setTodoText}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 20,
    borderColor: 'transparent',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  input: {
    color: '#a8c8ffff',
    fontSize: 20,
    paddingVertical: 10,
  }
})

export default TodoInsert