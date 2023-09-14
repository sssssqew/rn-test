import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function DropdownItem({ category, selectCategory }){ // selectCategory 함수 전달 (수정)
    return (
        <TouchableOpacity onPress={selectCategory}>
            <View style={styles.dropdownItemContainer}>
                <Text>{category}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dropdownItemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    }
})

export default DropdownItem