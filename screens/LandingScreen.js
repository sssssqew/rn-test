import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView, Dimensions, ImageBackground  } from 'react-native'

function LandingScreen({navigation}){
    const { width, height } = Dimensions.get('window')
    return (
        <>
            <StatusBar hidden></StatusBar>
            <SafeAreaView style={styles.block}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true} // 수평 스크롤링
                    scrollEventThrottle={16} // 스크롤 이벤트 감지하는 시간간격 (ms)
                    pagingEnabled={true} // 스크롤시 페이지네이션
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
  }
})
export default LandingScreen