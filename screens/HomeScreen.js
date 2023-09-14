import React, { useState, useEffect, useRef } from 'react' // 카테고리 저장을 위한 useRef 임포트(수정)
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

function HomeScreen({ navigation, caretType, setCaretType }){
  const date = new Date()
  const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
  const [todos, setTodos] = useState([
    {id: 1, title: '공원에 산책가기', category: '여행', createdAt: '2023-08-22', isDone: false},
    {id: 2, title: '보고서 작성하기', category: '업무', createdAt: '2023-08-22', isDone: true},
    {id: 3, title: '자기전에 책읽기', category: '자기계발', createdAt: '2023-08-22', isDone: false},
  ])
  const [todoText, setTodoText] = useState('')
  const [warning, setWarning] = useState(false)
  // const [category, setCategory] = useState('')
  const category = useRef('') // 카테고리 변수(추가)


  const onInsertTodo = (trimedText) => {
    if(!category.current){ // 카테고리를 선택하지 않은 경우(추가)
      setTodoText('카테고리를 먼저 선택해주세요!')
      setWarning(true)
      return 
    }
    if(trimedText && trimedText.length > 3){ // 최소 글자수 제한
      const nextId = todos.length + 1
      const todoContents = trimedText.split(',')
      const createdTime = new Date()

      const newTodo = {
        id: todos.length + 1,
        title: todoContents[0],
        category: category.current || '자기계발', // 선택한 카테고리 설정 (수정)
        createdAt: `${createdTime.getFullYear()}-${createdTime.getMonth()+1}-${createdTime.getDate()}`
      }
      if(todos.filter(todo => todo.title === newTodo.title).length > 0){
        setTodoText('중복된 할일입니다.')
        setWarning(true)
      }else{
        setTodos([newTodo, ...todos]) // 최신순 정렬하기
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
        {todos.length === 0 ? <Default/> : <TodoList todos={todos} />}
        <TodoInsert 
          onInsertTodo={onInsertTodo} 
          todoText={todoText} 
          setTodoText={setTodoText} 
          warning={warning} 
          setWarning={setWarning}/>
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