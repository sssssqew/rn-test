import React, { useEffect } from 'react'
import { View, Button, StyleSheet, Alert } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes  } from '@react-native-google-signin/google-signin'

function LoginButton({navigation}){
    const googleSigninConfigure = () => { 
        GoogleSignin.configure({
        webClientId:
            '137262950194-gcouccatiffjp4ei8aqfi05uruv5j4dl.apps.googleusercontent.com',
        })
    }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfoFromGoogle = await GoogleSignin.signIn()

            if(userInfoFromGoogle){
                console.log("사용자 연락처: ", userInfoFromGoogle.user)
                navigation.navigate('App', { userInfo: userInfoFromGoogle.user})
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow')
                Alert.alert('user cancelled the login flow')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('sign in is in progress already')
                Alert.alert('sign in is in progress already')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated')
                Alert.alert('play services not available or outdated')
            } else {
                console.log('some other error happened')
                Alert.alert('some other error happened')
            }
        }
    }

    useEffect(() => {
        googleSigninConfigure()
    }, [])

    return (
        <View style={styles.buttonWrapper}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInWithGoogle}
                disabled={false}
                style={styles.signInBtn}
            />
        </View>
    )
}
export default LoginButton

const styles = StyleSheet.create({
    buttonWrapper: {
        position: 'absolute',
        left: 0, right: 0,
        bottom: 100,
    },
    signInBtn: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
})