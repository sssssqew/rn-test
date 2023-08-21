import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

import DateHeader from '../components/DateHeader'
import TodoInsert from '../components/TodoInsert'

function HomeScreen({navigation}){
  const date = new Date()
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <DateHeader date={date}/>
      <View>
        <Text>할일목록</Text>
      </View>
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