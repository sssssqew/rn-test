import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button, Image, TouchableHighlight } from 'react-native'
import { GoogleSignin, GoogleSigninButton  } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

function SettingsScreen({navigation}){
  const [userInfo, setUserInfo] = useState(null) 
  const [isSigningIn, setIsSigningIn] = useState(false) // 로그인 여부

  const googleSigninConfigure = () => { 
    GoogleSignin.configure({
      webClientId:
        '137262950194-gcouccatiffjp4ei8aqfi05uruv5j4dl.apps.googleusercontent.com',
    })
  }
  
  const signInWithGoogle = async () => {
    try {
      setIsSigningIn(true)
      await GoogleSignin.hasPlayServices()
      const userInfoFromGoogle = await GoogleSignin.signIn()
      if(userInfoFromGoogle){
        console.log("사용자 사진: ", userInfoFromGoogle.user.photo)
        setUserInfo(userInfoFromGoogle)
        setIsSigningIn(false)
      }
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('sign in is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated')
      } else {
        console.log('some other error happened')
      }
    }
  }
  const signOutWithGoogle = async () => {
    try {
      await GoogleSignin.signOut()
      setUserInfo(null)
    } catch (error) {
      console.error('failed to logout, error: ', error)
    }
  }

  useEffect(() => {
    googleSigninConfigure()
  }, [])

  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          disabled={isSigningIn}
          style={styles.signInBtn}
        />
        {userInfo && userInfo.user && 
        (<View style={styles.profileInfo}>
          <View style={styles.profileText}>
            <Text style={styles.info}>사용자 이메일 - {userInfo.user.email}</Text>
            <Text style={styles.info}>사용자 아이디 - {userInfo.user.id}</Text>
            <Text style={styles.info}>사용자 이름 - {userInfo.user.name}</Text>
          </View>
          <Image source={{uri: userInfo.user.photo}} style={styles.profileImg}/>
        </View>)
        }
        <TouchableHighlight onPress={signOutWithGoogle}>
          <View style={[styles.logoutBtn, { backgroundColor: userInfo ? "#a8c8ffff" : 'lightgrey' }]}>
            <Text style={styles.logoutBtnText}>구글 로그아웃</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center'
  },
  signInBtn: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  profileInfo: {
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  profileText: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutBtn: {
    width: 200,
    height: 35,
    borderRadius: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoutBtnText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  
})
export default SettingsScreen