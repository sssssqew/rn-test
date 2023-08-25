import React from 'react'
import { 
    View, 
    Text,
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Keyboard
} from 'react-native'

function TodoInsert({ onInsertTodo, todoText, setTodoText, warning, setWarning }){
  const onPress = () => {
    const trimedText = todoText.trim()
    onInsertTodo(trimedText)
  }
  const handleChange = (text) => { 
    if (/\n/.test(text)) { // 엔터키 입력시 
      onPress() // 할일추가
    } else {
      setTodoText(text)
      setWarning(false)
    }
  }
  const hideKeyboard = () => {
    Keyboard.dismiss()
  }
  console.log(todoText)
  return (
    <View style={styles.container}> 
      <TextInput 
        placeholder='할일을 작성해주세요!' 
        placeholderTextColor='#a8c8ffff'  // 안내문구 색상
        selectionColor={'#d6e3ffff'}  // 커서색상
        style={[styles.input, { color: warning ? 'red': '#a8c8ffff' } ]}
        value={todoText}
        blurOnSubmit={ false } // 탭키 누를때 키보드 사라지지 않게 하기
        onChangeText={handleChange} // 입력창에 글자를 입력할때
        returnKeyType="done" // 엔터키 아이콘 변경
        maxLength={50} // 최대 글자수 제한
        autoCorrect={false} // 자동완성기능 끄기
        onSubmitEditing={hideKeyboard} // 여기서 하면 엔터키 두번 눌러야 할일추가됨 (키보드만 닫는걸로 수정함)
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
    height: 70,
    paddingLeft: 10,
    borderColor: 'transparent',
    borderTopWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  input: {
    color: '#a8c8ffff',
    fontSize: 20,
    paddingVertical: 20,
    flex: 1
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