import React, {useState, useEffect } from 'react';
import {SafeAreaView, Button, View, Text, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native'

const NAVER_CLIENT_ID = 'KFv6qukJ1q8DqHRUGOs9'
const NAVER_CLIENT_SECRET = 'vMHgRoSTC3'
const STATE = encodeURIComponent("sunrise")
const REDIRECT_URI = encodeURIComponent('http://192.168.200.9:8081')
const SERVER_URL = 'http://192.168.200.9:8081'
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`
console.log(NAVER_AUTH_URL)

const NaverLoginButton = () => {
  const route = useRoute();
  const { width, height } = Dimensions.get('window')
  const [loginStatus, setLoginStatus] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const login = async () => {
    console.log("네이버 로그인시작")
    setLoginStatus(true)
  };

  const handleResponseFromNaverLogin = async (state) => {
      let url = state.url
      console.log("로그인 응답 - ", url)
      let queryString = url.split('?')[1]
      console.log(queryString)
      let queryParameters = queryString.split('&')
      console.log(queryParameters)
      queryParameters = queryParameters.map(param => {
        const paramName = param.split('=')[0]
        const paramValue = param.split('=')[1]
        return { [paramName]: paramValue }
      })
      console.log("쿼리스트링: ", queryParameters)

      const code = queryParameters[0].code 
      // const state = queryParameters[1].state
      const TOKEN_URL = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${STATE}`

      let result = await fetch(TOKEN_URL, {
        headers: { 'Content-Type': 'application/json' }
      })
      result = await result.json()
      console.log("최종 응답: ", result)
      console.log("액세스 토큰 - ", result.access_token)
      console.log("리프레쉬 토큰 - ", result.refresh_token)
      console.log("토큰만료(초) - ", result.expires_in)

      const PROFILE_URL = "https://openapi.naver.com/v1/nid/me"
      result = await fetch(PROFILE_URL, {
        headers: {
          'Authorization': `Bearer ${result.access_token}`, 
        }
      })
      result = await result.json()
      console.log("최종 응답: ", result)
      const { response } = result
      // const { age, birthday, birthyear, email, gender, id, mobile, mobile_e164, name, nickname, profile_image } = response 
      console.log('-------------------- 네이버 사용자 정보 -------------------------')
      console.log('사용자 이름: ', response?.name)
      console.log('사용자 별명: ', response?.nickname )
      console.log('사용자 나이: ', response?.age)
      console.log('사용자 성별: ', response?.gender)
      console.log('사용자 생일: ', `${response?.birthyear}-${response?.birthday}`)
      console.log('사용자 이메일: ', response?.email)
      console.log('사용자 연락처: ', response?.mobile)

      if(response){
        setUserInfo(response)
        setLoginStatus(false)
      }
  }

  return (
    <View
      style={styles.btnWrapper}>
        {loginStatus && <WebView
        source={{ uri: NAVER_AUTH_URL }}
        style={[styles.webView, {width, height}]}
        // injectedJavaScript={INJECTEDJAVASCRIPT}
        scrollEnabled
        onNavigationStateChange={(state) => handleResponseFromNaverLogin(state)}
      />}

      {!loginStatus && userInfo && 
        <View>
          <Text style={styles.result}>네이버 로그인 성공</Text>
          {/* <Text style={styles.result}>{userInfo.name && userInfo.name}</Text> */}
          <Text style={styles.result}>{userInfo.nickname && userInfo.nickname}</Text>
          {/* <Text style={styles.result}>{userInfo.age && userInfo.age}</Text> */}
          {/* <Text style={styles.result}>{userInfo.birthyear && userInfo.birthday && `${userInfo?.birthyear}-${userInfo?.birthday}`}</Text> */}
          <Text style={styles.result}>{userInfo.email && userInfo.email}</Text>
          {/* <Text style={styles.result}>{userInfo.mobile && userInfo.mobile}</Text> */}
        </View>
      }
      
      <TouchableWithoutFeedback onPress={login}>
        <Image source={require('../assets/imgs/naver-login-btn.png')} style={styles.loginBtn}></Image>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default NaverLoginButton

const styles = StyleSheet.create({
  btnWrapper: {
    position: 'absolute',
    left: 0, right: 0,
    bottom: 150,
    // backgroundColor: 'red',
    alignItems: 'center'
  },
  webView: {
    flex: 1,
  },
  loginBtn: {
    width: 303, 
    height: 45, 
    borderRadius: 3
  },
  result: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  }
})