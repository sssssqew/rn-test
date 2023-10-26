import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView, Dimensions, ImageBackground  } from 'react-native'

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
                    <View style={{ width, height }}>
                        <ImageBackground source={require('../assets/imgs/landing-1.jpg')} style={{ width, height }}>
                            <View style={[styles.textContent, { width, height }]}>
                                <Text style={styles.title}>시간관리</Text>
                                <Text style={styles.description}>오늘 하루 시간이 너무 빨리 지나갔나요?</Text>
                            </View>
                        </ImageBackground >
                    </View>
                    <View style={{ width, height }}>
                        <ImageBackground source={require('../assets/imgs/landing-2.jpg')} style={{ width, height }}>
                            <View style={[styles.textContent, { width, height }]}>
                                <Text style={styles.title}>히스토리 관리</Text>
                                <Text style={styles.description}>과거에 무엇을 했는지 기억하시나요?</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ width, height }}>
                        <ImageBackground source={require('../assets/imgs/landing-3.jpg')} style={{ width, height }}>
                            <View style={[styles.textContent, { width, height }]}>
                                <Text style={styles.title}>SunTODO</Text>
                                <Text style={styles.description}>그럼 오늘부터 SunTODO 앱을 사용해보시는건 어떨까요?</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </ScrollView>

                <View style={styles.scrollIndicatorWrapper}>
                    {Array(3).fill(0).map((_, index) => (
                        <View key={index} style={[styles.scrollIndicator, { opacity: currentPageIndex === index ? 1: 0.3}]}></View>
                    ))}
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  textContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 85,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff'
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
    textAlign: 'center'
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
  }
})
export default LandingScreen