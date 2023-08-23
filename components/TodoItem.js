import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function TodoItem({ item }){
    return (
        <View style={styles.item}>
            <View style={styles.titleMargin}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View>
                <Text>{item.category}</Text>
                <Text style={styles.dateText}>{item.createdAt}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingVertical: 10,
        // backgroundColor: '#d6e3ffff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#a8c8ffff',
    },
    titleMargin: {
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    dateText: {
        fontSize: 12
    }
})

export default TodoItem