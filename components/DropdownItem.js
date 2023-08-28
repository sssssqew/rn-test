import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function DropdownItem({ category, closeDropdown }){
    return (
        <TouchableOpacity onPress={closeDropdown}>
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