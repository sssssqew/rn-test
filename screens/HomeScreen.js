import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

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
  
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <DateHeader date={date}/>
      {todos.length === 0 ? <Default/> : <TodoList todos={todos}/>}
      <TodoInsert/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  }
})
export default HomeScreen