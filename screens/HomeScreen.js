import React, { useState, useEffect } from 'react'
import { 
  SafeAreaView, 
  View, Text, 
  StyleSheet, 
  StatusBar, 
  Keyboard, 
  FlatList,
  TouchableHighlight 
} from 'react-native'

import DateHeader from '../components/DateHeader'
import Default from '../components/Default'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'
import DropdownItem from '../components/DropdownItem'

function HomeScreen({ navigation, caretType, setCaretType }){
  const date = new Date()
  const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
  const [todos, setTodos] = useState([
    {id: 1, title: '공원에 산책가기', category: '여행', createdAt: '2023-08-22', isDone: false},
    {id: 2, title: '보고서 작성하기', category: '업무', createdAt: '2023-08-22', isDone: true},
    {id: 3, title: '자기전에 책읽기', category: '자기계발', createdAt: '2023-08-22', isDone: false},
  ])
  const [todoText, setTodoText] = useState('')
  const [warning, setWarning] = useState(false)

  const onInsertTodo = (trimedText) => {
    if(trimedText && trimedText.length > 3){ // 최소 글자수 제한
      const nextId = todos.length + 1
      const todoContents = trimedText.split(',')
      const createdTime = new Date()

      const newTodo = {
        id: todos.length + 1,
        title: todoContents[0],
        category: todoContents[1] || '자기계발', //
        createdAt: `${createdTime.getFullYear()}-${createdTime.getMonth()+1}-${createdTime.getDate()}`
      }
      if(todos.filter(todo => todo.title === newTodo.title).length > 0){
        setTodoText('중복된 할일입니다.')
        setWarning(true)
      }else{
        setTodos([newTodo, ...todos]) // 최신순 정렬하기
        Keyboard.dismiss() // 추가버튼 클릭시 키보드 감추기 
        setTodoText('') // 입력창 초기화
      }
    }else{
      console.log('3자 이상 입력하세요!')
      setTodoText('3자 이상 입력하세요!')
      setWarning(true)
    }
  }

  const closeDropdown = () => {
    caretType && setCaretType(false)
  }
  const handleOutSideOfMenu = () => {
    console.log('홈화면을 터치하셨습니다.')
    closeDropdown()
  }

  useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')), [])

  useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')), [])

  return (
    <SafeAreaView 
        style={styles.block} 
        onTouchStart={handleOutSideOfMenu}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      
        {caretType 
        && (
            <View style={styles.dropdownShadow}>
              <FlatList
                data={categories} 
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <DropdownItem category={item} closeDropdown={closeDropdown}/> // 아이템 각각의 뷰 화면
                )}
                style={styles.dropdownList}
              />
          </View>
        )}
        <DateHeader date={date}/>
        {todos.length === 0 ? <Default/> : <TodoList todos={todos} />}
        <TodoInsert 
          onInsertTodo={onInsertTodo} 
          todoText={todoText} 
          setTodoText={setTodoText} 
          warning={warning} 
          setWarning={setWarning}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  dropdownList: {
    padding: 5
  },
  dropdownShadow: {
    shadowOffset: { width: 0, height: 20 },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    backgroundColor : "#fff", // invisible color
    zIndex: 1,
    elevation: 1,
    position: 'absolute',
    top: -15,
    borderRadius: 5,
    margin: 15
  }
})
export default HomeScreen