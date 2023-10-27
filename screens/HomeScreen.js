import React, { useState, useEffect, useRef } from 'react' // 카테고리 저장을 위한 useRef 임포트(수정)
import { 
  addData,
  removeData,
  getCurrentTime,
  // getCollection // 주석처리
} from '../apis/firebase'

import { // 오늘과 내일 날짜기준을 계산하는 유틸리티 함수
  getToday,
  getTomorrow,
  getTodosToday
} from '../utils/time' 

import { 
  SafeAreaView, 
  View, Text, 
  StyleSheet, 
  StatusBar, 
  Keyboard, 
  FlatList,
  TouchableHighlight,
    Modal, Pressable
} from 'react-native'

import DateHeader from '../components/DateHeader'
import Default from '../components/Default'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'
import DropdownList from '../components/DropdownList'

function HomeScreen({ navigation, caretType, setCaretType, todos, loading, route, setNumOfTodosToday }){ // 필요한 데이터 추가 (todos, loading, route)
  const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']
  const [todoText, setTodoText] = useState('')
  const [warning, setWarning] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [todoToRemove, setTodoToRemove] = useState({id: null, title: ''})

  // 오늘/내일의 날짜를 기준으로 할일목록을 필터링하고 정렬함
  const category = useRef('') // 카테고리 변수
  const date = (route.params && route.params.date) ? new Date(route.params.date) : new Date()
  const {todosToday, today} = getTodosToday(date, todos)
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
  const removeTodo = (id, title) => {
    setModalOpen(true)
    setTodoToRemove({id, title})
    console.log(`할일 [${title}] 제거`)
  }
  const handleRemove = () => {
    setModalOpen(false)
    setTodoToRemove({id: null, title: ''})
    removeData('todos', todoToRemove.id)
  }

  useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')), [])

  useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')), [])

  useEffect(() => {
    setNumOfTodosToday(todosToday.length)
  })

  return (
    <SafeAreaView 
        style={styles.block} 
        onTouchStart={handleOutSideOfMenu}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalOpen(!modalOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.guideText}>할일 "{todoToRemove.title}" 을 제거하시겠습니까?</Text>
            <View style={styles.alignHorizontal}>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.remove]}
                onPress={handleRemove}>
                <Text style={styles.textStyle}>삭제</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalOpen(false)}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
        {caretType && <DropdownList categories={categories} selectCategory={selectCategory} top={-15}/>}
        <DateHeader date={date}/>
        {/* 해당날짜 기준 최신순으로 정렬된 할일목록 */}
        {todosTodayLatest.length === 0 ? 
            <Default/> : 
            <TodoList todos={todosTodayLatest} removeTodo={removeTodo}
        />}
        {/* 필터링된 할일목록의 날짜와 현재 날짜가 동일하지 않은 경우 */}
        <TodoInsert 
          onInsertTodo={onInsertTodo} 
          todoText={todoText} 
          setTodoText={setTodoText} 
          warning={warning} 
          setWarning={setWarning}
          disabled={today.getTime()<getToday(new Date()).getTime()}/> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alignHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  guideText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  button: {
    width: 70,
    height: 40,
    borderRadius: 10,
    padding: 0,
    elevation: 2,
    marginTop: 30,
    marginRight: 5,
    justifyContent: 'center'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#a8c8ffff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  remove: {
    backgroundColor: 'red'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
export default HomeScreen