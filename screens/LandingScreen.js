import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native'

function LandingScreen({navigation}){
    const { width, height } = Dimensions.get('window')
    return (
        <SafeAreaView style={styles.block}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <ScrollView
            style={{ flex: 1 }}
            horizontal={true} // 수평 스크롤링
            scrollEventThrottle={16} // 스크롤 이벤트 감지하는 시간간격 (ms)
            pagingEnabled={true} // 스크롤시 페이지네이션
        >
            <View style={{ width, height }}>
                <Text>랜딩페이지 1</Text>
            </View>
            <View style={{ width, height }}>
                <Text>랜딩페이지 2</Text>
            </View>
            <View style={{ width, height }}>
                <Text>랜딩페이지 3</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
})
export default LandingScreen