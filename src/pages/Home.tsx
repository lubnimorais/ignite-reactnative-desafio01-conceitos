import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(task => task.title === newTaskTitle)

    if (taskExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
  
      setTasks(oldState => [...oldState, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map(task => {
      if (task.id === id) {
        const currentDone = task.done
        return {
          ...task,
          done: !currentDone,
        }
      }

      return task;
    })

    setTasks(updateTask)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => setTasks(oldTask => oldTask.filter(task => task.id !== id)),
          style: 'default'
        }
      ]  
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTask = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle,
        }
      }

      return task;
    })

    setTasks(updateTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})