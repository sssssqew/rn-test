import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

function LoginButton({navigation}){
    const gotoHome = () => {
        navigation.navigate('App')
    }
    return (
        <View style={styles.buttonWrapper}>
            <Button title="로그인" onPress={gotoHome}/>
        </View>
    )
}
export default LoginButton

const styles = StyleSheet.create({
    buttonWrapper: {
        position: 'absolute',
        left: 0, right: 0,
        bottom: 100,
    }
})