import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

function SettingsScreen({navigation}){
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '137262950194-gcouccatiffjp4ei8aqfi05uruv5j4dl.apps.googleusercontent.com',
    })
  }
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log("구글 토큰: ", idToken)
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  useEffect(() => {
    googleSigninConfigure()
  }, [])
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        <Text>설정</Text>
        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
})
export default SettingsScreen