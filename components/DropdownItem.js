import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function DropdownItem({ category }){
    return (
        <View style={styles.dropdownItemContainer}>
            <Text>{category}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdownItemContainer: {
        flex: 1
    }
})

export default DropdownItem