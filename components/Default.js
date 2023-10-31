import React from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'

function Default(){
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={require('../assets/imgs/todo.png')}/>
            <Text style={styles.guideText}>현재 할일목록이 비어있습니다.</Text>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
    },
    guideText: {
        fontSize: 20,
        marginTop: 30
    }
}) 

export default Default