import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import TodoItem from './TodoItem'

function TodoList({ todos }){
    return (
        <FlatList
            data={todos}
            style={styles.container}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.line}/>}
            renderItem={({item}) => (
                <TodoItem item={item}/> // 아이템 각각의 뷰 화면
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    line: {
        backgroundColor: '#ddd',
        height: 1,
    }
})

export default TodoList