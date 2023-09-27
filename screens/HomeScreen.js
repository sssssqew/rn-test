import React, { useState, useEffect, useRef } from 'react' // 카테고리 저장을 위한 useRef 임포트(수정)
import { 
  addData,
  getCurrentTime,
  // getCollection // 주석처리
} from '../apis/firebase'

import { // 오늘과 내일 날짜기준을 계산하는 유틸리티 함수
  getToday,
  getTomorrow
} from '../utils/time' 

import { 
  SafeAreaView, 
  View, Text, 
  StyleSheet, 
  StatusBar, 
  Keyboard, 
  FlatList,
  TouchableHighlight 
} from 'react-native'

import DateHeader from '../components/DateHeader'
import Default from '../components/Default'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'
import DropdownItem from '../components/DropdownItem'

function HomeScreen({ navigation, caretType, setCaretType, todos, loading, route }){ // 필요한 데이터 추가 (todos, loading, route)
  const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
  const [todoText, setTodoText] = useState('')
  const [warning, setWarning] = useState(false)

  // 오늘/내일의 날짜를 기준으로 할일목록을 필터링하고 정렬함
  const category = useRef('') // 카테고리 변수
  const date = (route.params && route.params.date) ? new Date(route.params.date) : new Date()
  const today = getToday(date) // 시간제외
  const tomorrow = getTomorrow(getToday(date))
  const todosToday = todos.filter(todo => todo.createdAt?.toDate() >= today && todo.createdAt?.toDate() < tomorrow)
  const todosTodayLatest = [...todosToday] // 원본복사
  todosTodayLatest.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) // 최신순 정렬

  console.log("현재 선택날짜: ", date)
  console.log("날짜비교: ", date.getTime(), today.getTime() != getToday(new Date()).getTime())

  const onInsertTodo = async (trimedText) => {
    if(!category.current){ // 카테고리를 선택하지 않은 경우
      setTodoText('카테고리를 먼저 선택해주세요!')
      setWarning(true)
      return 
    }
    if(trimedText && trimedText.length > 3){ // 최소 글자수 제한
      if(todos.filter(todo => todo.title === trimedText).length > 0){
        setTodoText('중복된 할일입니다.')
        setWarning(true)
      }else{
        const newTodo = {
          title: trimedText,
          category: category.current || '자기계발', // 선택한 카테고리 설정 (수정)
          isDone: false,
          createdAt: getCurrentTime(), // 클라이언트 기준이 아니라 서버기준 저장시각
        }
        await addData('todos', newTodo)
        Keyboard.dismiss() // 추가버튼 클릭시 키보드 감추기 
        setTodoText('') // 입력창 초기화
        category.current = '' // 카테고리 초기화 (추가)
      }
    }else{
      console.log('3자 이상 입력하세요!')
      setTodoText('3자 이상 입력하세요!')
      setWarning(true)
    }
  }

  const closeDropdown = () => {
    caretType && setCaretType(false)
  }
  const selectCategory = (item, e) => { // 카테고리 드롭다운 선택시 (추가)
    console.log("카테고리: ", item)
    closeDropdown()
    category.current = item 
  }
  const handleOutSideOfMenu = (e) => {
    console.log('홈화면을 터치하셨습니다.')
    closeDropdown()
  }

  useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')), [])

  useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')), [])
  
  if (loading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View> 
    )
  }

  return (
    <SafeAreaView 
        style={styles.block} 
        onTouchStart={handleOutSideOfMenu}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      
        {caretType 
        && (
            <View 
              style={styles.dropdownShadow}
              onTouchStart={(e) => { // 터치 시작점 설정 : 캡쳐링 방지 (추가)
                console.log('여기를 지나침')
                e.stopPropagation() // 터치 버블링 방지
              }}
              >
              <FlatList
                data={categories} 
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <DropdownItem category={item} selectCategory={(e) => selectCategory(item, e)}/> // 아이템 각각의 뷰 화면 : 카테고리 선택시 이벤트핸들러 함수 등록 (수정)
                )}
                style={styles.dropdownList}
              />
          </View>
        )}
        <DateHeader date={date}/>
        {/* 해당날짜 기준 최신순으로 정렬된 할일목록 */}
        {todosTodayLatest.length === 0 ? 
            <Default/> : 
            <TodoList todos={todosTodayLatest} 
        />}
        {/* 필터링된 할일목록의 날짜와 현재 날짜가 동일하지 않은 경우 */}
        <TodoInsert 
          onInsertTodo={onInsertTodo} 
          todoText={todoText} 
          setTodoText={setTodoText} 
          warning={warning} 
          setWarning={setWarning}
          disabled={today.getTime()!==getToday(new Date()).getTime()}/> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  dropdownList: {
    padding: 5
  },
  dropdownShadow: {
    shadowOffset: { width: 0, height: 20 },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    backgroundColor : "#fff", // invisible color
    zIndex: 1,
    elevation: 1,
    position: 'absolute',
    top: -15,
    borderRadius: 5,
    margin: 15
  }
})
export default HomeScreen