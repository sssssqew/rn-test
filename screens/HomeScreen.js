import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Keyboard } from 'react-native'

import DateHeader from '../components/DateHeader'
import Default from '../components/Default'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'

function HomeScreen({navigation}){
  const date = new Date()
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
        setTodos([...todos, newTodo])
        Keyboard.dismiss() // 추가버튼 클릭시 키보드 감추기 
        setTodoText('') // 입력창 초기화
      }
    }else{
      console.log('3자 이상 입력하세요!')
      setTodoText('3자 이상 입력하세요!')
      setWarning(true)
    }
  }

  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
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
  }
})
export default HomeScreen