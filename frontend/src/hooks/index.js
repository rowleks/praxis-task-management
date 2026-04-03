import { useState, useCallback } from 'react'
import * as taskService from '../services/tasks'
import { useNotification } from '../context/NotificationContext'
import { useAuth } from '../context/AuthContext'

export function useTaskResources() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { notify } = useNotification()
  const { logout } = useAuth()

  const handleError = useCallback((err) => {
    if (err.status === 401) {
      notify('Session expired. Please log in again.', 'error')
      logout()
    } else {
      notify(err.message || 'An error occurred', 'error')
    }
  }, [logout, notify])

  const fetchTasks = useCallback(async (query = '') => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await taskService.getAll(query)
      setTasks(data)
    } catch (err) {
      setError(err)
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }, [handleError])

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks((prev) => [...prev, newTask])
      notify('Task created successfully')
      return true
    } catch (err) {
      handleError(err)
      return false
    }
  }, [handleError, notify])

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData)
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)))
      notify('Task updated successfully')
      return true
    } catch (err) {
      handleError(err)
      return false
    }
  }, [handleError, notify])

  const deleteTask = useCallback(async (id) => {
    try {
      await taskService.remove(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      notify('Task deleted successfully')
      return true
    } catch (err) {
      handleError(err)
      return false
    }
  }, [handleError, notify])

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
