import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardSceen from './screens/DashBoardScreen';
import SettingsScreen from './screens/SettingsScreen';

import DropdownCategory from './components/DropdownCategory'

import { // 할일목록 조회를 위한 유틸리티 함수 추가
  getCollection,
} from './apis/firebase'

const CATEGORY_DROPDOWN_TITLE = '카테고리'
const YEAR_DROPDOWN_TITLE = '년'
const MONTH_DROPDOWN_TITLE = '월'

// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App({navigation, route}) {
  const [todos, setTodos] = useState([]) // 할일목록 상태 (HomeScreen -> App 이동)
  const [loading, setLoading] = useState(true) // 할일목록 상태 (HomeScreen -> App 이동)
  
  const [caretType, setCaretType] = useState(false)
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)
  const [numOfTodosToday, setNumOfTodosToday] = useState(0)
  const [categoryTitles, setCategoryTitles] = useState({ CATEGORY_DROPDOWN_TITLE: null, YEAR_DROPDOWN_TITLE: null, MONTH_DROPDOWN_TITLE: null })

  const { userInfo } = route.params
  console.log("로그인한 사용자 정보: ", userInfo)

  useEffect(() => { // 할일목록 조회 (HomeScreen -> App 이동)
    function onResult(querySnapshot){
      const list = []
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        list.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      setTodos(list)
      setLoading(false)
    }
    function onError(error){
      console.error(`${error} occured when reading todos`)
    }
    // 문제점 : onSnapshot 을 사용시 다른 사용자가 할일을 추가하면 전체할일목록이 업데이트되기 때문에 나의 화면도 새로고침됨 
    return getCollection('todos', 
                          onResult, onError,
                          { exists: true, condition: [['userEmail', '==', userInfo.email]] },
                          null, null)
  }, [])

  if (loading) {
    return (
      <View style={styles.block}>
        <ActivityIndicator size="large" color="#0047AB"/>
        <Text style={styles.loadingText}>Loading ...</Text>
      </View> 
    )
  }

  return (
    <>
      <Tab.Navigator initialRouteName = "Home" screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff',
        // tabBarStyle: {
        //   backgroundColor: '#333'
        // }
      }}>
        <Tab.Screen name="Home" children={(props) => <HomeScreen 
                                                        {...props} 
                                                        caretType={caretType} 
                                                        setCaretType={setCaretType} 
                                                        todos={todos} loading={loading} 
                                                        setNumOfTodosToday={setNumOfTodosToday} 
                                                        userInfo={userInfo} 
                                                        setCategoryTitles={setCategoryTitles} 
                                                        categoryTitles={categoryTitles}
                                                        CATEGORY_DROPDOWN_TITLE={CATEGORY_DROPDOWN_TITLE}
                                                        />} options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size}/>,
          headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType} categoryTitle={categoryTitles[CATEGORY_DROPDOWN_TITLE] ? categoryTitles[CATEGORY_DROPDOWN_TITLE] : CATEGORY_DROPDOWN_TITLE}/>,
          headerStyle: {
            backgroundColor: '#a8c8ffff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          tabBarBadge: numOfTodosToday
        }}/>
        <Tab.Screen name="Calendar" children={(props) => <CalendarScreen 
                                                          {...props}
                                                          yearCaret={yearCaret}
                                                          setYearCaret={setYearCaret}
                                                          monthCaret={monthCaret}
                                                          setMonthCaret={setMonthCaret}
                                                          setCategoryTitles={setCategoryTitles}
                                                          categoryTitles={categoryTitles}
                                                          YEAR_DROPDOWN_TITLE={YEAR_DROPDOWN_TITLE}
                                                          MONTH_DROPDOWN_TITLE={MONTH_DROPDOWN_TITLE}
                                                          />} options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => <Icon name="calendar-month" color={color} size={size}/>,
          headerTitle: (props) => (<View style={{flexDirection: 'row'}}>
            <DropdownCategory {...props} caretType={yearCaret} setCaretType={setYearCaret} categoryTitle={categoryTitles[YEAR_DROPDOWN_TITLE] ? categoryTitles[YEAR_DROPDOWN_TITLE] : YEAR_DROPDOWN_TITLE}/>
            <DropdownCategory {...props} caretType={monthCaret} setCaretType={setMonthCaret} categoryTitle={categoryTitles[MONTH_DROPDOWN_TITLE] ? categoryTitles[MONTH_DROPDOWN_TITLE] : MONTH_DROPDOWN_TITLE}/>
          </View>),
          headerStyle: {
            backgroundColor: '#a8c8ffff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
        }}/>
        <Tab.Screen name="DashBoard" children={(props) => <DashBoardSceen todos={todos}/>} options={{
          title: '통계',
          tabBarIcon: ({ color, size }) => <Icon name="dashboard" color={color} size={size}/>
        }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size}/>
        }}/>
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#a8c8ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center'
  }
})