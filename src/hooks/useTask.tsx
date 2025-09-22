// hooks/useTaskList.ts
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import type { TaskList, TaskForm } from '../types/TaskTypes'
import { getTaskList, createTask, updateTaskState, updateTaskDepend, deleteTaskDepend, deleteTask } from '../api/TasksApi'
import { toast } from "react-hot-toast";

export function useTaskList() {
  return useQuery<TaskList[]>({
    queryKey: ['taskList'], 
    queryFn: getTaskList,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation<TaskList, Error, TaskForm>({
    mutationFn: createTask,
    onSuccess: (data: TaskList) => {
      if(data.id){
        queryClient.invalidateQueries({ queryKey: ['taskList'] })
        toast.success("Task created successfully")
      }else{
        toast.error("Unable to create task")
      }
    },
  })
}

export function useUpdateTaskState() {
  const queryClient = useQueryClient()

  return useMutation<TaskList, Error, {id: number, state: string}>({
    mutationFn: updateTaskState,
    onSuccess: (data: TaskList, variables: {id: number, state: string}) => {
      if(data.state != variables.state){
        toast.error("State was not updated. Likely being blocked by another task")
      }else{
        toast.success("State has been updated")
        queryClient.invalidateQueries({ queryKey: ['taskList'] })
      }
    },
  })
}

export function useUpdateTaskDepend() {
  const queryClient = useQueryClient()

  return useMutation<{ok: boolean}, Error, {id: number, dependId: number}>({
    mutationFn: updateTaskDepend,
    onSuccess: (data:{ok:boolean}) => {
      if(data.ok){
        toast.success("Added dependency for this task")
        queryClient.invalidateQueries({ queryKey: ['taskList'] })
      }
    },
  })
}

export function useDeleteTaskDepend() {
  const queryClient = useQueryClient()

  return useMutation<{ok: boolean}, Error, {id: number, dependId: number}>({
    mutationFn: deleteTaskDepend,
    onSuccess: (data) => {
      if(data.ok){
        toast.success("Removed dependency for this task")
        queryClient.invalidateQueries({ queryKey: ['taskList'] })
      }
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation<{ok: boolean}, Error, {id: number}>({
    mutationFn: deleteTask,
    onSuccess: () => {
        toast.success("Task has been deleted")
        queryClient.invalidateQueries({ queryKey: ['taskList'] })
    },
  })
}