import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView, Dimensions, ImageBackground  } from 'react-native'
import LandingPage from '../components/LandingPage'
import landingData from '../data/landingData'
import LoginButton from '../components/LoginButton';
import NaverLoginButton from '../components/NaverLoginButton';

import { GoogleSignin } from '@react-native-google-signin/google-signin'

function LandingScreen({navigation}){
    const { width, height } = Dimensions.get('window')
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    console.log('페이지 번호: ', currentPageIndex)

    const setCurrentPage = (e) => {
        const { x } = e.nativeEvent.contentOffset // x : 스크롤 위치
        console.log("스크롤 위치: ", x, "화면너비: ", width)
        const nextPageIndex = Math.ceil(x / width) // x / width : 스크롤 위치 / 화면너비 -> 페이지번호
        console.log(nextPageIndex)
        if(nextPageIndex !== currentPageIndex){
            setCurrentPageIndex(nextPageIndex)
        }
    }

    const getUserInfo = async () => await GoogleSignin.getCurrentUser()
    useEffect(() => {
        const result = getUserInfo()
        // if(user){
        //     navigation.navigate('App')
        // }
        result.then(user => {
            console.log('user : ',user)
            if(user){
              navigation.navigate('App', { userInfo: user.user })
            }
          })
    }, [])

    return (
        <>
            <StatusBar hidden></StatusBar>
            <SafeAreaView style={styles.block}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true} // 수평 스크롤링
                    scrollEventThrottle={16} // 스크롤 이벤트 감지하는 시간간격 (ms)
                    pagingEnabled={true} // 스크롤시 페이지네이션
                    showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
                    onScroll={setCurrentPage}
                >
                    {landingData.map((page, index) => (
                        <LandingPage
                            width={width}
                            height={height}
                            {...page}
                            key={index}
                        />
                    ))}
                </ScrollView>

                <View style={styles.scrollIndicatorWrapper}>
                    {Array(3).fill(0).map((_, index) => (
                        <View key={index} style={[styles.scrollIndicator, { opacity: currentPageIndex === index ? 1: 0.3}]}></View>
                    ))}
                </View>

                <LoginButton navigation={navigation}/>
                <NaverLoginButton/>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  scrollIndicatorWrapper:{
    position: 'absolute',
    left: 0, right: 0,
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollIndicator: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#aaa',
    marginLeft: 10,
  },

})
export default LandingScreen