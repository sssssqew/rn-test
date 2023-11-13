import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button, Image, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

function SettingsScreen({navigation}){
  const [userInfo, setUserInfo] = useState(null) 
  const [naverUserInfo, setNaverUserInfo] = useState(null)
 
  const googleSigninConfigure = () => { 
    GoogleSignin.configure({
      webClientId:
        '137262950194-gcouccatiffjp4ei8aqfi05uruv5j4dl.apps.googleusercontent.com',
    })
  }
  
  const signOut = async () => {
    const naver_access_token = await AsyncStorage.getItem('NaverAccessToken') // 로컬스토리지에 저장된 액세스토큰 조회

    if(naver_access_token){ // 네이버 로그아웃
      await AsyncStorage.removeItem('NaverAccessToken')
      navigation.navigate('Landing')
    }else{ // 구글 로그아웃
      try {
        await GoogleSignin.signOut()
        setUserInfo(null)
        navigation.navigate('Landing')
      } catch (error) {
        console.error('failed to logout, error: ', error)
      }
    }
  }

  getCurrentUser = async () => {
    const naver_access_token = await AsyncStorage.getItem('NaverAccessToken') // 로컬스토리지에 저장된 액세스토큰 조회

    if(naver_access_token){ // 네이버로그인 
      const PROFILE_URL = "https://openapi.naver.com/v1/nid/me"
      let result = await fetch(PROFILE_URL, {
          headers: {
            'Authorization': `Bearer ${naver_access_token}`, 
          }
        })
      result = await result.json()
      console.log("로그인한 네이버 사용자정보: ", result)
      const { response } = result

      if(response){
        setNaverUserInfo(response)
      }
    }else{ // 구글로그인
      googleSigninConfigure()
      const currentUser = await GoogleSignin.getCurrentUser()
      setUserInfo(currentUser)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View>
        {userInfo && userInfo.user && 
        (<View style={styles.profileInfo}>
          <View>
            <Image source={{uri: userInfo.user.photo}} style={styles.profileImg}/>
          </View>
          <View style={styles.profileText}>
            <Text style={[styles.info, { fontWeight: 'bold', fontSize: 20 }]}>{userInfo.user.name}</Text>
            <Text style={styles.info}>{userInfo.user.email}</Text>
          </View>
        </View>)
        }
        {naverUserInfo && 
        (<View style={styles.profileInfo}>
          <View>
            <Image source={{uri: naverUserInfo.profile_image}} style={styles.profileImg}/>
          </View>
          <View style={styles.profileText}>
            <Text style={[styles.info, { fontWeight: 'bold', fontSize: 20 }]}>{naverUserInfo.nickname}</Text>
            <Text style={styles.info}>{naverUserInfo.email}</Text>
          </View>
        </View>)
        }
      </View>
      <TouchableHighlight onPress={signOut} style={styles.logoutBtnWrapper}>
          <View style={[styles.logoutBtn, { backgroundColor: "#a8c8ffff" }]}>
            <Text style={styles.logoutBtnText}>로그아웃</Text>
          </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  profileInfo: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eee',
  },
  profileText: {
    borderRadius: 10,
    padding: 20,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutBtnWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  logoutBtn: {
    flex: 1,
    height: 35,
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