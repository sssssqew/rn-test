import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
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


// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  const [todos, setTodos] = useState([]) // 할일목록 상태 (HomeScreen -> App 이동)
  const [loading, setLoading] = useState(true) // 할일목록 상태 (HomeScreen -> App 이동)
  
  const [caretType, setCaretType] = useState(false)
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)

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
    return getCollection('todos', 
                          onResult, onError,
                          null, null, null)
  }, [])


  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = "Home" screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff',
        // tabBarStyle: {
        //   backgroundColor: '#333'
        // }
      }}>
        <Tab.Screen name="Home" children={(props) => <HomeScreen {...props} caretType={caretType} setCaretType={setCaretType} todos={todos} loading={loading}/>} options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size}/>,
          headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType} categoryTitle="카테고리"/>,
          headerStyle: {
            backgroundColor: '#a8c8ffff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
        }}/>
        <Tab.Screen name="Calendar" children={(props) => <CalendarScreen 
                                                          {...props}
                                                          yearCaret={yearCaret}
                                                          setYearCaret={setYearCaret}
                                                          monthCaret={monthCaret}
                                                          setMonthCaret={setMonthCaret}/>} options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => <Icon name="calendar-month" color={color} size={size}/>,
          headerTitle: (props) => (<View style={{flexDirection: 'row'}}>
            <DropdownCategory {...props} caretType={yearCaret} setCaretType={setYearCaret} categoryTitle="Year"/>
            <DropdownCategory {...props} caretType={monthCaret} setCaretType={setMonthCaret} categoryTitle="Month"/>
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
    </NavigationContainer>
  );
}