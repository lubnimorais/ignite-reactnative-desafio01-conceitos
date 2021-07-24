import React, { useState, useRef, useEffect } from "react";
import {View, TouchableOpacity, Image, StyleSheet, Text, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import { Task } from "./TasksList";

interface IProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void
  removeTask: (id: number) => void;
}

const TaskItem: React.FC<IProps> = ({task, index, toggleTaskDone, editTask, removeTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textEdit, setTextEdit] = useState(task.title)

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }
  
  function handleCancelEditing() {
    setTextEdit(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, textEdit);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current?.focus()
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [isEditing])

  return (
    <>
    <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View 
          testID={`marker-${index}`}                  
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { task.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput  
          ref={textInputRef}                 
          style={task.done ? styles.taskTextDone : styles.taskText}
          value={textEdit}
          selection={{ start: textEdit.length}}
          onChangeText={setTextEdit}
          editable={isEditing}
          returnKeyType="done"
          onSubmitEditing={handleSubmitEditing}
        />

      </TouchableOpacity>
    </View>

    <View style={styles.containerIcons}>
      {isEditing ? (
        <TouchableOpacity
          testID={`edit-${index}`}
          style={{ paddingHorizontal: 24 }}              
          onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>        
      ) : (
        <TouchableOpacity
        testID={`edit-${index}`}
        style={{ paddingHorizontal: 24 }}              
        onPress={handleStartEditing}
        >
          <Image source={editIcon} />
        </TouchableOpacity>
      )}
      
      <View style={styles.divisor} />

      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        disabled={isEditing}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}} />
      </TouchableOpacity>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },

  containerIcons: {
    flexDirection: "row"
  },

  divisor: {
    width: 1,
    height: 24,
    color: 'rgba(196, 196, 196, 0.24)',
  }
})

export { TaskItem };