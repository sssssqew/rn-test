import React, { useState } from 'react'
import { 
    View, 
    Text,
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Keyboard
} from 'react-native'

function TodoInsert(){
  const [todoText, setTodoText] = useState('')
  const onPress = () => {
    setTodoText('') // 입력창 초기화
    Keyboard.dismiss() // 키보드 감추기
  }
  console.log(todoText)
  return (
    <View style={styles.container}> 
      <TextInput 
        placeholder='할일을 작성해주세요!' 
        placeholderTextColor='#a8c8ffff'  // 안내문구 색상
        selectionColor={'#d6e3ffff'}  // 커서색상
        style={styles.input}
        value={todoText}
        onChangeText={setTodoText} // 입력창에 글자를 입력할때
        onSubmitEditing={onPress} // 엔터키 눌렀을때
        />
        <TouchableOpacity 
            activeOpacity={0.7} // 버튼 클릭시 투명도 변경
            onPress={onPress}   // 버튼 클릭시 실행
        > 
            <View style={styles.button}>
                <Text style={styles.buttonText}>추가</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 10,
    borderColor: 'transparent',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    color: '#a8c8ffff',
    fontSize: 20,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#a8c8ffff',
    width: 80,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  buttonText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default TodoInsert