import { useTaskList } from './hooks/useTask'
import { CreateTask } from './components/CreateTask'
import { GetTask } from './components/GetTask'
import { Toaster } from "react-hot-toast"

import './App.css'
function App() {
  const { data: taskList, isLoading, error } = useTaskList()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading tasks</div>

  return (
    <div>
      <CreateTask/>
      <GetTask tasks={taskList ?? []}/>
      <Toaster position="top-right" reverseOrder={false} 
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,}}
      />
    </div>
  )
}

export default App
