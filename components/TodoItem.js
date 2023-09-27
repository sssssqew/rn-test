import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

function TodoItem({ id, title, category, isDone, createdAt }){
    console.log("할일 생성시각: ", title, createdAt)
    return (
        <View style={styles.item}>
            <View style={styles.titleMargin}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <Text>{category} ({isDone ? "종료": "진행중"})</Text>
                <Text style={styles.dateText}>{createdAt && moment(createdAt.toDate()).format('YY-MM-DD hh:mm:ss')}</Text>
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

export default React.memo(TodoItem)