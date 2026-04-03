import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTaskResources } from '../hooks'
import { TaskFilters } from '../components/TaskFilters'
import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'

export const DashboardPage = () => {
  const { tasks, isLoading, fetchTasks, createTask, updateTask, deleteTask } =
    useTaskResources()
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => ({
      status: searchParams.get('status') || '',
      priority: searchParams.get('priority') || '',
    }),
    [searchParams]
  )

  const setFilters = newFilters => {
    const params = new URLSearchParams(searchParams)

    if (newFilters.status) {
      params.set('status', newFilters.status)
    } else {
      params.delete('status')
    }

    if (newFilters.priority) {
      params.set('priority', newFilters.priority)
    } else {
      params.delete('priority')
    }

    setSearchParams(params)
  }

  const [showTaskForm, setShowTaskForm] = useState(false)

  useEffect(() => {
    // Generate query string from filters before calling fetchTasks
    const queryParams = new URLSearchParams()
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.priority) queryParams.append('priority', filters.priority)

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : ''
    fetchTasks(queryString)
  }, [filters, fetchTasks])

  const handleCreateTask = async taskData => {
    const success = await createTask(taskData)
    if (success) {
      setShowTaskForm(false)
    }
  }

  const filteredLocalTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filters.status && t.status !== filters.status) return false
      if (filters.priority && t.priority !== filters.priority) return false
      return true
    })
  }, [tasks, filters])

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? 'Close Form' : 'Add New Task'}
        </button>
      </div>

      {showTaskForm && (
        <div className="form-container">
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskForm(false)}
          />
        </div>
      )}

      <div className="filters-container">
        <TaskFilters filters={filters} onChange={setFilters} />
      </div>

      <div className="tasks-container">
        {isLoading && <div className="loading">Loading tasks...</div>}

        {!isLoading && filteredLocalTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks found. Create a new one or adjust your filters!</p>
          </div>
        )}

        <div className="tasks-grid">
          {filteredLocalTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
