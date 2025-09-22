// api/getTaskList.ts
import type { TaskList, TaskForm } from '../types/TaskTypes'

export async function getTaskList(): Promise<TaskList[]> {
  const res = await fetch(import.meta.env.VITE_ROOT_URL + '/tasks')
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(newTask: TaskForm): Promise<TaskList> {
  const res = await fetch(import.meta.env.VITE_ROOT_URL + '/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTaskState(updateState: {id: number, state: string}): Promise<TaskList> {
  const res = await fetch(import.meta.env.VITE_ROOT_URL + `/tasks/${updateState.id}/state/${updateState.state}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTaskDepend(updateDepend: {id: number, dependId: number}): Promise<{ok: boolean}> {
  const res = await fetch(import.meta.env.VITE_ROOT_URL + `/dependencies/${updateDepend.id}/blockers/${updateDepend.dependId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function deleteTaskDepend(updateDepend: {id: number, dependId: number}): Promise<{ok: boolean}> {
  const res = await fetch(import.meta.env.VITE_ROOT_URL + `/dependencies/${updateDepend.id}/blockers/${updateDepend.dependId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function deleteTask(tasks: {id: number}): Promise<{ok: boolean}> {
  const res = await fetch(import.meta.env.VITE_ROOT_URL + `/tasks/${tasks.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to create task')
  if (res.status === 204) {
    return { ok: true }
  }

    
  return res.json()
}
