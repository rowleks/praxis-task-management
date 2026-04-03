import { client } from '../api/client'

export const getAll = async (query = '') => {
  return await client(`/tasks${query}`)
}

export const getOne = async (id) => {
  return await client(`/tasks/${id}`)
}

export const create = async (taskData) => {
  return await client('/tasks', { body: taskData })
}

export const update = async (id, taskData) => {
  return await client(`/tasks/${id}`, {
    method: 'PATCH',
    body: taskData,
  })
}

export const remove = async (id) => {
  return await client(`/tasks/${id}`, { method: 'DELETE' })
}
