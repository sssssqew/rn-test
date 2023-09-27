import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import moment from 'moment'

import { 
    updateDate
  } from '../apis/firebase'

let lastTap = null 

function TodoItem({ id, title, category, isDone, createdAt }){
    console.log("할일 생성시각: ", title, createdAt)
    const [doubleTabbed, setDoubleTabbed] = useState(false)
    const [text, setText] = useState("")
    const inputRef = useRef(null)

    const handleDoubleTab = (e) => {
        console.log(inputRef.current)
        setDoubleTabbed(!doubleTabbed)
        setText(title)
    }
    const ishandleDoubleTap = () => {
        const now = Date.now() // 밀리세컨드초
        const delay = 300
        if(lastTap && (now - lastTap) < delay){
            return true 
        }else{
            lastTap = now
            return false  
        }
    }
    const handleTap = () => {
        updateDate('todos', id, {
            isDone: !isDone
        })
    }
    const handlePress = (e) => {
        if(ishandleDoubleTap()){
            handleDoubleTab()
            console.log("더블탭")
            handleTap()
        }else{
            handleTap()   
            console.log("------ 탭 ----------")
        }
    }
    const handleBlur = (e) => {
        e.stopPropagation()
        console.log("블러")
        setDoubleTabbed(!doubleTabbed)
        Keyboard.dismiss()
        updateDate('todos', id, {
            title: text.trim()
        })
    }
    const handleChange = (text) => {
        // if (/\n/.test(text)) { // 엔터키 입력시 
        //     Keyboard.dismiss()
        //     // inputRef.current.blur()

        // }else{
        //     setText(text)
        // }
        setText(text)
    }
    const hideKeyboard = (e) => {
        Keyboard.dismiss()
        // inputRef.current.blur()
      }
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus()
        }
    })
    return (
        <TouchableWithoutFeedback onPress={handlePress} >
            <View style={styles.item}>
                <View style={styles.titleMargin} onTouchStart={(e) => {e.stopPropagation()}}>
                    {doubleTabbed ? 
                        (
                            <TouchableWithoutFeedback>
                                <TextInput 
                                    value={text} 
                                    onBlur={handleBlur} 
                                    ref={inputRef}
                                    onChangeText={handleChange} // 입력창에 글자를 입력할때
                                    // onSubmitEditing={hideKeyboard} // 여기서 하면 엔터키 두번 눌러야 할일추가됨 (키보드만 닫는걸로 수정함)
                            />
                            </TouchableWithoutFeedback>
                        ) : 
                        <Text style={[styles.title, {textDecorationLine: (isDone && !doubleTabbed ) ? 'line-through': 'none'}]}>{title}</Text>}
                </View>
                <View>
                    <Text>{category} ({isDone ? "종료": "진행중"})</Text>
                    <Text style={styles.dateText}>{createdAt && moment(createdAt.toDate()).format('YY-MM-DD hh:mm:ss')}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingVertical: 10,
        // backgroundColor: '#d6e3ffff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#a8c8ffff',
    },
    titleMargin: {
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    dateText: {
        fontSize: 12
    }
})

export default React.memo(TodoItem)